# weather

A node based server side application with 'nedb' Database.

This is a simple web application, I put together when playing around with node.js for server side API handling using the Node.js web application framework - [Express.js](https://expressjs.com/). The database is handled by **Nedb** Node package, while rendering of the Maps is done using OpenStreetMaps and [Leaflet.js](https://leafletjs.com/). It is hosted in [Heroku](https://www.heroku.com/). 

Accessing the link, the application will ask for Location permission. Once Location permission is granted, The application will fetch the weather and temperature using the **Openweathermap API**. Additionaly the Airquality if available will be fetched through the **OpenAQ API**. Once 'Checked IN', the current location and the weather data at the time of check-in will be sent to the server and saved in the database. View Checkin option will render All the checked in locations within a Map.

#### Languages Used
* Javascript
* HTML
* CSS

#### Technologies / Frameworks Used
* Node.js
* Express.js
* Nedb - Database
* OpenweatherMap and OpenAQ for weather data
* Leaflet.js and OpenStreetMaps for map rendering
* Heroku for hosting

