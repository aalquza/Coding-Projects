from .llm_provider import llm
from .llm_prompts import CODE_PROMPT, RESPONSE_PROMPT, ACTION_SELECTION_PROMPT

code_chain = CODE_PROMPT | llm
response_chain = RESPONSE_PROMPT | llm
action_selection_chain = ACTION_SELECTION_PROMPT | llm

