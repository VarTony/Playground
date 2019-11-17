void cards_mixer(char cards[]) {
  char zero = cards[0];
  cards[0] = cards[3];
  cards[3] = cards[1];
  cards[1] = zero;
  zero = cards[2];
  cards[2] = cards[0];
  cards[0] = zero;
}



int main(void) {
  char cards[] = "AJQK";
  printf("Cards before mix : %s \n", cards);
  cards_mixer(cards);
  printf("Cards after mix : %s \n", cards);
  return 0;
}
