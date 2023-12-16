require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const ToDo = require("./models/todoModel");
const PORT = 3001;
const app = express();
app.use(express.json());

const uri = `mongodb://user:(y8XNP9pD051P12U8@212.233.99.207/MongoDB-4699`;

mongoose
  .connect(uri)
  .then(() => {
    console.log("сервак запущен");
    app.listen(PORT, () => {
      console.log(`сервак запущен на порту ${PORT}`);
    });
  })
  .catch((err) => console.log("(((((((((((((", err));

app.post("/createWord", async (req, res) => {
  try {
    const task = await ToDo.create(req.body);
    res.status(200).json(task);
  } catch (error) {
    console.log(error.message);
    res.status(500);
  }
});

app.get("/getAllWords", async (req, res) => {
  try {
    const tasks = await ToDo.find({});
    res.status(200).json(tasks);
  } catch (error) {
    console.log(error.message);
    res.status(500);
  }
});

app.delete("/del/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await ToDo.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).send("id не найден");
    }
    res.status(200).send(`задача с ${id} была удалена`);
  } catch (error) {
    console.log(error.message);
    res.status(200).send(`ошибка при удалении`);
  }
});

app.get("/randWord", async (req, res) => {
  try {
    let min = Math.ceil(1);
    let max = Math.floor(7);
    let randNum = Math.floor(Math.random() * (max - min) + min);

    let randMuss = await ToDo.aggregate([{ $sample: { size: randNum } }]);
    console.log(randMuss); //готовый массив

    res.status(200).send(randMuss);
  } catch (error) {
    console.log(error.message);
    res.status(200).send(`ошибка`);
  }
});
