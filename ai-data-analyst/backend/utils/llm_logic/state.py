from typing import TypedDict, Optional
import pandas as pd

class ActionState(TypedDict):
    action: str
    sub_intent: str
    reasoning: str
    uncertainties: list[str]
    uncertainty_resolved: bool
    entities_validated: bool
    key_entities: list[str]
    next_node_instructions: dict

class DFState(TypedDict):
    df: pd.DataFrame
    chat_history: list[str]
    user_input: str
    latest_tool_output: Optional[str]
    code_output: Optional[str]
    error: Optional[str]
    action_state: ActionState