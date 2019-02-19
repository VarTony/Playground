#include <stdio.h>

int main() {

	printf("I`m bot.""What`s your name?\n");
	char name[15];
	scanf("%s", name);
	printf("Hi, %s, How old are you?\n", name);
	int age;
	scanf("%d", &age);
	printf("You looking younger! " 
			"I was think %d! \n",  age - 3);

	return 0;
}