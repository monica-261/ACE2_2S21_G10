#include "HX711.h"
 
#define DEBUG_HX711
 
// Parámetro para calibrar el peso y el sensor
#define CALIBRACION 21920.0
 
// Pines
byte pinData = 3;
byte pinClk = 2;
byte pinTrig = 6;
byte pinEcho = 7;
byte buzzer = 5;

//Habilitar Impresion
bool enabled = true;
bool primeraImpresion = true;

// Tiempo y Distancia Del Sensor Ultrasonico
int distancia;
int tiempo;
 
// Objeto HX711
HX711 bascula;
 
void setup() { 
  #ifdef DEBUG_HX711
    // Iniciar comunicación serie
    Serial.begin(9600);
    Serial3.begin(9600);
    Serial.println("Conectado HX711");
  #endif
    pinMode(pinTrig, OUTPUT);
    pinMode(pinEcho, INPUT); 
    pinMode(buzzer, OUTPUT); 
    // Iniciar sensor
    bascula.begin(pinData, pinClk);
    // Aplicar la calibración 
    bascula.set_scale(CALIBRACION);
    // Iniciar la tara
    // No tiene que haber nada sobre el peso
    bascula.tare();
}
 
void loop() {
delay(3000);
#ifdef DEBUG_HX711
  //lectura del peso
  double peso = bascula.get_units()*-1;

  //lectura de la distancia
  digitalWrite(pinTrig, HIGH);
  delay(1);
  digitalWrite(pinTrig, LOW);
  
  tiempo=pulseIn(pinEcho, HIGH);
  distancia = tiempo/58.2;  
  
  if(peso>5){  
    enabled = true;

    if(distancia == 69) distancia = 0;
    
    if(distancia > 10) digitalWrite(buzzer, HIGH);
    else digitalWrite(buzzer, LOW);

    String jsonOutput = "{\"tipo\": \"MIDIENDO\", ";
    //Salida Por El Serial
    if(primeraImpresion==true) jsonOutput = "{\"tipo\": \"SENTADO\", ";
    
    primeraImpresion = false;
    
    jsonOutput.concat("\"data\": {");
    jsonOutput.concat("\"peso\":");
    jsonOutput.concat(String(peso));
    jsonOutput.concat(", \"distancia\":");    
    jsonOutput.concat(String(distancia)); 
    jsonOutput.concat("}}");
    Serial3.println(jsonOutput);
    Serial.println(jsonOutput);
  }else{
    if (enabled==true){
      //Salida Por El Serial    
      digitalWrite(buzzer, LOW);
      primeraImpresion = true;
      String jsonOutput = "{\"tipo\": \"LEVANTADO\", ";
      jsonOutput.concat("\"data\": {");
      jsonOutput.concat("\"peso\":");
      jsonOutput.concat(String(peso));
      jsonOutput.concat(", \"distancia\":");    
      jsonOutput.concat(String(distancia)); 
      jsonOutput.concat("}}");
      Serial3.println(jsonOutput);
      Serial.println(jsonOutput);
      enabled = false;
    }    
  } 
  
#endif
}
