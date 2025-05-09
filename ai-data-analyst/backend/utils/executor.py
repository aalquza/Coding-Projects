from RestrictedPython import compile_restricted
from RestrictedPython.Guards import safe_builtins

def execute_python_code_restricted(code, df):
    try:
        compiled = compile_restricted(code, "<string>", "exec")
        local_vars = {"df": df}
        exec(compiled, {
            "__builtins__": safe_builtins,
            "_print_": print,
        }, local_vars)
        return local_vars.get("df", "No DataFrame returned.")
    except Exception as e:
        return f"Execution error: {e}"
