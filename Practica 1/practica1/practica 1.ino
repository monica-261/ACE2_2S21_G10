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

int valorDeLectura = 975;

float veloc1=0;
int tiempo=0;
int cnt=0;
float v1;
float v2;

void setup(){
  // put your setup code here, to run once:
  Serial.begin(9600);
  dht.begin();
}

void loop() {
  // put your main code here, to run repeatedly:
  delay(5000);

  v1 =(analogRead(A0)); // lectura de sensor a0
  Serial.print("Voltaje: "); Serial.println(v1);
  veloc1= (v1*0.190); // 0,190 corresponde a la pendiente de la curva aca deben poner el numero que calcularon
  //if (veloc1>v2)v2=veloc1; // muestra la velocidad maxima que alcanzo 
  Serial.print("Velocidad Del Viento: ");
  Serial.print(veloc1);
  Serial.println("km/h");
  
  valorN = analogRead(A1);
  valorNO = analogRead(A2);
  valorO = analogRead(A3);
  valorSO = analogRead(A4);
  valorS = analogRead(A5);
  valorSE = analogRead(A6);
  valorE = analogRead(A7);
  valorNE = analogRead(A8);

  Serial.print("Direccion Del Viento:");
  /*if(valorN>valorDeLectura)*/ Serial.print("NORTE: "); Serial.println(valorN);
  /*if(valorNO>valorDeLectura)*/ Serial.print("NOROESTE: "); Serial.println(valorNO);
  /*if(valorO>valorDeLectura)*/ Serial.print("OESTE: "); Serial.println(valorO);
  /*if(valorSO>valorDeLectura)*/ Serial.print("SUROESTE: "); Serial.println(valorSO);
  /*if(valorS>valorDeLectura)*/ Serial.print("SUR: "); Serial.println(valorS);
  /*if(valorSE>valorDeLectura)*/ Serial.print("SURESTE: "); Serial.println(valorSE);
  /*if(valorE>valorDeLectura)*/ Serial.print("ESTE: "); Serial.println(valorE);
  /*if(valorNE>valorDeLectura)*/ Serial.print("NORESTE: "); Serial.println(valorNE);

  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();
  float temperatureF = dht.readTemperature(true);
  if(isnan(humidity) || isnan(temperature) || isnan(temperatureF)){
    Serial.println("Error en la lectura del sensor");
    return;
  }

  float hic = dht.computeHeatIndex(temperature, humidity, false);
  float hif = dht.computeHeatIndex(temperatureF, humidity);

  Serial.print("Humedad: ");
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
  Serial.println("*******************************************************************************************************");
}
