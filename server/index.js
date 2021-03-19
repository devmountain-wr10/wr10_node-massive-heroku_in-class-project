require('dotenv').config();
const express = require('express');
const app = express();
const massive = require('massive');
const ctrl = require('./controller');

const { SERVER_PORT, CONNECTION_STRING } = process.env;

app.use(express.json());

app.get('/api/items', ctrl.getItems);
app.post('/api/items', ctrl.addItem);

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    } 
})
.then(dbInstance => {
    app.set('db', dbInstance)

    app.listen(SERVER_PORT, () => console.log(`DB connected & Server rockin out on ${SERVER_PORT}fm`));
})
.catch(err => console.log(err));


// const SERVER_PORT = 5050;
