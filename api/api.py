from flask import Flask, request
from sentiment import analyze
import json

app = Flask(__name__)

@app.route('/')
def main():
    return 0

@app.route('/sentiment', methods=['POST'])
def sentiment():
    data = json.loads((request.data).decode('utf-8'))
    text = data['text']['content']
    sentiment = analyze(text)
    return sentiment

