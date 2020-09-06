const mymap = L.map('checkinMap').setView([0, 0], 2);
const attribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, {
    attribution
});
tiles.addTo(mymap);


getData();
async function getData() {
    const response = await fetch('/api');
    const data = await response.json();
    console.log(data);

    for (item of data) {

        //adding marker to the map
        const marker = L.marker([item.lat, item.long]).addTo(mymap);

        let weatherTxt = `The Weather here was ${item.weather.weather[0].description} with a temperature of ${item.weather.main.temp} degree. `

        if (item.airData && item.airData.value < 0) {
            //no weather Data
            weatherTxt += "No Air quality Information"
        } else {
            weatherTxt += `The Air quality is
            ${item.airData.value} ${item.airData.unit} last updated on ${item.airData.lastUpdated}`;
        }

        marker.bindPopup(weatherTxt);
        //----for listing out the response
        // const root = document.createElement('p');
        // const mood = document.createElement('div');
        // const geo = document.createElement('div');
        // const date = document.createElement('div');
        // const divider = document.createElement('div');

        // geo.textContent = `${item.lat}° , ${item.long}°`;
        // const dateString = new Date(item.timestamp).toLocaleString();
        // date.textContent = dateString;
        // divider.textContent = '\b';

        // root.append(geo, date, divider);
        // document.body.append(root);
    }
}