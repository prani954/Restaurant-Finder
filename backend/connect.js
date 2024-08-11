// import { MongoClient, ServerApiVersion } from 'mongodb';
// import dotenv from "dotenv"
const { MongoClient, ServerApiVersion } = require('mongodb');
// const uri = "mongodb+srv://pranaswic2023:pranaswic2023@cluster0.qpfz0ln.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
require("dotenv").config({path : "./config.env"})
// dotenv.config({path : "./config.env"})
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// const client = new MongoClient(process.env.ATLAS_URI, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   },
// });

// let database;
// module.exports = {
//     connectToServer: () => {
//         database = client.db("blogData");
//     },
//     getDb: () => {
//         return database;
//     },
// };
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
// Log the MongoDB URI for debugging purposes
console.log('MongoDB URI:', process.env.ATLAS_URI);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(process.env.ATLAS_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let database;

module.exports = {
  connectToServer: async () => {
    try {
      // Connect the client to the server
      await client.connect();
      console.log("Successfully connected to MongoDB Atlas");

      // Select the database
      database = client.db("blogData");
    } catch (error) {
      console.error("Error connecting to MongoDB Atlas:", error);
    }
  },
  getDb: () => {
    if (!database) {
      throw new Error("Database not initialized. Call connectToServer first.");
    }
    return database;
  },
};


// export const connectToServer = () => {
//         database = client.db("blogData")
// };
// export const getDb = () => {
//         return database
// };
console.log("Hi")
// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);
