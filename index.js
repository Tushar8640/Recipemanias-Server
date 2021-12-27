const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;
require("dotenv").config();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.vqk54.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
  try {
    await client.connect();
    const database = client.db("CRT");
    const usersCollection = database.collection("users");

    app.post("/addusers", async (req, res) => {
      const result = await usersCollection.insertOne(req.body);
      console.log(result);
      res.send("User Successfully added")
    });

    console.log("database connected");
  } finally {
    // await client.close()
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Recipemanias servers");
});

app.listen(port, () => {
  console.log(`listening at ${port}`);
});
