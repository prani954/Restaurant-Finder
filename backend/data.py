import json
from pymongo import MongoClient, errors
from pymongo.collection import Collection

# MongoDB connection URI
mongo_uri = "mongodb+srv://pranaswic2023:AHXMZSKvUPinu9l8@cluster0.qpfz0ln.mongodb.net/?retryWrites=true&w=majority"
db_name = "zomato_new"
collection_name = "restaurants_new"

def connect_to_mongodb(uri):
    client = MongoClient(uri)
    return client[db_name], client

def load_json_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return json.load(file)

def clean_restaurant_data(restaurants):
    cleaned_data = []
    for item in restaurants:
        restaurant = item.get('restaurant', {})
        # Remove specified fields
        cleaned_restaurant = {k: v for k, v in restaurant.items() if k not in ['R', 'zomato_events', 'events_url', 'establishment_types']}
        cleaned_data.append(cleaned_restaurant)
    return cleaned_data

def insert_data_to_mongodb(collection: Collection, data):
    try:
        collection.create_index('id', unique=True)  # Create a unique index
        result = collection.insert_many(data, ordered=False)  # Insert data
        print(f"{len(result.inserted_ids)} documents were inserted.")
    except errors.BulkWriteError as e:
        print(f"{len(e.details['writeErrors'])} duplicate documents were ignored.")
    except Exception as e:
        print(f"An error occurred: {e}")

def main():
    client_db, client = connect_to_mongodb(mongo_uri)
    collection = client_db[collection_name]

    file_path = "C:\\Users\\P.BHANU PRANASWI SAI\\.spyder-py3\\my-app\\backend\\file1.json"  # Path to your JSON file
    json_data = load_json_file(file_path)
    
    # Extract and clean the restaurant data
    restaurants = [item for sublist in json_data for item in sublist.get('restaurants', [])]
    cleaned_data = clean_restaurant_data(restaurants)
    
    # Insert data into MongoDB
    insert_data_to_mongodb(collection, cleaned_data)

    client.close()

if __name__ == "__main__":
    main()
