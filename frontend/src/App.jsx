import { useState } from "react";
import axios from "axios";
function App() {
  const [formData, setFormData] = useState({
    carpet_area_sqft: "",
    floor_num: "",
    Bathroom: "",
    Balcony: "",
    location_grouped: "",
    Furnishing: "",
    Transaction: "",
    Ownership: "",
    facing: "",
  });

  const [prediction, setPrediction] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePredict = async () => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/predict",
      {
        carpet_area_sqft: Number(formData.carpet_area_sqft),
        floor_num: Number(formData.floor_num),
        Bathroom: Number(formData.Bathroom),
        Balcony: Number(formData.Balcony),
        location_grouped: formData.location_grouped,
        Furnishing: formData.Furnishing,
        Transaction: formData.Transaction,
        Ownership: formData.Ownership,
        facing: formData.facing,
      }
    );

    setPrediction(response.data.predicted_price);
  } catch (error) {
    console.log(error);
    alert("Prediction failed");
  }
};

  return (
    <div style={{ padding: "30px" }}>
      <h1>House Price Prediction</h1>

      <input
        type="number"
        name="carpet_area_sqft"
        placeholder="Carpet Area"
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="number"
        name="floor_num"
        placeholder="Floor Number"
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="number"
        name="Bathroom"
        placeholder="Bathrooms"
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="number"
        name="Balcony"
        placeholder="Balconies"
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="text"
        name="location_grouped"
        placeholder="Location"
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="text"
        name="Furnishing"
        placeholder="Furnishing"
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="text"
        name="Transaction"
        placeholder="Transaction"
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="text"
        name="Ownership"
        placeholder="Ownership"
        onChange={handleChange}
      />
      <br /><br />

      <input
        type="text"
        name="facing"
        placeholder="Facing"
        onChange={handleChange}
      />
      <br /><br />
      <button onClick={handlePredict}>Predict</button>
      <br /><br />
      <h2>Predicted Price: {prediction}</h2>
    </div>
  );
}

export default App;
