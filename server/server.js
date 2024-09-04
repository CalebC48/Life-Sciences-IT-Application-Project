const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

const contactsFilePath = './contactsDatabase.json';
let contactsDatabase = require(contactsFilePath);

app.get('/contacts', (req, res) => {
    res.json(contactsDatabase);
});