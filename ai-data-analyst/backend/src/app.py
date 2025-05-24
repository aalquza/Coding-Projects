from flask import Flask, request, jsonify, send_file
import pandas as pd
from io import BytesIO
from src.controllers.analysis_controller import analyze

app = Flask(__name__)

app.add_url_rule('/analyze', view_func=analyze, methods=['POST'])
    

if __name__ == '__main__':
    app.run(debug=True)
