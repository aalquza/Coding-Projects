import pandas as pd
from langchain.memory import ConversationBufferMemory
from langgraph.graph import StateGraph, Node, Edge
from langgraph.checkpoint.memory import MemorySaver
from llm_logic.state import DFState
from llm_logic.llm_nodes import action_selection_node, code_node, response_node

# Memory Saver to checkpoint state
memory_saver = MemorySaver()

# Defines the edge logic for action selection
def action_selection_edge(state: DFState) -> DFState:
    # Determine next node based on action in the state
    if state["action_state"]["action"] == "generate_code":
        return code_node(state)  # Proceed to code generation
    elif state["action_state"]["action"] == "response":
        return response_node(state)  # Proceed to generate response
    return state  # Return state if no action is found

# Main function to compile the agent
def compile_agent(df: pd.DataFrame, user_input: str):
    # Initialize the Graph builder
    builder = StateGraph()

    # Add the nodes to the graph
    builder.add_node("action_selection_node", action_selection_node)
    builder.add_node("code_execution_node", code_node)
    builder.add_node("response_node", response_node)

    # Define the conditional edge for selecting the next node
    builder.add_edge("action_selection_node", action_selection_edge)

    # Compile the graph
    graph = builder.compile(checkpointer=memory_saver)

    # Initialize state with the DataFrame and user input
    initial_state = DFState(df=df, user_input=user_input, action_state={})

    # Run the graph and get the final state
    final_state = graph.run(initial_state)

    # Return the result, including the state with chat history and actions
    return final_state

