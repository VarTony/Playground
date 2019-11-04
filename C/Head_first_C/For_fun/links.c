#include <stdio.h>

void change_value_in_link(char* link1) {
  int i = 0;
  while(i < 5) {
    *link1 = '\n';
    ++link1;
    i++;
  }
  *link1 = 'K';
}


int main(void) {
  printf("Hello World\n");
  char string[] = "Something text";
  printf("Value string : %s \n", string);
  change_value_in_link(&string[0]);
  printf("Value string now : %s \n", string);
  return 0;
}
