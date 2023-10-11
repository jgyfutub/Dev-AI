from flask import Flask,request
import requests
import tensorflow as tf
import tensorflow_hub as hub
import time
from keras.models import load_model
from collections import Counter
import numpy as np

plantsarr=["Aloevera","Amla","Amruta_Balli","Arali","Ashoka","Ashwagandha","Avacado","Bamboo","Basale","Betel","Betel_Nut","Brahmi","Castor","Curry_Leaf","Doddapatre","Ekka","Ganike","Gauva","Geranium","Henna","Hibiscus","Honge","Insulin","Jasmine","Lemon","Lemon_grass","Mango","Mint","Nagadali","Neem","Nithyapushpa","Nooni","Pappaya","Pepper","Pomegranate","Raktachandini","Rose","Sapota","Tulasi","Wood_sorel"]
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

module_handle = "https://tfhub.dev/google/faster_rcnn/openimages_v4/inception_resnet_v2/1"
detector = hub.load(module_handle).signatures['default']
print(1)
def load_img(path):
    img = tf.io.read_file(path)
    img = tf.image.decode_jpeg(img, channels=3)
    return img
def run_detector(detector, path):
    img = load_img(path)
    converted_img  = tf.image.convert_image_dtype(img, tf.float32)[tf.newaxis, ...]
    start_time = time.time()
    print(2)
    result = detector(converted_img)
    end_time = time.time()
    model=load_model('modelplant.h5')
    result = {key:value.numpy() for key,value in result.items()}
    print("Found %d objects." % len(result["detection_scores"]))
    print("Inference time: ", end_time-start_time)
    print(3)
    plantsarr=[]
    for i in range(len(result["detection_boxes"])):
        ymin, xmin, ymax, xmax = result["detection_boxes"][i]
        h, w, _ = img.shape
        left, right, top, bottom = int(xmin * w), int(xmax * w), int(ymin * h), int(ymax * h)
        object_image = img[top:bottom, left:right]
        object_image=tf.image.resize(object_image, size=(256, 256))
        object_image=tf.cast(object_image,tf.float32)[:,:,:3][tf.newaxis,:]
        class_prob=model.predict(object_image)
        predicted_class=np.argmax(class_prob)
        if class_prob[0][predicted_class]>.5:
            plantsarr.append(plantsarr[predicted_class])
    return Counter(plantsarr)

print(requestgpt("fff",api_key))
@app.route('/')
def hello_world():
    return 'Hi!! this is python api for DevAI'

@app.route('/plantdetection',methods=['POST'])
def plantdetection():
    path=request.args.get('plant')
    dict=run_detector(path)
    return dict

@app.route('/research',methods=['POST'])
def research():
    text=request.args.get('plant')
    return requestgpt("Give us all scientific information about the medicinal plant "+text,api_key)

if __name__ == '__main__':
    app.run(debug=True)
