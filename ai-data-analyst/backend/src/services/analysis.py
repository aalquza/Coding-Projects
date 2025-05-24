import pandas as pd
from pandasai import PandasAI
from flask import Flask, jsonify, send_file
from io import BytesIO
from src.utils.llm import llm

def analyze_df_and_prompt(df, prompt):

    pandas_ai = PandasAI(llm)
    
    result = pandas_ai.run(df, prompt)

    if isinstance(result, pd.DataFrame):
        output = BytesIO()
        result.to_excel(output, index=False)
        output.seek(0)
        return send_file(
            output,
            mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            as_attachment=True,
            download_name='result.xlsx'
        )
    else:
        return jsonify({'response': str(result)})