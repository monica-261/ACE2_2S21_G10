
const SerialPort = require('serialport');
const ReadLine = require('@serialport/parser-readline');
const fetch = require("node-fetch");

const port = new SerialPort('COM7', {baudRate: 9600});
const parser = port.pipe(new ReadLine({delimiter: '\n'}));

const URL_NUEVA_MEDICION = 'http://localhost:3000/api/medicion/nueva';
const URL_MEDICION_DETALLE = 'http://localhost:3000/api/medicion/detalle';
const URL_FINALIZAR_MEDICION = 'http://localhost:3000/api/medicion/finalizar';
const ID_USUARIO = 1;
let id_medicion;



port.on("open", () => {
    console.log('Se abrió la comunicación');
});



parser.on("data", data => {
    console.log(data)
    data=JSON.parse(data)

    if(data.Estado == 'Sentado' && !id_medicion) { //SI SE DETECTO ESTADO SENTADO Y NO HAY UNA MEDICION LLAMAMOS A LA CREACION DE UNA NUEVA MEDICION
      //CREAMOS UNA NUEVA MEDICION Y LLENAMOS EL DETALLE
      let newData = {"peso": data.Peso, "distancia_respaldo": data.Distancia, "id_usuario": ID_USUARIO}
      postData(URL_NUEVA_MEDICION, newData)
      .then(data => {
          console.log(data); // JSON data parsed by `data.json()` call
          id_medicion = data.id_medicion
      });
    }else if(data.Estado == 'Sentado' && id_medicion) { //SI SE DETECTO ESTADO SENTADO Y HAY UNA MEDICION EN CURSO
      //LLENAMOS EL DETALLE
      let newData = {"peso": data.Peso, "distancia_respaldo": data.Distancia, "id_medicion": id_medicion}
      postData(URL_MEDICION_DETALLE, newData)
      .then(data => {
          console.log(data); // JSON data parsed by `data.json()` call
      });
    }else if(data.Estado == 'Levantado' && id_medicion) { //SI SE DETECTO ESTADO LEVANTADO Y HAY UNA MEDICION EN CURSO
      //FINALIZAMOS LA MEDICION
      let newData = {"id_medicion": id_medicion}
      postData(URL_FINALIZAR_MEDICION, newData)
      .then(data => {
          console.log(data); // JSON data parsed by `data.json()` call
      });
    }
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