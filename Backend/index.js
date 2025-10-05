import express from "express";
import { collectionName, connection } from "./dbconfig.js";
import cors from "cors";
import { Collection, ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

app.post("/login", async (req, res) => {
  const userData = req.body;
  if (userData.email && userData.password) {
    const db = await connection();
    const collection = await db.collection("users");
    const result = await collection.findOne({
      email: userData.email,
      password: userData.password,
    });
    if (result) {
      jwt.sign(userData, "Google", { expiresIn: "5d" }, (error, token) => {
        res.send({
          success: true,
          msg: "Login Done",
          token,
        });
      });
    } else {
      res.send({
        success: false,
        msg: "User Not Found",
      });
    }
  } else {
    res.send({
      success: false,
      msg: "Login Failed",
    });
  }

 
});

app.post("/signup", async (req, res) => {
  const userData = req.body;
  if (userData.email && userData.password) {
    const db = await connection();
    const collection = await db.collection("users");
    const result = await collection.insertOne(userData);
    if (result) {
      jwt.sign(userData, "Google", { expiresIn: "5d" }, (error, token) => {
        res.send({
          success: true,
          msg: "SignUp Done",
          token,
        });
      });
    } else {
      res.send({
        success: false,
        msg: "SignUp Failed",
      });
    }
  }
});

app.post("/add-task",verifyJWTToken, async (req, resp) => {
  const db = await connection();
  const collection = await db.collection(collectionName);
  const result = await collection.insertOne(req.body);
  if (result) {
    resp.send({ message: "new task added", success: true, result });
  } else {
    resp.send({ message: "Task Not added", success: false });
  }
});

app.get("/tasks", verifyJWTToken, async (req, res) => {
  const db = await connection();
  const collection = await db.collection(collectionName);
  const result = await collection.find().toArray();
  if (result) {
    res.send({ message: "task List Fetched", success: true,result });
  } else {
    res.send({ message: "error try after some time", success: false });
  }
});

app.get("/task/:id", verifyJWTToken, async (req, res) => {
  const db = await connection();
  const id = req.params.id;
  const collection = await db.collection(collectionName);
  const result = await collection.findOne({ _id: new ObjectId(id) });
  if (result) {
    res.send({ message: "task Fetched", success: true, result });
  } else {
    res.send({ message: "error try after some time", success: false });
  }
});

app.put("/update-task",verifyJWTToken, async (req, res) => {
  const db = await connection();
  const collection = await db.collection(collectionName);
  const { _id, ...fields } = req.body;
  const update = { $set: fields };
  const result = await collection.updateOne({ _id: new ObjectId(_id) }, update);
  if (result) {
    res.send({ message: "task Data Updated", success: true, result });
  } else {
    res.send({ message: "error try after some time", success: false });
  }
});

app.delete("/delete/:id", verifyJWTToken, async (req, res) => {
  const db = await connection();
  const id = req.params.id;
  const collection = await db.collection(collectionName);
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  if (result) {
    res.send({ message: "item Deleted", success: true, result });
  } else {
    res.send({ message: "Error", susccess: false });
  }
});

app.delete("/delete-multiple", verifyJWTToken, async (req, res) => {
  const db = await connection();
  const Ids = req.body;
  const deleteTaskIds = Ids.map((item) => new ObjectId(item));
  console.log(Ids);
  const collection = await db.collection(collectionName);
  const result = await collection.deleteMany({ _id: { $in: deleteTaskIds } });
  if (result) {
    res.send({ message: "item Deleted", success: result });
  } else {
    res.send({ message: "Error", susccess: false });
  }
});
function verifyJWTToken(req, res, next) {
  //console.log("cookie test",req.cookies['token'] )
  const token = req.cookies["token"];
  jwt.verify(token, "Google", (error, decoded) => {
    if (error) {
      return res.send({
        msg: "invalid Token",
        success: false,
      });
    }
    next();
  });
}
app.listen(8000);
