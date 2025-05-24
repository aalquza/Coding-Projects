from .chains import code_chain, response_chain, action_selection_chain
from .state import DFState, ActionState
import json
from .utils.executor import execute_python_code_restricted
from .utils.parsers import CodeBlockParser
from langchain_core.output_parsers import JsonOutputParser
import sys
from langchain.globals import set_debug

def action_selection_node(state: DFState) -> DFState:
    print(f"\n\nAction Selection Node:\n\n")
    set_debug(True)
    action_output = action_selection_chain.invoke({"state": state.llm_state.model_dump()}).content
    set_debug(False)
    print(f"\n\nAction Output String:\n {action_output}\n\n")
    try:
        # Parse the JSON response and update state
        json_parser = JsonOutputParser()
        action_output_parsed = json_parser.parse(action_output)
        print(f"Action Output after JsonParser:\n {action_output_parsed}\n\n")
        # Update the LLM state with the new action state
        action_state = ActionState(**action_output_parsed)
        new_llm_state = state.llm_state.model_copy(update={
            "action_state": action_state
        })
        print(f"New LLM State:\n {new_llm_state}\n\n")
        return DFState(
            df=state.df,
            llm_state=new_llm_state
        )
    except Exception as e:
        new_llm_state = state.llm_state.model_copy(update={
            "action_state": {
                "action": "response",
                "sub_intent": "error",
                "reasoning": f"Action selection failed: {str(e)}",
                "next_node_instructions": {
                    "description": "Error occurred during action selection",
                    "is_fix": False
                }
            }
        })
        return DFState(
            df=state.df,
            llm_state=new_llm_state
        )

def code_node(state: DFState) -> DFState:
    if state.llm_state.action_state.action != "generate_code":
        return state
    code_parser = CodeBlockParser()
    print(f"\n\nCode Node:\n\n")
    set_debug(True)
    output = code_chain.invoke({"state": state.llm_state.model_dump()}).content
    set_debug(False)
    code = code_parser.parse(output)
    print(f"\n\nCode Output:\n {code}\n\n")
    try:
        df, code_output = execute_python_code_restricted(state.df, code)
        
        # Update both the DF and LLM state
        new_llm_state = state.llm_state.model_copy(update={
            "action_state": state.llm_state.action_state.model_copy(update={
                "next_node_instructions": {
                    "description": "Code executed successfully",
                    "is_fix": False,
                    "code_output": code_output,
                    "error": None
                }
            })
        })
        return DFState(
            df=df,
            llm_state=new_llm_state
        )
    except Exception as e:
        new_llm_state = state.llm_state.model_copy(update={
            "action_state": state.llm_state.action_state.model_copy(update={
                "next_node_instructions": {
                    "description": f"Error executing code: {str(e)}",
                    "is_fix": True,
                    "code_output": None,
                    "error": str(e)
                }
            })
        })
        return DFState(
            df=state.df,
            llm_state=new_llm_state
        )

def response_node(state: DFState) -> DFState:
    if state.llm_state.action_state.action != "response":
        return state
    print(f"\n\nResponse Node:\n\n")
    set_debug(True)    
    response_output = response_chain.invoke({"state": state.llm_state.model_dump()}).content
    set_debug(False)
    # Update chat history and LLM state
    new_chat_history = state.llm_state.chat_history + [{"role": "assistant", "content": response_output}]
    new_llm_state = state.llm_state.model_copy(update={
        "chat_history": new_chat_history,
        "action_state": state.llm_state.action_state.model_copy(update={
            "next_node_instructions": {
                "description": "Response sent to user",
                "is_fix": False
            }
        })
    })
    return DFState(
        df=state.df,
        llm_state=new_llm_state
    )