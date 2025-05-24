from langchain.schema import BaseOutputParser
import re
import json

# OutputParser
class CodeBlockParser(BaseOutputParser):
    def parse(self, text: str) -> str:
        match = re.search(r"```python(.*?)```", text, re.DOTALL)
        return match.group(1).strip() if match else text