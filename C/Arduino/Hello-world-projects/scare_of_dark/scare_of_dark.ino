//with  photo resistor


#define LED_PIN 5
#define POT_PIN A0

void setup() {
  // put your setup code here, to run once:

  pinMode(LED_PIN, OUTPUT);
  pinMode(POT_PIN, INPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  int  tact, brightness;
  brightness = analogRead(POT_PIN);
  tact = brightness * 0.75;
  if(tact <= 256){
    tact +=  275;
    }
     if(brightness <= 100){
      brightness +=  100;
    }
  
  delay(tact * 0.5);
  analogWrite(LED_PIN,  255 / (brightness * 0.155));
  delay(tact * 0.45);
  analogWrite(LED_PIN, 255 / (brightness * 0.085));
  delay(tact * 0.2);
  analogWrite(LED_PIN, 255 / (brightness * 0.375));
  delay(tact * 0.7);
  analogWrite(LED_PIN, 255 / (brightness * 0.105 ));
  delay(tact * 0.45);
  analogWrite(LED_PIN, 255 / (brightness * 0.385));

}
