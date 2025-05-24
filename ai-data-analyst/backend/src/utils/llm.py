from langchain_openai import ChatOpenAI
from config import OPENROUTER_API_KEY

MODEL_ID = "deepseek/deepseek-r1:free"

# Shared LLM instance
llm = ChatOpenAI(
    temperature=0,
    model_name=MODEL_ID,
    openai_api_base="https://openrouter.ai/api/v1",
    openai_api_key=OPENROUTER_API_KEY,
)