import processing.serial.*;

//variable para puerto serial
//Serial comSerial;

//Variables definidas para la direccion del viento
float z=50.0;
float velocidad = 3.0;
float radio = 4.0;
float x = 0;
float y = 0;
int ran = 0;
int mov = 0;
int particula = 5;
float temperatura = 0.0;
float humedad = 0.0;
String direccion = "";
PImage img;
PImage temp1;
PImage temp2;
PImage temp3;
PImage hum1;
PImage hum2;
PImage hum3;
PImage hum4;
PImage norte;
PImage sur;
PImage este;
PImage oeste;
PImage bck;
void setup(){
  size(1000,1000);
  
  //variables de inicio para puerto serial
  //String nombrePuerto = "/dev/us";
  //comSerial = new Serial(this, nombrePuerto, 9600);
  textSize(16);
  noStroke();
  ellipseMode(RADIUS);
  temp1 = loadImage("caliente.png");
  temp2 = loadImage("medio.png");
  temp3 = loadImage("frio.png");
  hum1 = loadImage("25.png");
  hum2 = loadImage("50.png");
  hum3 = loadImage("75.png");
  hum4 = loadImage("100.png");
  norte = loadImage("Norte.png");
  sur = loadImage("Sur.png");
  este = loadImage("Este.png");
  oeste = loadImage("Oeste.png");
  img = loadImage("humedad.png");
  bck = loadImage("Fondo.jpg");
  
}

void draw(){
  background(bck);
  
  String[] lines = loadStrings("mediciones.txt");
  
  println("there are " + lines.length + " lines");
  for (int i = 0 ; i < lines.length; i++) {
    println(lines[i]);
      String[] datos = split(lines[i],'|');
      velocidad = float(datos[0]);
      humedad = float(datos[1])/0.1;
      temperatura = float(datos[2]);
      direccion = datos[3];
  }
  println(direccion);
  if(direccion.equals("N")){
    ran = 2;
  }else if (direccion.equals("S")){
    ran = 0;
  }else if (direccion.equals("E")){
    ran = 1;
  }else if (direccion.equals("O")){
    ran = 3;
  }
  println(ran);
  if(humedad <= 25){
    image(hum1, 30, 50, width/20, height/20);
    text("Humedad: " + humedad,100,75);
  }else if (humedad > 25 && humedad <= 50){
    image(hum2, 30, 50, width/20, height/20);
    text("Humedad: " + humedad,90,75);
  }else if (humedad > 50 && humedad <= 75){
    image(hum3, 30, 50, width/20, height/20);
    text("Humedad: " + humedad,90,75);
  }else if (humedad > 75){
    image(hum4, 30, 50, width/20, height/20);
    text("Humedad: " + humedad,90,75);
  }
  
  if(temperatura <= 22){
    image(temp3, 30, 110, width/20, height/15);
    text("Temperatura: " + temperatura,100,150);
  }else if(temperatura > 22 && temperatura <= 30){
    image(temp2, 30, 110, width/20, height/15);
    text("Temperatura: " + temperatura,100,150);
  }else if(temperatura > 30){
    image(temp1, 30, 110, width/20, height/15);
    text("Temperatura: " + temperatura,100,150);
  }
  

  if(ran == 0){ // Moviminto de Norte a sur
    image(sur, 35, 5, width/25, height/25);
    text("Direccion del Viento: Sur",90,20);
    for(int i=0;i<5;i++){
      for (int j = i ; j < particula; j++) {
        fill(255,0,0);
        mov = int(random(4));
        x=(width-90)/2+j*30+mov;
        y=z+i*30+mov;
        ellipse(x,y,radio,radio);
      }
      if(i>=0 && i<5 && particula>1){
        particula--;
      }else{
        particula=5;
      }
    }
    z += velocidad;
    if(z > height+radio){
      particula=5;
      fill(255);
      z=50.0;
      println(ran);
    }
   
 
  }else if(ran == 1){ // Movimiento de Oeste a Este
    fill(255,255,0);
    text("Direccion del Viento: Este",10,20);
    particula = 0;
    for(int i=0;i<5;i++){
      if(i<3){
        for(int j=0; j<i+1; j++){
          mov = int(random(4));
          y=(height-90)/2+i*30+mov;
          x=z+j*30+mov;
          ellipse(x,y,radio,radio);
        }
      } else{
        for(int j=0; j<5-i; j++){
          mov = int(random(4));
          y=(height-90)/2+i*30+mov;
          x=z+j*30+mov;
          ellipse(x,y,radio,radio);
        }
      }
    }
    z += velocidad;
    if(z > width+radio){
      particula=5;
      fill(255);
      z=50.0;
      println(ran);
    }
  }else if(ran == 2){ //Movimiento de Sur a Norte
    fill(219, 112, 147);
    text("Direccion del Viento: Norte",10,20);
    //ellipse(width/2,height-z,radio,radio);  
    for(int i=0;i<3;i++){
      for(int j=0; j<5; j++){
        if(i==0 && j==2){
          mov = int(random(4));
          x=(width-90)/2+j*30+mov;
          y=height-z+i*30+mov;
          ellipse(x,y,radio,radio);
        } else if(i==1 && j==1){
          mov = int(random(4));
          x=(width-90)/2+j*30+mov;
          y=height-z+i*30+mov;
          ellipse(x,y,radio,radio);
        } else if(i==1 && j==2){
          mov = int(random(4));
          x=(width-90)/2+j*30+mov;
          y=height-z+i*30+mov;
          ellipse(x,y,radio,radio);
        } else if(i==1 && j==3){
          mov = int(random(4));
          x=(width-90)/2+j*30+mov;
          y=height-z+i*30+mov;
          ellipse(x,y,radio,radio);
        } else if(i==2){
          mov = int(random(4));
          x=(width-90)/2+j*30+mov;
          y=height-z+i*30+mov;
          ellipse(x,y,radio,radio);
        }
      }
    }
    z += velocidad;
    if(height-z < radio){
      ran = int(random(4));
      humedad = int(random(100));
      temperatura = int(random(40));
      println(ran);
      if(ran == 2){
        z=height;
      }else{
        z=50.0;
      }
    }
    
  }else if(ran == 3){ //Movimiento de Este a Oeste
    fill(0,100,0);
    text("Direccion del Viento: Oeste",10,20);
    //ellipse(width-z, height/2,radio,radio);
    for(int i=0;i<5;i++){
      if(i==2){
        mov = int(random(4));
        y=(height-90)/2+i*30+mov;
        x=width-z+i*30+mov;
        ellipse(x,y,radio,radio);
      } else if(i==3){
        for(int j=1; j<i+1;j++){
          mov = int(random(4));
          y=(height-90)/2+j*30+mov;
          x=width-z+i*30+mov;
          ellipse(x,y,radio,radio);
        }
      } else if(i==4){
        for(int j=0; j<i+1;j++){
          mov = int(random(4));
          y=(height-90)/2+j*30+mov;
          x=width-z+i*30+mov;
          ellipse(x,y,radio,radio);
        }
      }
    }
        z += velocidad;
    if(width-z < radio){
      ran = int(random(4));
      humedad = int(random(100));
      temperatura = int(random(40));      
      println(ran);
      if(ran == 3){
        z=width;
      }else{
        z=50.0;
      }
    }
  }
}  
