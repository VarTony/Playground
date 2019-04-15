
//width  variable resistor


#define LED_PIN 5
#define POT_PIN A0

void setup() {
  // put your setup code here, to run once:

  pinMode(LED_PIN, OUTPUT);
  pinMode(POT_PIN, INPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  int  timeless, brightness;
  brightness = analogRead(POT_PIN);
  timeless = brightness * 0.75;
  delay(timeless * 0.5);
  analogWrite(LED_PIN,  (brightness * 0.275));
  delay(timeless * 0.7);
  analogWrite(LED_PIN, (brightness * 0.312));
  delay(timeless * 0.1);
  analogWrite(LED_PIN, (brightness * 0.115));
  delay(timeless * 0.5);
  analogWrite(LED_PIN, (brightness * 0.285 ));
  delay(timeless * 0.7);
  analogWrite(LED_PIN, (brightness * 0.115));

}
