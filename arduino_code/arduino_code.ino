/*
  ESP8266 Unified Robot Control
  Includes three modes:
  - M1: WiFi Control
  - M2: Obstacle Avoidance
  - M3: Follow

  Based on original code by Ajay Huajian
  ZHIYI Technology Inc.
*/

#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <Servo.h>
#include <ArduinoJson.h>

// Pin Definitions
#define Trig 2     // GPIO2  (D9)
#define Echo 15    // GPIO15 (D10)
#define IN_1 0     // L9110S B-1A motors Left       GPIO0 (D8)
#define IN_2 4     // L9110S B-1B motors Left       GPIO4 (D4)
#define IN_3 13    // L9110S A-1A motors Right      GPIO13(D7)
#define IN_4 12    // L9110S A-2A motors Right      GPIO12(D6)
#define ServoPin 5 // ServoPin Input pin            GPIO5(D3)

// Global Variables
int speedCar = 200; // Default speed (0~255)
int speed_low = speedCar / 1.5;
float distance = 0;                    // Current measured distance
String command;                        // String to store app command state
int currentMode = 1;                   // Default mode: WiFi Control (1)
unsigned long lastTime = 0;            // For non-blocking operations
const char *ssid = "ZY ESP8266 Robot"; // WiFi Hotspot Name
String robotStatus = "Stopped";        // Current movement status

// Objects
ESP8266WebServer server(80);
Servo myservo;

void setup()
{
  // Initialize Serial
  Serial.begin(115200);

  // Setup pins
  pinMode(IN_1, OUTPUT);
  pinMode(IN_2, OUTPUT);
  pinMode(IN_3, OUTPUT);
  pinMode(IN_4, OUTPUT);
  pinMode(Trig, OUTPUT);
  pinMode(Echo, INPUT);

  // Initialize servo
  myservo.attach(ServoPin, 700, 2400);
  myservo.write(90); // Center position

  // Initialize motors to stop
  Stop();

  // Setup WiFi Access Point
  WiFi.mode(WIFI_AP);
  WiFi.softAP(ssid);
  IPAddress myIP = WiFi.softAPIP();
  Serial.print("AP IP address: ");
  Serial.println(myIP);

  // Setup server routes
  server.on("/", HTTP_handleRoot);
  server.on("/status", HTTP_getStatus);
  server.on("/mode", HTTP_setMode);
  server.onNotFound(HTTP_handleRoot);

  server.begin();
  Serial.println("HTTP server started");
  Serial.println("Mode 1: WiFi Control");
}

void loop()
{
  // Always handle client requests first
  server.handleClient();

  // Handle different modes
  switch (currentMode)
  {
  case 1: // WiFi Control Mode
    // This mode is handled by HTTP_handleRoot
    break;

  case 2: // Obstacle Avoidance Mode
    if (millis() - lastTime > 50)
    {                // Run every 50ms
      avoidance(20); // 20cm obstacle detection distance
      lastTime = millis();
    }
    break;

  case 3: // Follow Mode
    if (millis() - lastTime > 50)
    { // Run every 50ms
      followMode();
      lastTime = millis();
    }
    break;
  }
}

