import React from "react";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
export default function Diagnose() {
  const unique_symptoms = [
    "red_sore_around_nose", "swollen_extremeties", "cold_hands_and_feets", "yellow_crust_ooze", "runny_nose", 
    "dehydration", "breathlessness", "drying_and_tingling_lips", "swollen_legs", "dischromic_patches", 
    "brittle_nails", "irregular_sugar_level", "receiving_unsterile_injections", "bloody_stool", 
    "foul_smell_of_urine", "extra_marital_contacts", "inflammatory_nails", "puffy_face_and_eyes", 
    "mild_fever", "mood_swings", "redness_of_eyes", "blurred_and_distorted_vision", "hip_joint_pain", 
    "internal_itching", "indigestion", "prominent_veins_on_calf", "cough", "acute_liver_failure", 
    "burning_micturition", "small_dents_in_nails", "headache", "swollen_blood_vessels", "lethargy", 
    "restlessness", "fluid_overload", "nodal_skin_eruptions", "skin_peeling", "yellow_urine", 
    "toxic_look_(typhos)", "chills", "back_pain", "vomiting", "nausea", "throat_irritation", 
    "yellowish_skin", "scurring", "fast_heart_rate", "abnormal_menstruation", "unsteadiness", 
    "rusty_sputum", "receiving_blood_transfusion", "spotting_urination", "chest_pain", 
    "distention_of_abdomen", "red_spots_over_body", "knee_pain", "weakness_in_limbs", "irritability", 
    "ulcers_on_tongue", "weight_loss", "dark_urine", "abdominal_pain", "altered_sensorium", 
    "silver_like_dusting", "sinus_pressure", "phlegm", "dizziness", "yellowing_of_eyes", 
    "enlarged_thyroid", "neck_pain", "pain_behind_the_eyes", "spinning_movements", "pain_in_anal_region", 
    "loss_of_balance", "joint_pain", "polyuria", "movement_stiffness", "obesity", "diarrhoea", 
    "stomach_pain", "fatigue", "bladder_discomfort", "bruising", "sweating", "blister", 
    "watering_from_eyes", "painful_walking", "congestion", "swelling_of_stomach", 
    "history_of_alcohol_consumption", "continuous_feel_of_urine", "swelled_lymph_nodes", 
    "shivering", "cramps", "stiff_neck", "malaise", "depression", "pain_during_bowel_movements", 
    "sunken_eyes", "palpitations", "patches_in_throat", "visual_disturbances", "loss_of_smell", 
    "blood_in_sputum", "anxiety", "passage_of_gases", "pus_filled_pimples", "acidity", 
    "weakness_of_one_body_side", "irritation_in_anus", "increased_appetite", "high_fever", 
    "muscle_weakness", "swelling_joints", "stomach_bleeding", "itching", "lack_of_concentration", 
    "coma", "excessive_hunger", "muscle_pain", "continuous_sneezing", "constipation", "skin_rash", 
    "weight_gain", "loss_of_appetite", "family_history", "mucoid_sputum", "blackheads", 
    "slurred_speech", "belly_pain", "muscle_wasting"
];
 const Navigate=useNavigate();
  const n = 5;
  const [selectedSymptoms, setSelectedSymptoms] = useState(Array(n).fill(""));
  const handleSymptomChange = (index, value) => {
    const newSymptoms = [...selectedSymptoms];
    newSymptoms[index] = value;
    setSelectedSymptoms(newSymptoms);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const size=unique_symptoms.length;
    console.log(size);
    const logsymptoms=Array(size).fill(0);
    for(let i=0;i<size;i++){
      if(selectedSymptoms.includes(unique_symptoms[i])) logsymptoms[i]=1;
    }
    console.log(logsymptoms);
    try {
      const response = await fetch(
        "http://127.0.0.1:4000/diagnose",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ symptoms: logsymptoms }),
        }
      );
      const data = await response.json();
      console.log(data);
      Navigate("/resultpage",{state:{resultdata:data}});
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center mx-8 my-8 border rounded-md border-4 border-blue-400 p-8">
      <div className="flex flex-col items-center justify-center space-y-4 mb-8">
        <h1 className="text-2xl font-bold">Enter Your Symptoms Here</h1>
        <p className="text-base">
          Please provide the symptoms you are experiencing
        </p>
      </div>
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit}>
          {Array.from({ length :n }).map((_, i) => (
            <div key={i} className="form-control mb-4">
              <label className="label">
                <span className="label-text">Select Your Symptom {i + 1}</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={selectedSymptoms[i]}
                onChange={(e) => handleSymptomChange(i, e.target.value)}
              >
                <option disabled value="">
                  Pick one
                </option>
                {unique_symptoms.map((us, index) => (
                  <option key={index} value={us}>
                    {us}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <div className="flex justify-center mt-6">
            <button type="submit" className="btn btn-primary">
              Diagnose Me
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
