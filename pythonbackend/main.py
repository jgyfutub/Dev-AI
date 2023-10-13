from flask import Flask,request
import requests
import tensorflow as tf
import tensorflow_hub as hub
import time
from keras.models import load_model
from collections import Counter
import numpy as np

plantsarr=["Aloevera","Amla","Amruta_Balli","Arali","Ashoka","Ashwagandha","Avacado","Bamboo","Basale","Betel","Betel_Nut","Brahmi","Castor","Curry_Leaf","Doddapatre","Ekka","Ganike","Gauva","Geranium","Henna","Hibiscus","Honge","Insulin","Jasmine","Lemon","Lemon_grass","Mango","Mint","Nagadali","Neem","Nithyapushpa","Nooni","Pappaya","Pepper","Pomegranate","Raktachandini","Rose","Sapota","Tulasi","Wood_sorel"]
plantdict={
    "Castor":"Castor (Ricinus communis) is a highly versatile plant belonging to the Euphorbiaceae family, native to Africa and India. This fast-growing, perennial shrub can reach heights between 3 to 12 feet and features large, deeply lobed, serrated leaves and greenish-yellow flowers devoid of petals. The plant's most distinctive feature is its spiny, greenish capsule-like fruit that houses its valuable seeds. Castor thrives in warm, frost-free environments, ideally in tropical to subtropical climates. It demands well-drained, loamy or sandy soils with a pH range of 5.5 to 6.0 and requires full sun exposure for 6 to 8 hours daily. Adequate moisture is crucial but without waterlogging. Castor's myriad uses include the extraction of castor oil from its seeds, which is employed industrially, medicinally (as a laxative), and in cosmetics. The plant is also used in biodiesel production and as green manure, cover crops, or ornamental plants. Castor oil finds applications in the lubrication, pharmaceutical, and cosmetic industries, in the manufacture of coatings, paints, and varnishes, and even in biological pest control due to its toxicity to certain insects, demonstrating its broad utility. However, care must be taken due to the seeds' toxic protein, ricin, and proper precautions are essential during cultivation, handling, and processing.",
    "Curry_Leaf":"Curry Leaf (Murraya koenigii) is a fragrant and highly prized plant, native to the Indian subcontinent, known for its aromatic, pinnate leaves, which are a key ingredient in many Indian and Southeast Asian dishes. This small to medium-sized tropical tree, part of the Rutaceae family, features elegant, compound leaves, small white flowers, and small, shiny black berries. To thrive, curry leaf plants require a warm, humid climate, as they are sensitive to frost and cold temperatures, ideally grown in regions with temperatures above 54°F (12°C). They prefer well-drained, slightly acidic to neutral soils with a pH range of 6 to 7. Curry leaf plants are best grown in full sunlight, receiving 6 to 8 hours of direct sunlight daily.Curry leaves are celebrated for their culinary and medicinal significance. They add a distinct, aromatic flavor to various dishes, including curries, chutneys, and rice preparations, and are renowned for their digestive and antioxidant properties. Rich in essential oils, these leaves are used to create fragrant oils and perfumes. Medicinally, they have been employed to treat various ailments, such as diabetes, diarrhea, and nausea, and are known for their potential to reduce cholesterol levels. The leaves are a source of essential vitamins, minerals, and antioxidants. Furthermore, curry leaves have a history of use in traditional Ayurvedic and herbal medicine for their healing properties. The leaves and extracts are used in hair care products for their ability to promote hair growth and reduce premature graying. Overall, curry leaves stand as a remarkable example of a plant with cultural, culinary, and medicinal importance.",
    "Doddapatre":"Doddapatre, scientifically known as Plectranthus amboinicus, is a fascinating and highly versatile herb that originates from Southern and East Africa but has found its way into gardens and cuisines around the world. This perennial herb features succulent, aromatic leaves and is often referred to as 'Cuban oregano','Indian borage,' or simply 'oregano' due to its rich, oregano-like fragrance when its leaves are crushed. Doddapatre's adaptability allows it to flourish in various climates, but it truly thrives in warm, tropical conditions. Ideal growing conditions include well-drained loamy soil with a pH range of 6.0 to 7.0 and exposure to partial shade to full sun. This herb is cherished for its myriad of culinary, medicinal, and aromatic uses. It plays a vital role in traditional dishes, especially in Indian, African, and Caribbean cuisines, where it imparts a distinct, pungent flavor to curries, chutneys, and soups. Medicinally, Doddapatre has been employed for centuries to treat an array of maladies, from common colds and digestive problems to skin conditions, benefiting from its anti-inflammatory, antibacterial, and antioxidant properties. Additionally, Doddapatre is a source of essential oils due to its fragrant leaves. Its adaptability, coupled with its numerous uses, makes Doddapatre an invaluable herb, beloved and utilized across a multitude of cultures worldwide.",
    "Ekka":"Calotropis gigantea, commonly known as 'Ekka' or 'Crown Flower,' is a perennial shrub or small tree belonging to the Apocynaceae family. It is native to many tropical and subtropical regions, including parts of Asia, Africa, and the Middle East. This plant typically thrives in hot and arid climates, making it well-suited for regions with limited rainfall. Calotropis gigantea is characterized by its large, glossy leaves and striking clusters of star-shaped flowers. The flowers are usually purple or lavender, but they can also be found in white.Calotropis gigantea has several traditional and practical uses. Various parts of the plant, including the roots, leaves, and latex, have been utilized for their medicinal properties. In traditional medicine, it has been used to treat a range of ailments, including rheumatism, skin conditions, and intestinal issues. The latex obtained from the plant has been used to make natural rubber and for its toxic properties in pest control.Moreover, the plant has cultural significance in some regions and is used in religious ceremonies and offerings. It's also known for its role as a host plant for the Monarch butterfly.To cultivate Calotropis gigantea, it's essential to provide well-drained soil and full sunlight. The plant is drought-tolerant and can thrive in various soil types, including sandy or rocky soils. It's hardy and doesn't require extensive care once established. While its latex can be toxic to some animals, it attracts pollinators such as butterflies with its nectar-rich flowers.In summary, Calotropis gigantea, known as 'Ekka' in some regions, is a versatile plant with traditional medicinal uses, cultural significance, and ecological importance. It is well-suited for hot and arid climates and can thrive in a variety of soil conditions.",
    "Ganike":"Ganike Soppu, scientifically known as Amaranthus, is a diverse and versatile group of leafy vegetables, belonging to the Amaranthaceae family, widely cultivated and consumed across the globe. The name 'Ganike Soppu' is commonly used in the southern regions of India, particularly in the Kannada language. These leafy greens are renowned for their rich nutrient content, adaptability to various climatic conditions, and myriad culinary uses.Amaranthus encompasses numerous species, some of which are grown primarily for their leaves, while others are cultivated for their seeds, which have been a staple in many traditional diets for centuries. Among the leafy varieties, the two most prominent species are Amaranthus tricolor, commonly known as Thotakura, and Amaranthus dubius, referred to as Ganike Soppu in Kannada. Both species share similar characteristics, but variations in leaf color and shape exist.Ganike Soppu typically features lance-shaped or ovate leaves that are glossy and tender, with a vibrant green hue. The plant is known for its rapid growth, often reaching maturity within 4-6 weeks from planting. Its adaptability to various environmental conditions makes it a resilient crop, capable of thriving in both tropical and subtropical climates.These leafy greens can be cultivated throughout the year, provided that they receive adequate sunlight and moisture. In general, Amaranthus requires well-drained soil with organic matter, and it is known for its ability to grow in poor soils, although optimal growth is achieved in fertile, loamy soil. Seeds are sown directly into the soil, and germination typically occurs within a week. The plant is generally drought-tolerant, but consistent watering will yield better results. For ideal growth, a pH range of 6.0 to 7.5 is recommended. It is essential to keep the plant well-maintained, which includes thinning and pruning to promote healthier growth and increased yield. Additionally, applying organic fertilizers helps to enhance the nutritional value of the greens.The uses of Ganike Soppu in culinary applications are incredibly diverse, and it is an integral part of many traditional South Indian dishes. The leaves can be employed in various preparations, such as curries, stir-fries, soups, and salads. They are often used as a key ingredient in popular South Indian dishes like 'Keerai masiyal,' a mashed spinach curry, and 'Keerai kootu,' a lentil-based dish. The leaves are also used in the preparation of Keerai sambar,' a lentil and vegetable stew, which is a staple in many South Indian households.Ganike Soppu, like other varieties of Amaranthus, is renowned for its outstanding nutritional content. It is a rich source of essential vitamins, particularly vitamin A, vitamin C, and folic acid. These greens also contain an abundance of minerals such as calcium, iron, and potassium. The high iron content makes Ganike Soppu a valuable addition to diets, especially for those with iron-deficiency anemia. Its dietary fiber content aids in digestion and promotes a feeling of fullness. Furthermore, Ganike Soppu is low in calories, making it an excellent choice for individuals looking to maintain a healthy weight.Apart from its nutritional benefits, Ganike Soppu has medicinal properties. In traditional Ayurvedic medicine, these greens are often used for their cooling effect on the body, making them a preferred choice during the scorching summer months. They are also believed to have anti-inflammatory properties. Additionally, the presence of phytonutrients and antioxidants in Ganike Soppu contributes to overall health and well-being.In conclusion, Ganike Soppu, or Amaranthus, is a remarkable leafy vegetable celebrated for its adaptability, nutritional richness, and diverse culinary applications. Its cultivation is favored not only for its ease but also for its resilience in various climates. Whether enjoyed in traditional South Indian dishes, used for its health benefits, or embraced for its rapid growth and sustainable nature, Ganike Soppu has established itself as an essential component of diets and agricultural practices in the region.",
    "Gauva":"Guava, scientifically known as Psidium guajava, is a tropical fruit-bearing tree in the Myrtaceae family, native to Central America but now cultivated in many tropical and subtropical regions around the world. Guava is a highly regarded fruit due to its exceptional flavor, fragrant aroma, and numerous health benefits.Guava trees are small to medium-sized, evergreen plants with oval or elliptical leaves and white, fragrant flowers. The fruits they produce are typically round to oval, with skin that can range in color from green to yellow or even pink. The flesh of the guava fruit is either white, pink, or red, depending on the variety. Guavas are often known for their slightly granular texture, typically housing numerous small seeds at the center, although seedless varieties are available.The guava plant thrives in warm, tropical climates and can be found in countries such as India, Brazil, Mexico, and many others with similar climates. It is relatively easy to grow and is prized for its resistance to drought and adaptability to different soil types. Guava trees require well-drained soil and plenty of sunlight to produce the best-quality fruit. They are known for their high productivity, with some trees yielding hundreds of fruits each year.Guava is celebrated for its sweet and slightly tart flavor, making it a popular fruit for consumption both fresh and in various culinary applications. It can be eaten as a whole fruit, cut into slices, or used to make juices, smoothies, jams, jellies, and desserts. Guava is a rich source of essential nutrients, including vitamin C, vitamin A, dietary fiber, and several important minerals.One of the most prominent health benefits of guava is its incredibly high vitamin C content. This vitamin is essential for the immune system, skin health, and overall well-being. Guava's vitamin C content can exceed that of many other fruits, providing more than the recommended daily intake in a single serving.The fruit is also a good source of dietary fiber, which promotes digestive health and can aid in weight management. Guava is rich in antioxidants and phytonutrients, which can help combat inflammation and reduce the risk of chronic diseases.Moreover, guava leaves are known for their medicinal properties and are used in traditional herbal remedies. They are believed to have anti-inflammatory, antimicrobial, and analgesic properties, which can aid in the treatment of various ailments.Guava has a long history of traditional uses, particularly in Ayurvedic and traditional medicine systems, for addressing issues like diarrhea, dysentery, and various digestive problems. The leaves are used to brew teas and tinctures, and guava leaf extracts are available as dietary supplements.In summary, guava is a beloved tropical fruit that offers a delightful flavor and a wealth of nutritional benefits. It is versatile in its culinary applications, and its leaves are valuable for their potential medicinal uses. The guava tree's adaptability to different climates and its high yield make it a vital fruit crop in regions where it is cultivated, providing a rich source of essential nutrients and natural remedies for various health concerns.",
    "Gernamium":"",

}   
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
