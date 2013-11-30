#include <RobotMovil.h>
RobotMovil robot;

#include <NewPing.h>
NewPing sonar(16,16,50);

String inData="";
int start=0;
int i=0;


void setup()
{
    Serial.begin(9600);
    Serial.println("Begin program...\n");
    
}

void loop()
{
  
  i++;
  if (i==30000) {
    int dist = sonar.ping_cm();
    if (dist==0) {dist=50;}
    //Serial.println("dist: "+dist);
    Serial.println(dist);
    i=0;
  }
  
  while (Serial.available() > 0)
    {
        char recieved = Serial.read();
     
        if (recieved == '$') {
          start=1;
          inData="";
        }
     
        if (start==1 && recieved!='$') {
          

          // Process message when new line character is recieved
          if (recieved == '*')
          {
             //Serial.println("Recivied: $"+inData+"*");
            
             if (inData  !=  "") {
              Serial.println("Arduino Received: "+inData);
              
              if (inData == "forward") {
                robot.forward(120,120,1000);
              }
              
              if (inData == "rotate-left") {
                robot.rotate(-1000);
              }
              
              if (inData == "brake") {
                robot.brake(100000);
              }
              
              if (inData == "rotate-right") {
                robot.rotate(1000);
              }
              
              if (inData == "reverse") {
                robot.reverse(120,120,1000);
              }
              
             }
             
            inData = ""; // Clear recieved buffer
            start=0;
        }
        
        inData += recieved; 
        
        }
    }
  
 
  
}

