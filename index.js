const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
//middleware
app.use(cors());
app.use(express.json());

//mongodb

const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASSWORD}@cluster0.ryz7f.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
const run = async () => {
  try {
    await client.connect();
    const todoCollection = client.db("todoApp").collection("todo");
    //get pp
    app.get("/todos", async (req, res) => {
      const todos = await todoCollection.find({}).toArray();
      res.send(todos);
    });
    // post create api
    app.post("/todos", async (req, res) => {
      const query = req.body;
      const todos = await todoCollection.insertOne(query);
      res.send(todos);
    });
    //delete api create
    app.delete("/todos/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const todos = await todoCollection.deleteOne(query);
      res.send(todos);
    });
  } finally {
  }
};

run().catch();
app.get("/", (req, res) => {
  res.send("connect");
});

app.listen(port, () => {
  console.log(port, "connected");
});
