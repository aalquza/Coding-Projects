<<<<<<< HEAD
from utils.loader import load_csv
from utils.llm_interface import run_chain
from utils.logger import log_conversation

def main(file_path):
    df = load_csv(file_path)
    
    print("Welcome to the interactive data analysis tool!")
    print("Type 'exit' to end the conversation.\n")
    
    try:
        while True:
            user_prompt = input("What can I help with?\n")
            if user_prompt.lower() == "exit":
                print("Goodbye!")
                break

            print("\nThinking...\n")

            result = run_chain(df,user_prompt)
            print("\n FINAL RESULT DICT:")
            print(result)

    except Exception as e:
        print(f"Error: {str(e)}")
=======
from utils.loader import load_csv, convert_df_to_string
from utils.gpt_interface import get_gpt_response
from utils.executor import execute_python_code_restricted
from utils.logger import log_interaction

def main(file_path):
    # Load the CSV file
    df = load_csv(file_path)
    csv_string = convert_df_to_string(df)

    # Initialize conversation history
    conversation_history = [
        {"role": "system", "content": "You are a data analyst AI assistant. You can write and execute Python code, perform data analysis, transform the data, create visualizations, and reason based on user feedback. Always explain your thought process clearly in before presenting code or results. Use code or visualizations when necessary to answer the user's query."}
    ]

    print("Welcome to the interactive data analysis tool!")
    print("Type 'exit' to end the conversation.\n")

    while True:
        # Get user input
        user_prompt = input("You: ")
        if user_prompt.lower() == "exit":
            print("Goodbye!")
            break

        # Add user input to conversation history
        conversation_history.append({"role": "user", "content": user_prompt})

        # Get GPT response with conversation history
        response = get_gpt_response(csv_string, conversation_history)

        # Log the interaction
        log_interaction(user_prompt, "free", response)

        # Add GPT response to conversation history
        conversation_history.append({"role": "assistant", "content": response})

        # Print the reasoning and response
        print("\nChatGPT: ", response)

        # Check if the response contains code to execute
        if "```python" in response:
            # Extract the Python code from the response
            code_start = response.find("```python") + len("```python")
            code_end = response.find("```", code_start)
            python_code = response[code_start:code_end].strip()

            print("\n[Generated Code]:\n", python_code)

            # Execute the code
            try:
                manipulated_df = execute_python_code_restricted(python_code, df)
                print("\n[Updated DataFrame]:\n", manipulated_df)
                # Update the DataFrame for subsequent operations
                df = manipulated_df
            except Exception as e:
                print(f"Error executing code: {e}")
>>>>>>> origin/main

if __name__ == "__main__":
    main("house-prices-advanced-regression-techniques/train.csv")
