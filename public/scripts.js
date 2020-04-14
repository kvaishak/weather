if ('geolocation' in navigator) {
    console.log("Geo location available");
    navigator.geolocation.getCurrentPosition(async position => {

        console.log(position.coords);
        let lat = position.coords.latitude;
        let long = position.coords.longitude;

        document.getElementById("lat").textContent = lat;
        document.getElementById("long").textContent = long;

        //requesting weather from our server - which inturns gets it from openweathermaps 
        const api_url = `/weather/${lat},${long}`
            // const api_url = "https://samples.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=3390a7b37cd01bc9c720fa08459631b2"
        const response = await fetch(api_url);
        const jsonData = await response.json();

        const weather = jsonData.weather;
        const air = jsonData.airquality;
        const airData = air.results.length > 0 ? air.results[0].measurements[0] : { value: -1 };

        document.getElementById("summary").textContent = weather.weather[0].description;
        document.getElementById("temperature").textContent = weather.main.temp;
        document.getElementById("airquality").textContent = airData.value > 0 ? airData.value : "NULL";
        document.getElementById("aq_units").textContent = airData.unit ? airData.unit : "";
        document.getElementById("last_updated").textContent = airData.lastUpdated ? airData.lastUpdated : "Never";
        console.log(jsonData);

        //----USING PROMISE -----//
        // fetch('/api', options).then(response => {
        //     // console.log(response);
        //     return response.json();
        // }).then(jsonData => {
        //     console.log(jsonData);
        // });

        //----USING ASYNC-AWAIT-------/
        document.getElementById('sendData').addEventListener('click', async event => {
            //Data preperation

            let data = {
                lat,
                long,
                weather,
                airData
            };
            let options = {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(data)
            };

            let response = await fetch('/api', options);
            let jsonData = await response.json();
            console.log(jsonData);
        });

    });
} else {
    console.log("Geo location not available");
}