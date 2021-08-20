#include <DHT.h>
int dhtPin=3;
DHT dht(dhtPin, DHT11);

int valorN;
int valorNO;
int valorO;
int valorSO;
int valorS;
int valorSE;
int valorE;
int valorNE;

int valorDeLectura = 925;

float veloc1=0;
int tiempo=0;
int cnt=0;
float v1;
float v2;

String directionV = "";

void setup(){
  // put your setup code here, to run once:
  Serial.begin(9600);
  dht.begin();
}

void loop() {
  // put your main code here, to run repeatedly:
  delay(5000);

  v1 =(analogRead(A0)); // lectura de sensor a0
  veloc1= (v1*0.190); // 0,190 corresponde a la pendiente de la curva aca deben poner el numero que calcularon
  
  /*//if (veloc1>v2)v2=veloc1; // muestra la velocidad maxima que alcanzo 
  Serial.print("Velocidad Del Viento: ");
  Serial.print(veloc1);
  Serial.println("km/h");*/
  
  valorN = analogRead(A1);
  valorNO = analogRead(A2);
  valorO = analogRead(A3);
  valorSO = analogRead(A4);
  valorS = analogRead(A5);
  valorSE = analogRead(A6);
  valorE = analogRead(A7);
  valorNE = analogRead(A8);

  /*Serial.println("N: "+String(valorN));
  Serial.println("NO: "+String(valorNO));
  Serial.println("O: "+String(valorO));
  Serial.println("SO: "+String(valorSO));
  Serial.println("S: "+String(valorS));
  Serial.println("SE: "+String(valorSE));
  Serial.println("E: "+String(valorE));
  Serial.println("NE: "+String(valorNE));*/

  if(valorN>valorDeLectura) directionV="Norte";
  else if(valorNO>valorDeLectura) directionV="NorOeste";
  else if(valorO>valorDeLectura) directionV="Oeste";
  else if(valorSO>valorDeLectura) directionV="SurOeste";
  else if(valorS>valorDeLectura) directionV="Sur";
  else if(valorSE>valorDeLectura) directionV="SurEste";
  else if(valorE>valorDeLectura) directionV="Este";
  else if(valorNE>valorDeLectura) directionV="NorEste";

  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();
  float temperatureF = dht.readTemperature(true);
  
  if(isnan(humidity) || isnan(temperature) || isnan(temperatureF)){
    Serial.println("Error en la lectura del sensor");
    return;
  }

  float hic = dht.computeHeatIndex(temperature, humidity, false);
  float hif = dht.computeHeatIndex(temperatureF, humidity);

  /*Serial.print("Humedad: ");
  Serial.print(humidity);
  Serial.print("% Temperatura: ");
  Serial.print(temperature);
  Serial.print("°C ");
  Serial.print(temperatureF);
  Serial.print("°F Heat Index: ");
  Serial.print(hic);
  Serial.print("°C ");
  Serial.print(hif);
  Serial.println("°F ");
  Serial.println("");
  Serial.println("");
  Serial.println("*******************************************************************************************************");*/

  String jsonOutput = "{\"humidity\": ";
  jsonOutput.concat(String(humidity));
  jsonOutput.concat(", \"temp\":");
  jsonOutput.concat(String(temperature));
  jsonOutput.concat(", \"velocity\": ");
  jsonOutput.concat(String(veloc1));
  jsonOutput.concat(", \"direction\": ");
  jsonOutput.concat("\""+String(directionV)+"\"");
  jsonOutput.concat("}");
  Serial.println(jsonOutput);
  directionV="";
}
