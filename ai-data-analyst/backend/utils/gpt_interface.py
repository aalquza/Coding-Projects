import openai
from config import OPENAI_API_KEY

openai.api_key = OPENAI_API_KEY

def get_gpt_response(csv_string, conversation_history, mode):
    # Add the data context to the conversation history
    conversation_history.append({
        "role": "user",
        "content": f"Here is the data:\n{csv_string}\n"
    })

    # Modify the prompt based on the mode
    if mode == "reasoning":
        conversation_history.append({
            "role": "user",
            "content": "Explain step-by-step how you would solve this problem without writing the actual code."
        })

    # Call the GPT API with the full conversation history
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=conversation_history
    )

    # Return the assistant's response
    return response['choices'][0]['message']['content']