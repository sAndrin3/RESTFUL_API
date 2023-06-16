import express from 'express';
import bodyParser from 'body-parser';
import config from './src/db/config.js';
import { commentRoutes } from './src/routes/commentRoutes.js';
import { postRoutes } from './src/routes/postRoutes.js';
import { userRoutes } from './src/routes/userRoutes.js';


const app = express();

// app.use
// userRoutes
app.use(bodyParser.json());

userRoutes(app)

app.get('/', (req, res) => {
    res.send("Hello Welcome to my API!");
});

app.listen(config.port, () => {
    console.log(`Server is running on ${config.port}`);
});

//postRoutes
app.use(bodyParser.json());

postRoutes(app)

app.get('/', (req, res) => {
    res.send("Hello Welcome to my API!");
});

app.listen(config.port, () => {
    console.log(`Server is running on ${config.port}`);
});

//commentRoutes
app.use(bodyParser.json());

commentRoutes(app)

app.get('/', (req, res) => {
    res.send("Hello Welcome to my API!");
});

app.listen(config.port, () => {
    console.log(`Server is running on ${config.port}`);
});