import boto3
import json

def analyze(text):
    comprehend = boto3.client(service_name='comprehend', region_name='us-east-1')
    data = json.dumps(comprehend.detect_sentiment(Text=text, LanguageCode='en'), sort_keys=True)
    data = json.loads(data)
    sentiment = data['Sentiment']
    return sentiment