void amy_mind(char *msg) {
  msg += 5;
  printf("%s \n", msg);
  puts(msg - 5);
}

int main() {
  char *msg_from_amy = "Don`t call me again!!";
  amy_mind(msg_from_amy);
  return 0;
};

