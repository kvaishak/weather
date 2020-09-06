if ('geolocation' in navigator) {
    console.log("Geo location available");
    navigator.geolocation.getCurrentPosition(async position => {

        let lat = position.coords.latitude;
        let long = position.coords.longitude;

        document.getElementById("lat").textContent = lat;
        document.getElementById("long").textContent = long;
        document.getElementById("plocat").classList.add("onresp");

        //requesting weather from our server - which inturns gets it from openweathermaps 
        const api_url = `/weather/${lat},${long}`
        // const api_url = "https://samples.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=3390a7b37cd01bc9c720fa08459631b2"
        const response = await fetch(api_url);
        const jsonData = await response.json();

        const weather = jsonData.weather;
        const air = jsonData.airquality;
        const airData = air.results.length > 0 ? air.results[0].measurements[0] : undefined;

        if(weather.weather){
            document.getElementById("summary").textContent = weather.weather[0].description;
            document.getElementById("temperature").textContent = weather.main.temp;
            document.getElementById("pweather").classList.add("onresp");
        }
       
        if(airData){
            document.getElementById("airquality").textContent = airData.value;
            document.getElementById("aq_units").textContent = airData.unit ? airData.unit : "";
            document.getElementById("last_updated").textContent = airData.lastUpdated ? airData.lastUpdated.substring(0,10) : "Never";
            document.getElementById("pair").classList.add("onresp");
        }
        

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

            // Showing the Snackbar 
            var x = document.getElementById("snackbar");
            x.className = "show";
            setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
        });

    });
} else {
    alert("Geo location not available");
}