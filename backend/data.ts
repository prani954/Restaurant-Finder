import { MongoClient } from "mongodb";
import * as fs from "fs";

// MongoDB connection URI
const uri = "mongodb+srv://pranaswic2023:AHXMZSKvUPinu9l8@cluster0.qpfz0ln.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Replace with your MongoDB URI

async function run() {
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Define the database and collection
    const database = client.db("zomato");
    const collection = database.collection("restaurants");

    // Create a unique index on the id field to avoid duplicates
    await collection.createIndex({ id: 1 }, { unique: true });

    // Read data from the JSON file
    const rawData = fs.readFileSync(__dirname + "\\"+ "file4.json", "utf-8");
    const jsonData = JSON.parse(rawData);

    // Extract and clean the restaurant field
    const restaurants = jsonData.flatMap((item: any) =>
      item.restaurants?.map((r: any) => {
        const restaurant = r.restaurant;

        // Remove specified fields
        const {
          R,
          zomato_events,
          events_url,
          establishment_types,
          ...cleanedRestaurant
        } = restaurant;

        return cleanedRestaurant;
      }),
    );

    // Insert the restaurant data into the collection
    try {
      const result = await collection.insertMany(restaurants, {
        ordered: false,
      });
      console.log(`${result.insertedCount} documents were inserted.`);
    } catch (error: any) {
      if (error.writeErrors) {
        console.log(
          `${error.writeErrors.length} duplicate documents were ignored.,`
        );
      } else {
        throw error;
      }
    }
  } finally {
    // Close the connection to the MongoDB cluster
    await client.close();
  }
}

run().catch(console.error);