#include <LiquidCrystal_I2C.h>
#include "DHT.h"


LiquidCrystal_I2C lcd(0x27, 16, 2); // I2C address 0x27, 16 column and 2 rows

#define DHTPIN 7 
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);


void setup()
{
  lcd.begin(); // initialize the lcd
  lcd.backlight();
  Serial.begin(9600);
  dht.begin();
}

void loop()
{

  float h = dht.readHumidity();
  float t = dht.readTemperature();
  float f = dht.readTemperature(true);
  int w = analogRead(0);

  Serial.print(F("{\"Temperature\":"));
  Serial.print(t);
  Serial.print(F(", \"Humidity\":"));
  Serial.print(h);
  Serial.print(F(", \"Water\":"));
  Serial.print(w);
  Serial.println(F("}"));

  delay(1000);

  lcd.clear();                 // clear display
  
  lcd.setCursor(0, 0);         // move cursor to   (0, 0)
  lcd.print("T: ");
  lcd.print(t);        // print message at (0, 0)
  
  lcd.setCursor(0, 1);         // move cursor to   (2, 1)
  lcd.print("H: ");
  lcd.print(h); // print message at (2, 1)

  lcd.setCursor(9, 0);         // move cursor to   (2, 1)
  lcd.print("W: ");
  lcd.print(w);


                   // display the above for two seconds
               // display the above for two seconds
}