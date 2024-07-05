import React from 'react';
import { useLocation } from 'react-router-dom';

export default function ResultPage(props) {
  const location = useLocation();
  const { predicted_disease, precautions } = location.state.resultdata;

  const cardContent = [
    {
      title: "Stay Hydrated",
      description: "Drink plenty of fluids to keep your body hydrated.",
      icon: "💧",
    },
    {
      title: "Healthy Diet",
      description: "Maintain a balanced diet with essential nutrients.",
      icon: "🍎",
    },
    {
      title: "Regular Exercise",
      description: "Engage in regular physical activity to stay fit.",
      icon: "🏋️",
    },
  ];

  const handleHelplineClick = () => {
    window.location.href = "https://www.apollo247.com/specialties"; 
  };

  return (
    <div className="flex flex-col items-center justify-center mx-8 my-8 border rounded-md border-4 border-blue-400 p-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Diagnosis Result</h1>
        <h2 className="text-2xl font-semibold text-red-500 mb-4">Predicted Disease: {predicted_disease}</h2>
        <h3 className="text-xl font-semibold mb-2">Precautionary Measures:</h3>
        <ul className="list-disc list-inside text-left">
          {precautions.map((precaution, index) => (
            <li key={index} className="text-base mb-1">{precaution}</li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap justify-center space-x-4">
        {cardContent.map((card, index) => (
          <div key={index} className="card w-80 bg-white shadow-lg rounded-lg p-6 m-4 border-t-4 border-blue-500 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <div className="text-3xl mr-3">{card.icon}</div>
              <h4 className="text-xl font-bold">{card.title}</h4>
            </div>
            <p className="text-base">{card.description}</p>
          </div>
        ))}
      </div>

      <div className="helpline-block mt-8 p-6 bg-blue-100 rounded-md shadow-md text-center">
        <h3 className="text-2xl font-semibold mb-4">Need Immediate Assistance?</h3>
        <p className="text-base mb-4">If you need urgent medical help, please click the button below to visit our medical helpline website.</p>
        <button 
          onClick={handleHelplineClick}
          className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300"
        >
          Go to Medical Helpline
        </button>
      </div>
    </div>
  );
}
