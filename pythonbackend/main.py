from flask import Flask,request
import requests


app = Flask(__name__)
api_key="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"

def requestgpt(text,api_key):
    URL = "https://api.openai.com/v1/chat/completions"

    payload = {
    "model": "gpt-3.5-turbo",
    "messages": [{"role": "user", "content": text}],
    "temperature" : 1.0,
    "top_p":1.0,
    "n" : 1,
    "stream": False,
    "presence_penalty":0,
    "frequency_penalty":0,
    }

    headers = {
    "Content-Type": "application/json",
    "Authorization": f"Bearer {api_key}"
    }
    response = requests.post(URL, headers=headers, json=payload, stream=False)
    return response.content

print(requestgpt("fff",api_key))
@app.route('/')
def hello_world():
    return 'Hi!! this is python api for DevAI'

@app.route('/plantdetection',methods=['POST'])
def plantdetection():
    return "plant detection"

@app.route('/research',methods=['POST'])
def research():
    text=request.args.get('plant')
    return requestgpt(text,api_key)

if __name__ == '__main__':
    app.run(debug=True)
