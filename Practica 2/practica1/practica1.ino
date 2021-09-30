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

int valorDeLectura = 999;

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
  veloc1= (v1*0.52); // 0,190 corresponde a la pendiente de la curva aca deben poner el numero que calcularon
  
  /*Serial.print("Velocidad Del Viento: ");
  Serial.print(String(veloc1)+"-"+String(v1));*/
  
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

  if(valorN>valorDeLectura) directionV="N";
  else if(valorNO>valorDeLectura) directionV="N";
  else if(valorO>valorDeLectura) directionV="O";
  else if(valorSO>valorDeLectura) directionV="O";
  else if(valorS>valorDeLectura) directionV="S";
  else if(valorSE>valorDeLectura) directionV="S";
  else if(valorE>valorDeLectura) directionV="E";
  else if(valorNE>valorDeLectura) directionV="E";

  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();
  float temperatureF = dht.readTemperature(true);
  
  if(isnan(humidity) || isnan(temperature) || isnan(temperatureF)){
    Serial.println("Error en la lectura del sensor");
    return;
  }

  float hic = dht.computeHeatIndex(temperature, humidity, false);
  float hif = dht.computeHeatIndex(temperatureF, humidity);

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
  directionV=directionV;
}
