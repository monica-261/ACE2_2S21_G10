#include "HX711.h"
 
#define DEBUG_HX711
 
// Parámetro para calibrar el peso y el sensor
#define CALIBRACION 21920.0
 
// Pines
byte pinData = 3;
byte pinClk = 2;
byte pinTrig = 6;
byte pinEcho = 7;

//Habilitar Impresion
bool enabled = false;

// Tiempo y Distancia Del Sensor Ultrasonico
int distancia;
int tiempo;
 
// Objeto HX711
HX711 bascula;
 
void setup() { 
  #ifdef DEBUG_HX711
    // Iniciar comunicación serie
    Serial.begin(9600);
  #endif
    pinMode(pinTrig, OUTPUT);
    pinMode(pinEcho, INPUT); 
    // Iniciar sensor
    bascula.begin(pinData, pinClk);
    // Aplicar la calibración
    bascula.set_scale(CALIBRACION);
    // Iniciar la tara
    // No tiene que haber nada sobre el peso
    bascula.tare();
}
 
void loop() {
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
    
    //Salida Por El Serial
    String jsonOutput = "{\"Peso\": ";
    jsonOutput.concat(String(peso));
    jsonOutput.concat(", \"Distancia\":");
    
    if(distancia == 69) distancia = 0;
    
    jsonOutput.concat(String(distancia)); 
    jsonOutput.concat(", \"Estado\": \"Sentado\"");
    jsonOutput.concat("}");
    Serial.println(jsonOutput);
  }else{
    if (enabled==true){
      //Salida Por El Serial    
      String jsonOutput = "{\"Estado\": \"Levantado\"}";
      Serial.println(jsonOutput);
  
      enabled = false;
    }
  }
  delay(500);
  
#endif
}
