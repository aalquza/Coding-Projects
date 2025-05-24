from flask import Flask, request, render_template, send_file
import pandas as pd
import io
from src.utils.read_inputs import read_file_and_prompt
from services.analysis import analyze_df_and_prompt

def analyze():
    data = read_file_and_prompt()
    if not isinstance(data, tuple):
        return data  # error JSON response
    df, prompt = data
    return analyze_df_and_prompt(df, prompt)