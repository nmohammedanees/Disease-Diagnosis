from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import os
import sklearn
import pandas as pd
import numpy as np
print('The scikit-learn version is {}.'.format(sklearn.__version__))

app = Flask(__name__)
CORS(app, resources={r"/diagnose": {"origins": "http://localhost:5173"}})

model_path = os.path.join(os.path.dirname(__file__),   'random_forest_model.joblib')
model = joblib.load(model_path)

precautions_map = {
    "Drug Reaction": ["stop irritation", "consult nearest hospital", "stop taking drug", "follow up"],
    "Malaria": ["Consult nearest hospital", "avoid oily food", "avoid non veg food", "keep mosquitos out"],
    "Allergy": ["apply calamine", "cover area with bandage", "use ice to compress itching"],
    "Hypothyroidism": ["reduce stress", "exercise", "eat healthy", "get proper sleep"],
    "Psoriasis": ["wash hands with warm soapy water", "stop bleeding using pressure", "consult doctor", "salt baths"],
    "GERD": ["avoid fatty spicy food", "avoid lying down after eating", "maintain healthy weight", "exercise"],
    "Chronic cholestasis": ["cold baths", "anti itch medicine", "consult doctor", "eat healthy"],
    "hepatitis A": ["Consult nearest hospital", "wash hands thoroughly", "avoid fatty spicy food", "medication"],
    "Osteoarthritis": ["acetaminophen", "consult nearest hospital", "follow up", "salt baths"],
    "Vertigo": ["lie down", "avoid sudden change in body", "avoid abrupt head movement", "relax"],
    "Hypoglycemia": ["lie down on side", "check pulse", "drink sugary drinks", "consult doctor"],
    "Acne": ["bath twice", "avoid fatty spicy food", "drink plenty of water", "avoid too many products"],
    "Diabetes": ["have balanced diet", "exercise", "consult doctor", "follow up"],
    "Impetigo": ["soak affected area in warm water", "use antibiotics", "remove scabs with wet compressed cloth", "consult doctor"],
    "Hypertension": ["meditation", "salt baths", "reduce stress", "get proper sleep"],
    "Peptic ulcer diseae": ["avoid fatty spicy food", "consume probiotic food", "eliminate milk", "limit alcohol"],
    "Dimorphic hemorrhoids (piles)": ["avoid fatty spicy food", "consume witch hazel", "warm bath with Epsom salt", "consume aloe vera juice"],
    "Common Cold": ["drink vitamin C rich drinks", "take vapour", "avoid cold food", "keep fever in check"],
    "Chicken pox": ["use neem in bathing", "consume neem leaves", "take vaccine", "avoid public places"],
    "Cervical spondylosis": ["use heating pad or cold pack", "exercise", "take otc pain reliever", "consult doctor"],
    "Hyperthyroidism": ["eat healthy", "massage", "use lemon balm", "take radioactive iodine treatment"],
    "Urinary tract infection": ["drink plenty of water", "increase vitamin C intake", "drink cranberry juice", "take probiotics"],
    "Varicose veins": ["lie down flat and raise the leg high", "use ointments", "use vein compression", "don't stand still for long"],
    "AIDS": ["avoid open cuts", "wear PPE if possible", "consult doctor", "follow up"],
    "Paralysis (brain hemorrhage)": ["massage", "eat healthy", "exercise", "consult doctor"],
    "Typhoid": ["eat high calorie vegetables", "antibiotic therapy", "consult doctor", "medication"],
    "Hepatitis B": ["consult nearest hospital", "vaccination", "eat healthy", "medication"],
    "Fungal infection": ["bath twice", "use Dettol or neem in bathing water", "keep infected area dry", "use clean clothes"],
    "Hepatitis C": ["Consult nearest hospital", "vaccination", "eat healthy", "medication"],
    "Migraine": ["meditation", "reduce stress", "use polaroid glasses in sun", "consult doctor"],
    "Bronchial Asthma": ["switch to loose clothing", "take deep breaths", "get away from trigger", "seek help"],
    "Alcoholic hepatitis": ["stop alcohol consumption", "consult doctor", "medication", "follow up"],
    "Jaundice": ["drink plenty of water", "consume milk thistle", "eat fruits and high fibrous food", "medication"],
    "Hepatitis E": ["stop alcohol consumption", "rest", "consult doctor", "medication"],
    "Dengue": ["drink papaya leaf juice", "avoid fatty spicy food", "keep mosquitos away", "keep hydrated"],
    "Hepatitis D": ["consult doctor", "medication", "eat healthy", "follow up"],
    "Heart attack": ["call ambulance", "chew or swallow aspirin", "keep calm"],
    "Pneumonia": ["consult doctor", "medication", "rest", "follow up"],
    "Arthritis": ["exercise", "use hot and cold therapy", "try acupuncture", "massage"],
    "Gastroenteritis": ["stop eating solid food for a while", "try taking small sips of water", "rest", "ease back into eating"],
    "Tuberculosis": ["cover mouth", "consult doctor", "medication", "rest"]
}
def disease_prediction_model(symptoms):
    predictions = model.predict(symptoms)
    return predictions

@app.route('/diagnose', methods=['POST'])
def diagnose():
    try:
        symptoms = request.json.get('symptoms')

        symptoms_df = pd.DataFrame([symptoms])

        predicted_disease = model.predict(symptoms_df)[0]

        if isinstance(predicted_disease, (np.ndarray, list)):
            predicted_disease = predicted_disease[0]

        precautions = precautions_map.get(predicted_disease, ["No precautions available"])

        return jsonify({
            'predicted_disease': predicted_disease,
            'precautions': precautions
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/', methods=['GET'])
def get_diseases():
    diseases = list(precautions_map.keys())
    return jsonify({
        'diseases': diseases
    })

if __name__ == '__main__':
    app.run(debug=True,port=4000)