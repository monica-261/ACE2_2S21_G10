
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
var actualTime = -1
require('./database')

actual = {
  id: '6144f2dc455edb3d9a6e185f',
  name: 'samuellllR',
  edad: 209,
  Peso: 60.49,
  __v: 0
}


const User = require('./models/User')
const Data = require('./models/Data')
const Time = require('./models/Time');
const { json } = require('express');


  app.get('/', function (req, res) {
    return res.send('Working ...');
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
    console.log("cleaned")
    let timeJson = {"user": actual, begining: actualTime, end:Date.now() , total: Date.now - actualTime}

    new Time(timeJson).save(err => {
        if (err) { console.log("Error no se pudo Guardar la infomacion", err); res.json({status: "Error"}); return } 
              
        console.log("Data Creada Exitosamente");
        
    });
    actual={}
    actualTime = -1
    res.json({status: "cleaned"})

  })

  app.post('/setData', function (req, res){
    let data = req.body

    actual.Peso = data.Peso 
    if(actualTime === -1) actualTime = Date.now()

    
    if(actual.name==undefined) return

    data.user = actual
    new Data(data).save(err => {
        if (err) { console.log("Error no se pudo Guardar la infomacion", err); res.json({status: "Error"}); return } 
              
        console.log("Data Creada Exitosamente");
        res.json({status: "ok"});
        
      });


    
  })
