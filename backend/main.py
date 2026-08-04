from fastapi import FastAPI
import joblib
import json

app = FastAPI()

model = joblib.load("house_price.pkl")
with open("locations.json", "r") as f:
    locations = json.load(f)

@app.get("/")
def home():
    return {"message": "House Price Prediction API is running"}
from pydantic import BaseModel

class HouseInput(BaseModel):
    carpet_area_sqft: float
    floor_num: int
    Bathroom: int
    Balcony: int
    location_grouped: str
    Furnishing: str
    Transaction: str
    Ownership: str
    facing: str
@app.post("/predict")
def predict(data: HouseInput):

    sample = {
        "carpet_area_sqft": [data.carpet_area_sqft],
        "floor_num": [data.floor_num],
        "Bathroom": [data.Bathroom],
        "Balcony": [data.Balcony],
        "location_grouped": [data.location_grouped],
        "Furnishing": [data.Furnishing],
        "Transaction": [data.Transaction],
        "Ownership": [data.Ownership],
        "facing": [data.facing]
    }

    import pandas as pd

    sample_df = pd.DataFrame(sample)

    prediction = model.predict(sample_df)

    return {"predicted_price": float(prediction[0])}