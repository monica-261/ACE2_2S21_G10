import './App.css';
import React, { Component, useState, useEffect } from 'react';
import FusionCharts from "fusioncharts";
import charts from "fusioncharts/fusioncharts.charts";
import ReactFusioncharts from "react-fusioncharts";
import PowerCharts from 'fusioncharts/fusioncharts.powercharts';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';
import FusionWidget from 'fusioncharts/fusioncharts.widgets';
import MaterialTable from 'material-table';
import { Label } from 'semantic-ui-react'
import moment from 'moment'



import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

charts(FusionCharts);
ReactFusioncharts.fcRoot(FusionCharts, PowerCharts, FusionTheme,FusionWidget);





const dataSourceState = {
  chart: {
    decimals: "1",
    showvalues: "1",
    plottooltext: "$label: <b>$dataValue</b>",
    plotfillalpha: "70",
    theme: "fusion",
    streamlineddata: "0"
  },
  data: [
    {
      label: "Asintomático",
      value: "17362"
    },
    {
      label: "Sintomático",
      value: "8039"
    }
  ]
};

const dataSourceStateInfectedType = {
  chart: {
    decimals: "1",
    showvalues: "1",
    plottooltext: "$label: <b>$dataValue</b>",
    plotfillalpha: "70",
    theme: "fusion",
    streamlineddata: "0"
  },
  data: [
    {
      label: "non-imported",
      value: "17362"
    },
    {
      label: "imported",
      value: "8039"
    }
  ]
};


class App extends React.Component {
  render() {
    return (
      <Router>
        <div class="topnav">
          <nav>
            <Link to="/">Home</Link>
            <Link to="/datos">Datos</Link>
            <Link to="/Dashboard">Dashboard</Link>
            <Link to="/TiempoUso">Tiempo de uso de la silla</Link>
            <Link to="/Historial">Historial del tiempo de uso de la silla</Link>
            <Link to="/Registrados">Últimos casos registrados</Link>
          </nav>
        </div>
        <Switch>
          <Route path="/datos">
            <Datos />
          </Route>
          <Route path="/Dashboard">
            <Region />
          </Route>
          <Route path="/TiempoUso">
            <Paises />
          </Route>
          <Route path="/Historial">
            <Tipos />
          </Route>
          <Route path="/Registrados">
            <Registrados />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
    </Router>
  );
;}
}



function Data1(){
  const gitHubUrl = "http://localhost:3000/getUser";
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getGitHubUserWithFetch();
  }, []);

  const getGitHubUserWithFetch = async () => {
    const response = await fetch(gitHubUrl);
    const jsonData = await response.json();
    setUserData(jsonData);
  };
  return userData
}

function TiempoTotal(){
  const gitHubUrl = "http://localhost:3000/totalHours"
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getGitHubUserWithFetch();
  }, []);

  const getGitHubUserWithFetch = async () => {
    const response = await fetch(gitHubUrl);
    const jsonData = await response.json();
    setUserData(jsonData);
  };
  return userData
}

function AvgStandups(){
  const gitHubUrl = "http://localhost:3000/avgStandups"
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getGitHubUserWithFetch();
  }, []);

  const getGitHubUserWithFetch = async () => {
    const response = await fetch(gitHubUrl);
    const jsonData = await response.json();
    setUserData(jsonData);
  };
  return userData
}

function TiempoUsoDiaNombre(){
  const gitHubUrl = "http://localhost:3000/tiempo_uso_por_dia_nombre"
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getGitHubUserWithFetch();
  }, []);

  const getGitHubUserWithFetch = async () => {
    const response = await fetch(gitHubUrl);
    const jsonData = await response.json();
    setUserData(jsonData);
  };
  return userData
}

function TiempoUsoDia(){
  const gitHubUrl = "http://localhost:3000/tiempo_uso_por_dia"
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getGitHubUserWithFetch();
  }, []);

  const getGitHubUserWithFetch = async () => {
    const response = await fetch(gitHubUrl);
    const jsonData = await response.json();
    setUserData(jsonData);
  };
  return userData
}

