const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Note = require('./Note');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error(err));

app.get('/api/notes', async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).json({message: "Fetched notes successfully", data: notes});
    } catch (err) {
        res.status(500).json({message: "Error fetching notes", error: err});
    } 
});

app.post('/api/notes', async (req, res) => {
    try {
        const newNote = new Note ({
            title: req.body.title,
            content: req.body.content
        })
        const savedNote = await newNote.save();
        res.status(201).json({message: "Note created successfully", data: savedNote});
    } catch (err) {
        res.status(500).json({message: "Error creating notes", error: err});
    }
});

app.all('*', (req, res) => {
    res.status(404).send("<h1> 404 | Page not found");
});

app.listen(4000, () => {
  console.log("Server is running or port localhost:4000");
});
