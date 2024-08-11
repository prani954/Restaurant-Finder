// const connect = require("./connect");
// const express = require("express");
// const cors = require("cors");
// 

// const app = express();
// const PORT = 3000;

// app.use(cors());
// app.use(express.json());
// app.use(posts);


// app.listen(PORT, () => {
//     connect.connectToServer();
//     console.log(`server is running on port ${PORT}`);
// });
// const express = require("express");
// const cors = require("cors");
// const { connectToServer, getDb } = require("./connect");
// const posts = require("./postRoutes");

// const app = express();
// const PORT = 3000;

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(posts);

// // Connect to MongoDB
// (async () => {
//   try {
//     await connectToServer();
//   } catch (error) {
//     console.error("Failed to connect to MongoDB:", error);
//     process.exit(1); // Exit the process if connection fails
//   }
// })();

// // Define a route to fetch data from the database
// app.get("/api/posts", async (req, res) => {
//   try {
//     const db = getDb();
//     const postsCollection = db.collection("posts");
//     const posts = await postsCollection.find({}).toArray();
//     res.json(posts);
//   } catch (error) {
//     console.error("Error fetching posts:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// // Health check route
// app.get("/health", (req, res) => {
//   res.send({ message: "health OK!" });
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
const express = require("express");
const cors = require("cors");
const connect = require("./connect"); // Import the connect module
const posts = require("./postRoutes");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(posts);

// Test MongoDB connection
app.get("/health", async (req, res) => {
  try {
    await connect.connectToServer(); // Connect to the database
    const db = connect.getDb(); // Get the database object

    // Fetch some data from your database to verify the connection
    const collections = await db.listCollections().toArray();
    res.send({
      message: "Connected to MongoDB Atlas!",
      collections: collections.map(col => col.name),
    });
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
    res.status(500).send({ message: "Error connecting to MongoDB Atlas", error });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

