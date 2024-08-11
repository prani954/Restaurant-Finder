// const express = require("express")
// const database = require("./connect")
// const ObjectId = require("mongodb").ObjectId
// let postRoutes = express.Router()

// //retrieve all posts from blogData
// //http://localhost:3000/posts
// postRoutes.route("/posts").get(async(request, response) =>{
//     let db = database.getDb();
//     let data = await db.collection("posts").find({}).toArray();
//     if (data.length > 0){
//         response.json(data);
//     }
//     else{
//         throw new Error("Data not found");
//     }
// });
// // postRoutes.route("/posts").post(async(request, response) =>{
// //     let db = database.getDb();
// //     let mongoObject = {
// //         title:request.body.title,
// //         description:request.body.description
// //     }
// //     let data = await db.collection("posts").insertOne(mongoObject);
// //     if (data.length > 0){
// //         response.json(data);
// //     }
// //     else{
// //         throw new Error("Data not found");
// //     }
// // });
// //one
// //http://localhost:3000/posts/12345
// // postRoutes.route("/posts/:id").get(async(request, response) =>{
// //     let db = database.getDb();
// //     let data = await db.collection("posts").findOne({_id : new ObjectId(request.params.id)});
// //     if (Object.keys(data).length > 0){
// //         response.json(data);
// //     }
// //     else{
// //         throw new Error("Data not found");
// //     }
// // });

// module.exports = postRoutes
const express = require("express");
const database = require("./connect");
const ObjectId = require("mongodb").ObjectId;
let postRoutes = express.Router();

// Retrieve all posts from blogData
// Endpoint: http://localhost:3000/posts
postRoutes.route("/posts").get(async (request, response) => {
  try {
    let db = database.getDb();
    let data = await db.collection("posts").find({}).toArray();
    if (data.length > 0) {
      response.json(data);
    } else {
      response.status(404).send("Data not found");
    }
  } catch (error) {
    console.error("Error retrieving posts:", error);
    response.status(500).send({ message: "Error retrieving posts", error });
  }
});

// Retrieve a specific post by ID
// Endpoint: http://localhost:3000/posts/:id
// postRoutes.route("/posts/:id").get(async (request, response) => {
//   try {
//     let db = database.getDb();
//     let data = await db.collection("posts").findOne({ _id: new ObjectId(request.params.id) });
//     if (data) {
//       response.json(data);
//     } else {
//       response.status(404).send("Post not found");
//     }
//   } catch (error) {
//     console.error("Error retrieving post:", error);
//     response.status(500).send({ message: "Error retrieving post", error });
//   }
// });

// Create a new post
// Endpoint: http://localhost:3000/posts
// postRoutes.route("/posts").post(async (request, response) => {
//   try {
//     let db = database.getDb();
//     let mongoObject = {
//       title: request.body.title,
//       description: request.body.description,
//     };
//     let data = await db.collection("posts").insertOne(mongoObject);
//     if (data.insertedCount > 0) {
//       response.status(201).json(data.ops[0]);
//     } else {
//       response.status(500).send("Failed to create post");
//     }
//   } catch (error) {
//     console.error("Error creating post:", error);
//     response.status(500).send({ message: "Error creating post", error });
//   }
// });

module.exports = postRoutes;

