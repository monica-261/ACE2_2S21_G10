
const SerialPort = require('serialport');
const ReadLine = require('@serialport/parser-readline');
const fetch = require("node-fetch");

const express = require('express');
const app = express();
var cors = require('cors')
 
app.use(express.json());
app.use(cors())

var port = 3000;
var actual = {Peso: 15.6}
require('./database')

const User = require('./models/User')
const Data = require('./models/Data')


  app.get('/', function (req, res) {
    return res.send('Working ...');
  })


  app.post('/register', function (req, res){
    let newUser = req.body
    newUser.Peso = actual.Peso
    console.log(newUser)

    if(actual.name) { res.json({status: "exists"}); return }

    let returnedUser =   new User(newUser).save(err => {
        if (err) { console.log("Error no se pudo Crear el Usuario", err); res.json({status: "error"}); return } 
              
        console.log("Usuario Creado Exitosamente");
        res.json({status: "created"});
        
      });
    console.log(returnedUser)
  })

  app.post('/setUser', function (req, res){
    let data = req.body

    User.findOne({ Peso: { $gt: data.Peso - 10, $lt: data.Peso + 10  }}, 
      function(err, obj) { 
        if(err){ console.log("Error no se pudo Asignar el Usuario", err);  return }
        console.log('actualUser => ', obj)
        if(obj!=null && obj!=undefined)
        {           
          actual = JSON.parse(JSON.stringify(obj).replace("_", ""))
          res.json({status: "ok"})
        }else{
          res.json({status: "F"})
        }
       
      });
    
  })

  app.post('/cleanUser', function (req, res){    
    actual={}
    console.log("cleaned")
    res.json({status: "cleaned"})
  })

  app.post('/setData', function (req, res){
    let data = req.body

    actual.Peso = data.Peso 
    
    if(actual.name==undefined) return

    data.user = actual
    new Data(data).save(err => {
        if (err) { console.log("Error no se pudo Guardar la infomacion", err); res.json({status: "Error"}); return } 
              
        console.log("Data Creada Exitosamente");
        res.json({status: "ok"});
        
      });


    
  })





app.listen(port, function () {
  console.log('Example app listening on port http://0.0.0.0:' + port + '!');
});