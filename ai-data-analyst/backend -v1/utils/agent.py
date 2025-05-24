import pandas as pd
from langchain.memory import ConversationBufferMemory
from langgraph.graph import StateGraph, END, START
from langgraph.checkpoint.memory import MemorySaver
from .llm_logic.state import DFState, ActionState, NextNodeInstructions, create_initial_state
from .llm_logic.nodes import action_selection_node, code_node, response_node

# Memory Saver to checkpoint state
memory_saver = MemorySaver()

# Defines the edge logic for action selection
def action_selection_edge(state: DFState) -> str:
    # Access attributes properly through the Pydantic model
    action = state.llm_state.action_state.action
    if action == "generate_code":
        return "code_execution_node"
    elif action == "response":
        return "response_node"
    return END  # Terminate if no action

# Main function to compile the agent
def run_agent(df: pd.DataFrame, user_input: str, thread_id: str = None):
    # Initialize the Graph builder
    builder = StateGraph(DFState)


    # Add the nodes to the graph
    builder.add_node("action_selection_node", action_selection_node)
    builder.add_node("code_execution_node", code_node)
    builder.add_node("response_node", response_node)

    # Define the conditional edge for selecting the next node
    builder.add_conditional_edges("action_selection_node", action_selection_edge)

    #set entry point and return edges
    builder.add_edge(START, "action_selection_node")
    builder.add_edge("code_execution_node", "action_selection_node")
    builder.add_edge("response_node","action_selection_node")


    # Compile the graph
    graph = builder.compile(checkpointer=memory_saver)

    previous_state = None
    if thread_id:
        try:
            previous_state = memory_saver.load(thread_id)
        except:
            previous_state = None

    # Initialize state, incorporating previous state if it exists
    if previous_state:
        initial_state = create_initial_state(
            df=df,
            user_input=user_input,
            previous_state=previous_state
        )
    else:
        initial_state = create_initial_state(df, user_input)

    # Run the graph and get the final state
    final_state = graph.invoke(initial_state,config={"configurable": {"thread_id": thread_id}} )

    # Return the result, including the state with chat history and actions
    return final_state

