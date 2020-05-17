// importing the express framework
const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Listening at " + port);
});

//hosting the public directory
app.use(express.static('public'));

//initialising the database
const database = new Datastore('database.db');
database.loadDatabase();

//creating an end point for the client to post the data
app.use(express.json({ limit: '1mb' })); //for making the request to the server to be parsed as JSON
app.post('/api', (request, response) => {
    const data = request.body;
    const timestamp = Date.now();
    data.timestamp = timestamp;

    database.insert(data);

    response.json(data);
});

//endpoint for the client to get data
app.get('/api', (request, response) => {
    database.find({}, (err, data) => {
        if (err) {
            response.json({
                'status': 'Error in fetching data'
            });
        }
        response.json(data);
    })
});

//endpoint for weather request
app.get('/weather/:latlong', async(request, response) => {
    const latlong = request.params.latlong.split(',');

    console.log(latlong);
    const lat = latlong[0];
    const long = latlong[1];
    const apiKey = process.env.API_KEY;

    const weather_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
    const weather_response = await fetch(weather_url);
    const weatherData = await weather_response.json();

    const aq_url = `https://api.openaq.org/v1/latest?coordinates=${lat},${long}`;
    const aq_response = await fetch(aq_url);
    const aqData = await aq_response.json();

    const data = { weather: weatherData, airquality: aqData };

    response.json(data);
});