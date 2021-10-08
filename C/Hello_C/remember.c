#include <stdio.h>


void main() {
  int i = 1;
  while(i <= 5) {
    printf("Now i equal %d \n", i);
    if(i >= 5) break;
    i++;
  }
}
