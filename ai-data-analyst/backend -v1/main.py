from utils.loader import load_csv
from utils.agent import run_agent
from utils.logger import log_conversation
from uuid import uuid4

def main(file_path):
    df = load_csv(file_path)
    
    print("Welcome to the interactive data analysis tool!")
    print("Type 'exit' to end the conversation.\n")
    
    # Create a unique thread ID for this conversation
    thread_id = str(uuid4())
    
    try:
        while True:
            print("\nWhat can I help you with?\n")
            user_prompt = "please help explain this dataset"

            if user_prompt.lower() == "exit":
                print("Goodbye!")
                break

            print("\nThinking...\n")
            
            # Pass thread_id to maintain conversation state
            final_state = run_agent(df, user_prompt, thread_id)
            
            # Get the last response from chat history
            if final_state.llm_state.chat_history:
                last_message = final_state.llm_state.chat_history[-1]
                if last_message["role"] == "assistant":
                    print("\nAssistant:", last_message["content"])

    except Exception as e:
        print(f"Error: {str(e)}")

    
if __name__ == "__main__":
    main("house-prices-advanced-regression-techniques/train.csv")
