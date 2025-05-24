from pydantic import BaseModel, Field, validator, ConfigDict
from typing import Literal, Optional, List, Dict
import pandas as pd

# Define the state classes using Pydantic for validation and serialization
class NextNodeInstructions(BaseModel):
    description: str
    is_fix: bool = Field(default = False)
    previous_code: Optional[str] = None
    code_output: Optional[str] = None
    error: Optional[str] = None

class ActionState(BaseModel):
    action: Literal["generate_code", "response"]
    sub_intent: str
    reasoning: str
    uncertainties: List[str] = Field(default_factory=list) # will be a clear list by default
    uncertainty_resolved: bool = False
    entities_validated: bool = False
    key_entities: List[str] = Field(default_factory=list)
    next_node_instructions: NextNodeInstructions

class LLMState(BaseModel):
    df_metadata: dict
    chat_history: List[Dict[str, str]]
    user_input: str
    action_state: Optional[ActionState] = None

class DFState(BaseModel):
    model_config = ConfigDict(arbitrary_types_allowed=True)
    df: pd.DataFrame
    llm_state: LLMState

# Define a function to extract DataFrame metadata
def get_df_metadata(df: pd.DataFrame) -> dict:
    return {
        "columns": list(df.columns),
        "shape": df.shape,
    }

# Function to create the initial state of the agent
def create_initial_state(df: pd.DataFrame, user_input: str, previous_state: Optional[DFState] = None) -> DFState:
    if previous_state:
        # Preserve chat history from previous state
        chat_history = previous_state.llm_state.chat_history + [
            {"role": "user", "content": user_input}
        ]
    else:
        chat_history = [{"role": "user", "content": user_input}]

    return DFState(
        df=df,
        llm_state=LLMState(
            df_metadata=get_df_metadata(df),
            chat_history=chat_history,
            user_input=user_input,
            action_state=None
        )
    )