// --------------------------------------------------------------------------


  app.get('/tiempo_uso_por_dia', function (req, res){
    Time.find({user: actual }, (err, obj) => {
      if(err){ console.log("No se puedieron obtener los tiempos", err);  return }
      let result = [];
      for (let i = 0; i < obj.length; i++) {
        const element = JSON.parse(JSON.stringify(obj[i]).replace("_", ""));

        let index = result.map(r => r.fecha).indexOf(element.createdAt.split('T')[0])
        if(index != -1){
          result[index].tiempo_milis += element.end - element.begining
          // result[index].tiempo_min += Math.floor(element.end - element.begining / 60000)
        }else{
          result.push({
            fecha: element.createdAt.split('T')[0],
            tiempo_milis: element.end - element.begining,
            // tiempo_min: Math.floor(element.end - element.begining / 60000)
          })
        }
      }
      result = result.sort((a, b) => { return b.tiempo_milis - a.tiempo_milis })
      res.json(result);
    })
  })

  app.get('/tendencia_peso', function (req, res){
    Time.find({user: actual}, (err, obj) => {
      if(err){ console.log("No se puedieron obtener los pesos", err);  return }
      let data = JSON.parse(JSON.stringify(obj).replace("_", ""));
      let result = data.map(d => ({fecha: d.createdAt, peso: d.user.Peso}))
      res.json(result);
    })
  })

  app.get('/tiempo_uso_por_semana', function (req, res){
    Time.find({user: actual }, (err, obj) => {
      if(err){ console.log("No se puedieron obtener los tiempos", err);  return }
      let result = [];
      for (let i = 0; i < obj.length; i++) {
        const element = JSON.parse(JSON.stringify(obj[i]).replace("_", ""));

        let fecha_tmp = element.createdAt.split('T')[0].split('-')
        let index = result.map(r => r.no_semana).indexOf(weekNoFromDate(new Date(parseInt(fecha_tmp[0]), parseInt(fecha_tmp[1] - 1), parseInt(fecha_tmp[2]))))
        if(index != -1){
          result[index].tiempo_milis += element.end - element.begining
          // result[index].tiempo_min += Math.floor(element.end - element.begining / 60000)
        }else{
          let fecha_tmp = element.createdAt.split('T')[0].split('-')
          result.push({
            no_semana: weekNoFromDate(new Date(parseInt(fecha_tmp[0]), parseInt(fecha_tmp[1] - 1), parseInt(fecha_tmp[2]))),
            tiempo_milis: element.end - element.begining,
          })
        }
      }
      result = result.sort((a, b) => { return a.no_semana - b.no_semana })
      res.json(result);
    })
  })

  app.get('/tiempo_uso_por_dia_nombre', function (req, res){
    Time.find({user: actual }, (err, obj) => {
      if(err){ console.log("No se puedieron obtener los tiempos", err);  return }
      let result = [];
      for (let i = 0; i < obj.length; i++) {
        const element = JSON.parse(JSON.stringify(obj[i]).replace("_", ""));

        let fecha_tmp = element.createdAt.split('T')[0].split('-')
        let index = result.map(r => r.dia).indexOf(dayNameFromDate(new Date(parseInt(fecha_tmp[0]), parseInt(fecha_tmp[1] - 1), parseInt(fecha_tmp[2]))))
        if(index != -1){
          result[index].tiempo_milis += element.end - element.begining
          // result[index].tiempo_min += Math.floor(element.end - element.begining / 60000)
        }else{
          let fecha_tmp = element.createdAt.split('T')[0].split('-')
          result.push({
            dia: dayNameFromDate(new Date(parseInt(fecha_tmp[0]), parseInt(fecha_tmp[1] - 1), parseInt(fecha_tmp[2]))),
            tiempo_milis: element.end - element.begining,
          })
        }
      }
      // result = result.sort((a, b) => { return a.tiempo_milis - b.tiempo_milis })
      res.json(result);
    })
  })

  app.get('/totalHours', function (req, res){
    Time
    .find({user: actual })
    .exec((err, list) => {
      if (err) throw err;
      // console.log(list);

      let totalH = list.reduce( (previousValue, currentValue) => {
        // console.log('=> ', currentValue)
        let newCurrentValue = JSON.parse(JSON.stringify(currentValue))
        console.log(diff_hours(newCurrentValue.end, newCurrentValue.begining))
        return previousValue + diff_hours(newCurrentValue.end, newCurrentValue.begining)
      }, 0)

      res.json({totalH: totalH})

    })

  })


   app.get('/usageLog', function (req, res){
    Time
    .find({user: actual })
    .exec((err, list) => {
      if (err) throw err;
      // console.log(list);


      let logList = list.map((item) => {
        newItem = JSON.parse(JSON.stringify(item))
        return {date: new Date(newItem.begining).toLocaleDateString("en-US"), beginning: new Date(newItem.begining).toLocaleTimeString("en-US"), end: new Date(newItem.end).toLocaleTimeString("en-US")}
      })

      res.json(logList)

    })

  })

  app.get('/avgWeight', function (req, res){
    Time
    .find({user: actual })
    .exec((err, list) => {
      if (err) throw err;
      // console.log(list);

      let hashList = []

      for(node of list) {
        item = JSON.parse(JSON.stringify(node))

        if(!hashList[new Date(item.begining).toLocaleDateString("en-US")]) hashList[new Date(item.begining).toLocaleDateString("en-US")] = []
        hashList[new Date(item.begining).toLocaleDateString("en-US")].push(item.user.Peso)
        // console.log(item.user.Peso)
      }
      // console.log(hashList)

      avrList = []
      for(date in hashList){
        const sum = hashList[date].reduce((a, b) => a + b, 0);
        const avg = (sum / hashList[date].length) || 0;
        avrList.push({date: date, avgWeight: avg })
      }

      res.json({ 'avgWeight': avrList })

    })

  })

    app.get('/avgUsage', function (req, res){
    Time
    .find({user: actual })
    .exec((err, list) => {
      if (err) throw err;
      // console.log(list);

      let hashList = []

      for(node of list) {
        item = JSON.parse(JSON.stringify(node))

        if(!hashList[new Date(item.begining).toLocaleDateString("en-US")]) hashList[new Date(item.begining).toLocaleDateString("en-US")] = []
        hashList[new Date(item.begining).toLocaleDateString("en-US")].push(diff_hours(item.end, item.begining))
        // console.log(item.user.Peso)
      }
      // console.log(hashList)

      avrList = []
      for(date in hashList){
        const sum = hashList[date].reduce((a, b) => a + b, 0);
        const avg = (sum / hashList[date].length) || 0;
        avrList.push({date: date, avgWeight: avg })
      }

      res.json({ 'avgUsage': avrList })

    })

  })

    app.get('/avgStandups', function (req, res){
    Time
    .find({user: actual })
    .exec((err, list) => {
      if (err) throw err;
      // console.log(list);

      let hashList = []

      for(node of list) {
        item = JSON.parse(JSON.stringify(node))

        if(!hashList[new Date(item.begining).toLocaleDateString("en-US")]) hashList[new Date(item.begining).toLocaleDateString("en-US")] = []
        hashList[new Date(item.begining).toLocaleDateString("en-US")].push(item.user.Peso)
        // console.log(item.user.Peso)
      }
      // console.log(hashList)

      avgList = []
      for(date in hashList){
        avgList.push({date: date, avgStandups: hashList[date].length})
      }

      res.json(avgList)

    })

  })

  app.get('/Peso', function (req, res){
    res.json({Peso: actual.Peso })
  })

  app.get('/time', function (req, res){
    res.json({time : actualTime })
  })

  app.get('/getUser', function (req, res){
    res.json(actual)
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

  function weekNoFromDate(d){
    var oneJan = new Date(d.getFullYear(),0,1);
    var numberOfDays = Math.floor((d - oneJan) / (24 * 60 * 60 * 1000));
    var result = Math.ceil(( d.getDay() + 1 + numberOfDays) / 7);
    return result
  }

  function dayNameFromDate(d){
    var days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
    return days[d.getDay()];
  }


  function diff_hours(dtt2, dtt1) {
  
  dt2 = new Date(dtt2)
  dt1 = new Date(dtt1)

  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
  diff /= (60 * 60);
  return diff;
  
 }

  app.listen(port, function () {
    console.log('Example app listening on port http://0.0.0.0:' + port + '!');
  });