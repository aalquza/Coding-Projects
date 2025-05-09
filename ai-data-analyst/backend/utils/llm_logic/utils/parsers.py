from langchain.schema import BaseOutputParser
import re
import json

# OutputParser
class CodeBlockParser(BaseOutputParser):
    def parse(self, text: str) -> str:
        match = re.search(r"```python(.*?)```", text, re.DOTALL)
        return match.group(1).strip() if match else text

class JsonOutputParser(BaseOutputParser):
    def parse(self, text: str) -> dict:
        try:
            return json.loads(text)
        except json.JSONDecodeError:
            raise ValueError("Invalid JSON format") from None