// HTTP Handler for root path
void HTTP_handleRoot()
{
  if (currentMode == 1)
  { // Only process commands in WiFi Control mode
    if (server.hasArg("State"))
    {
      command = server.arg("State");
      Serial.print("Command: ");
      Serial.println(command);

      // Mode switching commands
      if (command == "M1")
      {
        currentMode = 1;
        Stop();
        robotStatus = "WiFi Control Mode";
        Serial.println("Mode 1: WiFi Control");
      }
      else if (command == "M2")
      {
        currentMode = 2;
        robotStatus = "Obstacle Avoidance Mode";
        Serial.println("Mode 2: Obstacle Avoidance");
      }
      else if (command == "M3")
      {
        currentMode = 3;
        robotStatus = "Follow Mode";
        Serial.println("Mode 3: Follow");
      }
      // Movement commands
      else if (command == "F")
      {
        Forward();
        robotStatus = "Moving Forward";
      }
      else if (command == "B")
      {
        Backward();
        robotStatus = "Moving Backward";
      }
      else if (command == "L")
      {
        TurnLeft();
        robotStatus = "Turning Left";
      }
      else if (command == "R")
      {
        TurnRight();
        robotStatus = "Turning Right";
      }
      else if (command == "I")
      {
        goAheadRight();
        robotStatus = "Forward Right";
      }
      else if (command == "G")
      {
        goAheadLeft();
        robotStatus = "Forward Left";
      }
      else if (command == "J")
      {
        goBackRight();
        robotStatus = "Backward Right";
      }
      else if (command == "H")
      {
        goBackLeft();
        robotStatus = "Backward Left";
      }
      // Speed control
      else if (command == "0")
        speedCar = 165;
      else if (command == "1")
        speedCar = 175;
      else if (command == "2")
        speedCar = 185;
      else if (command == "3")
        speedCar = 195;
      else if (command == "4")
        speedCar = 205;
      else if (command == "5")
        speedCar = 215;
      else if (command == "6")
        speedCar = 225;
      else if (command == "7")
        speedCar = 235;
      else if (command == "8")
        speedCar = 245;
      else if (command == "9")
        speedCar = 255;
      // Stop command
      else if (command == "S")
      {
        Stop();
        robotStatus = "Stopped";
      }

      // Update speed_low when speedCar changes
      speed_low = speedCar / 1.5;
    }
  }

  server.send(200, "text/html", "");
  delay(1);
}

// HTTP Handler for status requests
void HTTP_getStatus()
{
  // Create JSON response with current status
  StaticJsonDocument<200> jsonDoc;

  jsonDoc["mode"] = currentMode;
  jsonDoc["mode_name"] = (currentMode == 1) ? "WiFi Control" : (currentMode == 2) ? "Obstacle Avoidance"
                                                                                  : "Follow";
  jsonDoc["distance"] = GetDistance();
  jsonDoc["speed"] = speedCar;
  jsonDoc["status"] = robotStatus;

  String jsonResponse;
  serializeJson(jsonDoc, jsonResponse);

  server.send(200, "application/json", jsonResponse);
}

// HTTP Handler for mode changes
void HTTP_setMode()
{
  if (server.hasArg("mode"))
  {
    int newMode = server.arg("mode").toInt();

    if (newMode >= 1 && newMode <= 3)
    {
      currentMode = newMode;
      Stop(); // Always stop when changing modes

      if (currentMode == 1)
      {
        robotStatus = "WiFi Control Mode";
        Serial.println("Mode 1: WiFi Control");
      }
      else if (currentMode == 2)
      {
        robotStatus = "Obstacle Avoidance Mode";
        Serial.println("Mode 2: Obstacle Avoidance");
      }
      else if (currentMode == 3)
      {
        robotStatus = "Follow Mode";
        Serial.println("Mode 3: Follow");
      }

      server.send(200, "text/plain", "Mode changed to " + String(currentMode));
    }
    else
    {
      server.send(400, "text/plain", "Invalid mode. Use 1-3.");
    }
  }
  else
  {
    server.send(400, "text/plain", "Missing mode parameter");
  }
}

// Get distance from ultrasonic sensor
float GetDistance()
{
  digitalWrite(Trig, LOW);
  delayMicroseconds(2);
  digitalWrite(Trig, HIGH);
  delayMicroseconds(10);
  digitalWrite(Trig, LOW);

  distance = pulseIn(Echo, HIGH) / 58.00;
  return distance;
}

// Movement Functions
void Forward()
{
  digitalWrite(IN_1, LOW);
  analogWrite(IN_2, speedCar + 10); // Speed adjustment for straight movement
  analogWrite(IN_3, speedCar);
  digitalWrite(IN_4, LOW);
}

void Backward()
{
  analogWrite(IN_1, speedCar);
  digitalWrite(IN_2, LOW);
  digitalWrite(IN_3, LOW);
  analogWrite(IN_4, speedCar);
}

