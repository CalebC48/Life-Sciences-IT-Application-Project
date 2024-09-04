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

app.post('/editPerson', (req, res) => {
    const { index, person } = req.body;

    if (index >= 0 && index < contactsDatabase.length) {
        contactsDatabase[index] = person;

        fs.writeFile(contactsFilePath, JSON.stringify(contactsDatabase, null, 2), (err) => {
            if (err) {
                console.error('Error writing to file:', err);
                res.status(500).json({ message: 'Failed to save contact.' });
            } else {
                res.json(contactsDatabase);
            }
        });
    } else {
        res.status(400).json({ message: 'Invalid index.' });
    }
});