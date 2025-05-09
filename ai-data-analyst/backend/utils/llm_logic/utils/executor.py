from RestrictedPython import compile_restricted
from RestrictedPython.Guards import safe_builtins
import pandas as pd
import io
import contextlib
from langchain.schema import BaseOutputParser

safe_builtins = safe_builtins.copy()
safe_builtins.update({"print": print})
    
def execute_python_code_restricted(df: pd.DataFrame, code: str):
    """
    Executes Python code in a restricted environment, capturing both printed output
    and a 'result' variable if it exists.
    """
    import io, contextlib

    local_vars = {
        "df": df,
        "pd": pd  # Add pandas to the accessible namespace
    }
    output_buffer = io.StringIO()

    try:
        with contextlib.redirect_stdout(output_buffer):
            exec(code, {"__builtins__": safe_builtins}, local_vars)

        # Prefer 'result' if defined; otherwise fallback to print output
        result = local_vars.get("result")
        printed_output = output_buffer.getvalue()

        if result is not None:
            return local_vars.get("df", df), str(result)
        elif printed_output.strip():
            return local_vars.get("df", df), printed_output.strip()
        else:
            return local_vars.get("df", df), "[No output]"
    except Exception as e:
        return df, f"[Execution error] {e}"
