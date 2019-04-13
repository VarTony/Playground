
#define LED_PIN 5

void setup() {
  // put your setup code here, to run once:

  pinMode(LED_PIN, OUTPUT);

}

void loop() {
  // put your main code here, to run repeatedly:
  delay(128);

  analogWrite(LED_PIN, 75);
  delay(122);
  
  analogWrite(LED_PIN, 255);
  delay(11);
  
  analogWrite(LED_PIN, 15);
  delay(512);
  
  analogWrite(LED_PIN, 200);
  delay(122);

  analogWrite(LED_PIN, 11);
  delay(32);
}