void TurnLeft()
{
  analogWrite(IN_1, speedCar);
  digitalWrite(IN_2, LOW);
  analogWrite(IN_3, speedCar);
  digitalWrite(IN_4, LOW);
  Serial.println("TurnLeft");
}

void TurnRight()
{
  digitalWrite(IN_1, LOW);
  analogWrite(IN_2, speedCar);
  digitalWrite(IN_3, LOW);
  analogWrite(IN_4, speedCar);
  Serial.println("TurnRight");
}

void goAheadLeft()
{
  digitalWrite(IN_1, LOW);
  analogWrite(IN_2, speed_low);
  analogWrite(IN_3, speedCar);
  digitalWrite(IN_4, LOW);
}

void goAheadRight()
{
  digitalWrite(IN_1, LOW);
  analogWrite(IN_2, speedCar);
  analogWrite(IN_3, speed_low);
  digitalWrite(IN_4, LOW);
}

void goBackLeft()
{
  analogWrite(IN_1, speed_low);
  digitalWrite(IN_2, LOW);
  digitalWrite(IN_3, LOW);
  analogWrite(IN_4, speedCar);
}

void goBackRight()
{
  analogWrite(IN_1, speedCar);
  digitalWrite(IN_2, LOW);
  digitalWrite(IN_3, LOW);
  analogWrite(IN_4, speed_low);
}

void Stop()
{
  digitalWrite(IN_1, LOW);
  digitalWrite(IN_2, LOW);
  digitalWrite(IN_3, LOW);
  digitalWrite(IN_4, LOW);
}

void turnAround()
{
  digitalWrite(IN_1, LOW);
  digitalWrite(IN_2, LOW);
  digitalWrite(IN_3, LOW);
  digitalWrite(IN_4, LOW);
  delay(1000);
  digitalWrite(IN_1, HIGH);
  digitalWrite(IN_2, LOW);
  digitalWrite(IN_3, LOW);
  digitalWrite(IN_4, HIGH);
  delay(1000);
}

// Mode 2: Obstacle Avoidance Mode
void avoidance(int set_dis)
{
  float leftDis, rightDis;

  myservo.write(90); // Steering engine back to center
  float cm = GetDistance();

  if (cm <= set_dis)
  {
    Stop(); // Stop the car
    robotStatus = "Obstacle Detected";
    delay(200);

    // Check left distance
    myservo.write(140);
    delay(500);
    leftDis = GetDistance();

    // Return to center briefly
    myservo.write(90);
    delay(100);

    // Check right distance
    myservo.write(40);
    delay(500);
    rightDis = GetDistance();

    // Return to center
    myservo.write(90);

    if (leftDis < set_dis && rightDis < set_dis)
    {
      turnAround();
    }

    // Compare distances and decide direction
    if (leftDis < rightDis)
    {
      // Right has more space
      if (rightDis < 10)
      {
        Backward();
        robotStatus = "Backing Up, Then Right";
        delay(300);
        TurnRight();
        delay(200);
      }
      else
      {
        TurnRight();
        robotStatus = "Turning Right";
        delay(200);
      }
    }
    else
    {
      // Left has more space
      if (leftDis < 10)
      {
        Backward();
        robotStatus = "Backing Up, Then Left";
        delay(300);
        TurnLeft();
        delay(200);
      }
      else
      {
        TurnLeft();
        robotStatus = "Turning Left";
        delay(200);
      }
    }
  }
  else
  {
    Forward();
    robotStatus = "Moving Forward";
  }
}

// Mode 3: Follow Mode
void followMode()
{
  float cm = GetDistance();

  if (cm < 5)
  {
    Backward();
    robotStatus = "Too Close - Backing Up";
  }
  else if (cm > 10 && cm < 25)
  {
    Forward();
    robotStatus = "Following";
  }
  else
  {
    Stop();
    robotStatus = "Waiting for Object";
  }
}