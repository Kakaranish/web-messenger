import express from 'express';
import bodyParser from "body-parser";
import cors from 'cors';
import defaultRoutes from './routes';

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.use(async (req, res) => {
    console.log('Error: Unknown internal error');
    if (res) res.status(500).json({ errors: ['Internal error'] });
});

app.use(defaultRoutes);

export default app;