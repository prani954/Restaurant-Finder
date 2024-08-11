# from flask import Flask, jsonify, request
# from pymongo import MongoClient

# app = Flask(__name__)

# # MongoDB connection URI
# mongo_uri = "mongodb+srv://pranaswic2023:AHXMZSKvUPinu9l8@cluster0.qpfz0ln.mongodb.net/?retryWrites=true&w=majority"
# client = MongoClient(mongo_uri)
# db = client['zomato_new']
# collection = db['restaurants_new']

# # Endpoint to get all restaurants
# @app.route('/api/restaurants', methods=['GET'])
# def get_restaurants():
#     restaurants = list(collection.find({}, {"_id": 0}))
#     return jsonify(restaurants)

# # Endpoint to get a restaurant by ID
# @app.route('/api/restaurant/<string:restaurant_id>', methods=['GET'])
# def get_restaurant_by_id(restaurant_id):
#     restaurant = collection.find_one({"id": restaurant_id}, {"_id": 0})
#     if restaurant:
#         return jsonify(restaurant)
#     else:
#         return jsonify({"error": "Restaurant not found"}), 404

# if __name__ == '__main__':
#     app.run(debug=True)
from flask import Flask, jsonify, request
from pymongo import MongoClient
import requests
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

# MongoDB connection URI
mongo_uri = "mongodb+srv://pranaswic2023:AHXMZSKvUPinu9l8@cluster0.qpfz0ln.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(mongo_uri)
db = client['zomato_new']
collection = db['restaurants_new']

# OpenCage API Key from environment variables
OPENCAGE_API_KEY = os.getenv('OPENCAGE_API_KEY')

# Endpoint to get all restaurants
@app.route('/api/restaurants', methods=['GET'])
def get_restaurants():
    restaurants = list(collection.find({}, {"_id": 0}))
    return jsonify(restaurants)

# Endpoint to get a restaurant by ID
@app.route('/api/restaurant/<string:restaurant_id>', methods=['GET'])
def get_restaurant_by_id(restaurant_id):
    restaurant = collection.find_one({"id": restaurant_id}, {"_id": 0})
    if restaurant:
        return jsonify(restaurant)
    else:
        return jsonify({"error": "Restaurant not found"}), 404

# Endpoint to get nearby restaurants using OpenCage API
@app.route('/api/nearby_restaurants', methods=['GET'])
def get_nearby_restaurants():
    try:
        lat_str = request.args.get('lat')
        lon_str = request.args.get('lng')
        radius_str = request.args.get('radius', '3000')

        if lat_str is None or lon_str is None:
            return jsonify({"error": "Latitude and longitude are required"}), 400

        try:
            lat = float(lat_str)
            lon = float(lon_str)
            radius = int(radius_str)
        except ValueError:
            return jsonify({"error": "Invalid latitude, longitude, or radius value"}), 400

        # Broad search area for testing
        opencage_url = "https://api.opencagedata.com/geocode/v1/json"
        params = {
            'q': f"{lat},{lon}",
            'key': OPENCAGE_API_KEY,
            'limit': 100  # Increase limit to get more results
        }

        response = requests.get(opencage_url, params=params)
        data = response.json()

        results = data.get('results', [])

        nearby_restaurants = []
        for result in results:
            location = result.get('geometry', {})
            if location:
                distance = calculate_distance(lat, lon, location.get('lat'), location.get('lng'))
                if distance <= radius:
                    nearby_restaurants.append({
                        'name': result.get('formatted', 'Unknown'),
                        'latitude': location.get('lat'),
                        'longitude': location.get('lng'),
                        'address': result.get('formatted', 'Unknown'),
                        'distance': distance
                    })

        return jsonify(nearby_restaurants)

    except Exception as e:
        return jsonify({"error": str(e)}), 500

def calculate_distance(lat1, lon1, lat2, lon2):
    from math import radians, cos, sin, sqrt, atan2

    R = 6371  # Radius of Earth in kilometers
    dlat = radians(lat2 - lat1)
    dlon = radians(lon2 - lon1)
    a = sin(dlat / 2) ** 2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon / 2) ** 2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    distance = R * c * 1000  # Convert to meters
    return distance



if __name__ == '__main__':
    app.run(debug=True)
