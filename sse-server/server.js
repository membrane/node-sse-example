const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');

const app = express();
const clients = [];
const intervallInMS = 3000;
const PORT = 3001;

const createTemperatureEvent = () => `data: ${(createTemperatureString())}\n\n`;
const createTemperatureString = () => JSON.stringify(`{"temperature": "${getRandomNumber(58, -88)}"}`);
const eventsHandler = (request, response) => {
    const clientId = Date.now();
    const headers = {'Content-Type': 'text/event-stream'};

    clients.push({id: clientId, response});

    request.on('close', () => clients.splice(clients.map(it => it.id).indexOf(clientId), 1));

    response.writeHead(200, headers);
};
const getRandomNumber = (max, min) => Number(Math.random() * (max - min) + min).toFixed(1);
const sendEventsToAll = (newEvent) => clients.forEach(client => client.response.write(newEvent));

app.use(cors())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: false}))
    .get('/events', eventsHandler)
    .listen(PORT, () => console.log(`Temperature Events service listening at http://localhost:${PORT}`));

setInterval(() => sendEventsToAll(createTemperatureEvent()), intervallInMS);
