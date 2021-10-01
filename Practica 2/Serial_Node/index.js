
const SerialPort = require('serialport');
const ReadLine = require('@serialport/parser-readline');
const fetch = require("node-fetch");

const port = new SerialPort('COM7', {baudRate: 9600});
const parser = port.pipe(new ReadLine({delimiter: '\n'}));



port.on("open", () => {
    console.log('Se abrió la comunicación');
});



parser.on("data", data => {
    console.log(data)
    data=JSON.parse(data)
    let newData = {
      "humedad":data.humidity, 
      "temperatura": data.temp, 
      "velocidad_viento":data.velocity, 
      "direccion_viento": data.direction, 
      "luz": data.luz || 0}
    postData('http://localhost:3000/api/medicion', newData)
    .then(data => {
        console.log(data); // JSON data parsed by `data.json()` call
    });
});


async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}