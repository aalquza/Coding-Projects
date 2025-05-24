import pandas as pd
from flask import request, jsonify

def read_file_and_prompt():
    """
    Extracts and validates the uploaded file and prompt from the Flask request.
    Returns a tuple (df, prompt) if valid, or a Flask JSON response with error.
    """
    if 'file' not in request.files or 'prompt' not in request.form:
        return jsonify({'error': 'File and prompt are required'}), 400

    file = request.files['file']
    prompt = request.form['prompt']

    if file.filename.endswith('.csv'):
        df = pd.read_csv(file)
    elif file.filename.endswith(('.xls', '.xlsx')):
        df = pd.read_excel(file)
    else:
        return jsonify({'error': 'Unsupported file type'}), 400

    return df, prompt