function TendenciaPeso(){
  const gitHubUrl = "http://localhost:3000/tendencia_peso"
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getGitHubUserWithFetch();
  }, []);

  const getGitHubUserWithFetch = async () => {
    const response = await fetch(gitHubUrl);
    const jsonData = await response.json();
    setUserData(jsonData);
  };
  return userData
}

function MayorUsoNombre(){
  const gitHubUrl = "http://localhost:3000/tiempo_uso_por_dia_nombre"
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getGitHubUserWithFetch();
  }, []);

  const getGitHubUserWithFetch = async () => {
    const response = await fetch(gitHubUrl);
    const jsonData = await response.json();
    setUserData(jsonData);
  };
  return userData
}

function LogUso(){
  const gitHubUrl = "http://localhost:3000/usageLog"
  const [userData, setUserData] = useState({});

  useEffect(() => {
    getGitHubUserWithFetch();
  }, []);

  const getGitHubUserWithFetch = async () => {
    const response = await fetch(gitHubUrl);
    const jsonData = await response.json();
    setUserData(jsonData);
  };
  return userData
}

function Home(){
  return (
    <div className="grid-container">
      <div class="one">
        <h1>Proyecto 1</h1>
        <h1>Grupo 10</h1>
      </div>
  </div>
  );
}


function Datos() {
  const userData = Data1()
  console.log(userData.name)
  return (
    <div className="grid-container">
      <div class="one">
        <h1>Usuario</h1>
        <p>Nombre: {userData.name}</p>
        <p>Edad: {userData.edad}</p>
        <p>Peso: {userData.Peso}</p>        
      </div>
  </div>
  );
}

function Region() {
  const userData = Data1()
  const total = TiempoTotal()
  const getPais = getPaises()
  const getDia = getUsoDia()
  const getTenPeso = getTendencia()
  const getMayorNombre = getMayorUso()
  console.log(getMayorNombre)

  const dataSourcePais = {
    chart: {
     "caption": "Número de veces que el usuario se levanta",
      decimals: "1",
      showvalues: "1",
      plottooltext: "$label: <b>$dataValue</b>",
      plotfillalpha: "70",
      theme: "fusion",
      streamlineddata: "0"
    },
    data: getPais
  };

  const dataSourceTendencia = {
    chart: {
     "caption": "Tendencia de peso",
      decimals: "1",
      showvalues: "1",
      plottooltext: "$label: <b>$dataValue</b>",
      plotfillalpha: "70",
      theme: "fusion",
      streamlineddata: "0"
    },
    data: getTenPeso
  };

  const dataSourceDia = {
    chart: {
     "caption": "Tiempo de uso promedio de la silla por día",
      decimals: "1",
      showvalues: "1",
      plottooltext: "$label: <b>$dataValue</b>",
      plotfillalpha: "70",
      theme: "fusion",
      streamlineddata: "0"
    },
    data: getDia
  };

  const dataSourceNombre = {
    chart: {
      "caption": "Días de mayor uso",
      decimals: "1",
      showvalues: "1",
      plottooltext: "$label: <b>$dataValue</b>",
      plotfillalpha: "70",
      theme: "fusion",
      streamlineddata: "0",
      showvalues: "0"
    },
    dataset:[{data: getMayorNombre}]
  };

  return (
    <div className="grid-container">
      <div class="one">
        <h1>Dashboard</h1>
      <Label color='teal' size='massive'>
          Silla
          <Label.Detail>{userData.name}</Label.Detail>
      </Label>
      <p></p>
      <Label color='teal' size='massive'>
          Tiempo total
          <Label.Detail>{parseFloat(total.totalH).toFixed(2)}</Label.Detail>
      </Label>
      <p></p>
    </div>
    <ReactFusioncharts  
          type="column2d"
          width="60%"
          height="32%"
          dataFormat="JSON"
          dataSource={dataSourcePais}
        />

    <ReactFusioncharts  
          type="column2d"
          width="60%"
          height="32%"
          dataFormat="JSON"
          dataSource={dataSourceDia}
        />
    <ReactFusioncharts  
          type="spline"
          width="60%"
          height="32%"
          dataFormat="JSON"
          dataSource={dataSourceTendencia}
        />
    <ReactFusioncharts  
          type="sparkline"
          width="60%"
          height="32%"
          dataFormat="JSON"
          dataSource={dataSourceNombre}
        />
    
     </div>
  );
}

