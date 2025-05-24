import os
import json

def log_conversation(conversation_history, total_tokens, filename=None):
    """
    Logs the entire conversation history to a file. If no filename is provided, it generates a unique filename.
    """
    # Ensure the logs directory exists
    os.makedirs("logs", exist_ok=True)

    # Generate a unique filename if none is provided
    if filename is None:
        log_number = 1
        while os.path.exists(f"logs/log_{log_number}.json"):
            log_number += 1
        filename = f"logs/log_{log_number}.json"

    # Save the conversation history to the file
    with open(filename, "w", encoding="utf-8") as log_file:
        print(f"Total tokens used: {total_tokens}\n\n")  # Print the total tokens
        json.dump(conversation_history, log_file, indent=4, ensure_ascii=False)
