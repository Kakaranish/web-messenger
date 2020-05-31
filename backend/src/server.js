import express from 'express';
import bodyParser from "body-parser";

require('dotenv').config();

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', async (req, res) => {
    res.status(200).json({
        msg: 'Hello world'
    });
})

app.use(async (req, res) => {
    console.log('Error: Unknown internal error');
    if (res) res.status(500).json({ errors: ['Internal error'] });
});

const port = process.env.PORT
app.listen(port, () => {
    console.log(`Listening on ${port}...`);
});