function getPaises(){
  const userData = AvgStandups()
  var grafPaises = []
  for(var key in userData){
    let find = grafPaises.find( o => o.label === userData[key].date);
    let index = grafPaises.findIndex( o => o.label === userData[key].date);
    if(!find){
      grafPaises.push({label: userData[key].date ,value: userData[key].avgStandups  })
    }
    else{
      grafPaises[index].value = grafPaises[index].value + 1 
    }
  }
  grafPaises.sort(function(a,b) { return parseInt(a.SortOrder)-parseInt(b.SortOrder)});
  return grafPaises 
}

function getDiaNombre(){
  const userData = TiempoUsoDiaNombre()
  console.log(userData)
  var grafPaises = []
  var order = []
  for(var key in userData){
    let find = grafPaises.find( o => o.label === userData[key].dia);
    let index = grafPaises.findIndex( o => o.label === userData[key].dia);
    if(!find){
      if(parseInt((userData[key].tiempo_milis % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) == 0)
      {
        console.log('Hay un cero :)')
      }
      else{
        grafPaises.push({label: userData[key].dia ,value: parseInt((userData[key].tiempo_milis % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) })
      }
    }
    else{
      grafPaises[index].value = grafPaises[index].value + 1 
    }
  }
  grafPaises.sort((a,b) => b.value - a.value);
  console.log(grafPaises)
  //grafPaises.sort(function(a,b) { return parseInt(a.SortOrder)-parseInt(b.SortOrder)});
  return grafPaises 
}

function getDiaNombreMenor(){
  const userData = TiempoUsoDiaNombre()
  console.log(userData)
  var grafPaises = []
  var order = []
  for(var key in userData){
    let find = grafPaises.find( o => o.label === userData[key].dia);
    let index = grafPaises.findIndex( o => o.label === userData[key].dia);
    if(!find){
      grafPaises.push({label: userData[key].dia ,value: parseInt((userData[key].tiempo_milis % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) })
    }
    else{
      grafPaises[index].value = grafPaises[index].value + 1 
    }
  }
  grafPaises.sort((a,b) => a.value - b.value);
  return grafPaises 
}

function getTendencia(){
  const userData = TendenciaPeso()
  var grafPaises = []
  for(var key in userData){
    
    console.log(moment(userData[key].fecha).format('MMMM Do YYYY'))
    let find = grafPaises.find( o => o.label === moment(userData[key].fecha).format('MMMM Do YYYY'));
    let index = grafPaises.findIndex( o => o.label === moment(userData[key].fecha).format('MMMM Do YYYY'));
    if(!find){
      grafPaises.push({label: moment(userData[key].fecha).format('MMMM Do YYYY') ,value: userData[key].peso  })
    }
    else{
      grafPaises[index].value = grafPaises[index].value + 1 
    }
  }
  grafPaises.sort(function(a,b) { return parseInt(a.SortOrder)-parseInt(b.SortOrder)});
  return grafPaises 
}

function getUsoDia(){
  const userData = TiempoUsoDia()
  var grafPaises = []
  for(var key in userData){
    let find = grafPaises.find( o => o.label === userData[key].fecha);
    let index = grafPaises.findIndex( o => o.label === userData[key].fecha);
    if(!find){
      grafPaises.push({label: userData[key].fecha ,value: userData[key].tiempo_milis })
    }
    else{
      grafPaises[index].value = grafPaises[index].value + 1 
    }
  }
  grafPaises.sort(function(a,b) { return parseInt(a.SortOrder)-parseInt(b.SortOrder)});
  return grafPaises 
}

function getMayorUso(){
  const userData = MayorUsoNombre()
  var grafPaises = []
  for(var key in userData){
    let find = grafPaises.find( o => o.label === userData[key].dia);
    let index = grafPaises.findIndex( o => o.label === userData[key].dia);
    if(!find){
      grafPaises.push({label: userData[key].dia ,value: userData[key].tiempo_milis })
    }
  }
  grafPaises.sort(function(a,b) { return a.value - b.value});
  return grafPaises 
}

function Paises() {
  const getDia = getDiaNombre()
  const getDiaMenor = getDiaNombreMenor()
  console.log(getDia)
  const dataSourcePais = {
    chart: {
      "caption": "Días de mayor uso",
      decimals: "1",
      showvalues: "1",
      plottooltext: "$label: <b>$dataValue</b>",
      plotfillalpha: "70",
      theme: "fusion",
      streamlineddata: "0"
    },
    data: getDia
  };


  const dataSourceMenor = {
    chart: {
      "caption": "Días de menor uso",
      decimals: "1",
      showvalues: "1",
      plottooltext: "$label: <b>$dataValue</b>",
      plotfillalpha: "70",
      theme: "fusion",
      streamlineddata: "0"
    },
    data: getDiaMenor
  };

  return (
    <div className="grid-container">
      <div>            
        <ReactFusioncharts
          type="bar2d"
          width="60%"
          height="32%"
          dataFormat="JSON"
          dataSource={dataSourcePais}
        />
      </div>         
      <div>            
        <ReactFusioncharts
          type="bar2d"
          width="60%"
          height="32%"
          dataFormat="JSON"
          dataSource={dataSourceMenor}
        />
      </div>
    </div>
  )
}

function Tipos(){
  const logdeUso = LogUso()
  console.log(logdeUso)
  let items = []
  for(var i = 0; i < logdeUso.length; i++){
    items.push(logdeUso[i])
  }
  console.log(items)
  const [selectedRow, setSelectedRow] = useState(null);
  const columns = [
    { title: 'Date', field: 'date' },
    { title: 'Beginning', field: 'beginning' },
    { title: 'End', field: 'end' }
  ];
  
  return (
  <div className="grid-container">
  <div style={{ maxWidth: '100%', alignItems: 'center' }} >
    <MaterialTable columns={columns} data={items} title='Historial del tiempo de uso'         onRowClick={(evt, selectedRow) =>
          setSelectedRow(selectedRow.tableData.id)
        }
        options={{
          search: false,
          rowStyle: rowData => ({
            backgroundColor:
              selectedRow === rowData.tableData.id ? '#67aeae' : '#FFF'
          })
        }}/>
  </div>

  </div>
  )
}

function Registrados(){
  return(
    <div className="grid-container"> 
      <div>
      <h4>Últimos cinco casos registrados</h4>
          <center>
          <table id='students'>
          <tr>
            <td>nombre</td>
            <td>ubicación</td>
            <td>edad</td>
            <td>tipo infectado</td>
            <td>estado</td>
          </tr>
          <tr>
            <td>
            Mauro Herrera
            </td>
            <td>
              Quetzaltenango
            </td>
            <td>
              25
            </td>
            <td>
              comunitario
            </td>
            <td>
              asintomático
            </td>
            </tr>
            <tr>
            <td>
              Raquel Muñoz
            </td>
            <td>
              Ciudad Guatemala
            </td>
            <td>
              32
            </td>
            <td>
              comunitario
            </td>
            <td>
              asintomático
            </td>
            </tr>
            <tr>
            <td>
              Mario Lopez
            </td>
            <td>
              Ciudad Guatemala
            </td>
            <td>
              28
            </td>
            <td>
              comunitario
            </td>
            <td>
              asintomático
            </td>
            </tr>
            <tr>
            <td>
              Silvia Calderón
            </td>
            <td>
              Ciudad Guatemala
            </td>
            <td>
              28
            </td>
            <td>
              comunitario
            </td>
            <td>
              asintomático
            </td>
            </tr>
          </table>
          </center>
      </div>
    
    </div>
    
  )
}

function Rango(){
  var grafBarra = []
  var val1 = 0, val2 = 0, val3 = 0, val4 = 0, val5 = 0, val6 = 0, val7 = 0, val8 = 0, val9 = 0
  const userData = Data1()
  for(var key in userData){
    if(userData[key].age >= 0 && userData[key].age <= 10){
      val1 = val1 + 1
      let find = grafBarra.find( o => o.label === '0 - 10');
      if (!find){
        grafBarra.push({label: "0 - 10" ,value:  + val1 })
      }
      else{
        const index = grafBarra.findIndex( o => o.label === '0 - 10');
        grafBarra[index].value = val1
      }
    }
    else if(userData[key].age >= 11 && userData[key].age <= 20){
      val2 = val2 + 1
      let find = grafBarra.find( o => o.label === '11 - 20');
      if (!find){
        grafBarra.push({label: "11 - 20" ,value:  + val2 })
      }
      else{
        const index = grafBarra.findIndex( o => o.label === '11 - 20');
        grafBarra[index].value = val2
      }
    }
    else if(userData[key].age >= 21 && userData[key].age <= 30){
      val3 = val3 + 1
      let find = grafBarra.find( o => o.label === '21 - 30');
      if (!find){
        grafBarra.push({label: "21 - 30" ,value:  + val3 })
      }
      else{
        const index = grafBarra.findIndex( o => o.label === '21 - 30');
        grafBarra[index].value = val3
      }
    }
    else if(userData[key].age >= 31 && userData[key].age <= 40){
      val4 = val4 + 1
      let find = grafBarra.find( o => o.label === '31 - 40');
      if (!find){
        grafBarra.push({label: "31 - 40" ,value:  + val4 })
      }
      else{
        const index = grafBarra.findIndex( o => o.label === '31 - 40');
        grafBarra[index].value = val4
      }
    }
    else if(userData[key].age >= 41 && userData[key].age <= 50){
      val5 = val5 + 1
      let find = grafBarra.find( o => o.label === '41 - 50');
      if (!find){
        grafBarra.push({label: "41 - 50" ,value:  + val5 })
      }
      else{
        const index = grafBarra.findIndex( o => o.label === '41 - 50');
        grafBarra[index].value = val5
      }
    }
    else if(userData[key].age >= 51 && userData[key].age <= 60){
      val6 = val6 + 1
      let find = grafBarra.find( o => o.label === '51 - 60');
      if (!find){
        grafBarra.push({label: "51 - 60" ,value:  + val6 })
      }
      else{
        const index = grafBarra.findIndex( o => o.label === '51 - 60');
        grafBarra[index].value = val6
      }
    }
    else if(userData[key].age >= 61 && userData[key].age <= 70){
      val7 = val7 + 1
      let find = grafBarra.find( o => o.label === '61 - 70');
      if (!find){
        grafBarra.push({label: "61 - 70" ,value:  + val7 })
      }
      else{
        const index = grafBarra.findIndex( o => o.label === '61 - 70');
        grafBarra[index].value = val7
      }
    }
    else if(userData[key].age >= 71 && userData[key].age <= 80){
      val8 = val8 + 1
      let find = grafBarra.find( o => o.label === '71 - 80');
      if (!find){
        grafBarra.push({label: "71 - 80" ,value:  + val8 })
      }
      else{
        const index = grafBarra.findIndex( o => o.label === '71 - 80');
        grafBarra[index].value = val8
      }
    }
    else {
      val9 = val9 + 1
      let find = grafBarra.find( o => o.label === '80 ...');
      if (!find){
        grafBarra.push({label: "80 ..." ,value:  + val9 })
      }
      else{
        const index = grafBarra.findIndex( o => o.label === '80 ...');
        grafBarra[index].value = val9
      }
    }
  
  }

 


  const dataSourceEdades = {
    chart: {
      decimals: "1",
      showvalues: "1",
      plottooltext: "$label: <b>$dataValue</b>",
      plotfillalpha: "70",
      theme: "fusion",
      streamlineddata: "0"
    },
    data: grafBarra
  };


  return(
    <div className="grid-container"> 
      <div>
        <h4>Rango de edades de infectados</h4>
          <ReactFusioncharts
            type="column2d"
            width="94%"
            height="20%"
            dataFormat="JSON"
            dataSource={dataSourceEdades}
          />
        </div>
    </div>
  )
}

export default App;
