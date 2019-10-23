/*
* Программа для оценивания сложности карт (Магнитики)
*/

#include <stdlib.h>
#include<stdio.h>

int main() {
	char card_name[3];
	puts("Введите название карты: ");
	scanf("%2s", card_name);
	int val = 0;
	if(card_name[0] == 'K') val = 10;
	else if(card_name[0] == 'Q') val = 10;
	else if(card_name[0] == 'J') val = 10;
	else if(card_name[0] == 'A') val = 11;
	else val = atoi(card_name); //atoi преобразовывает текст в число
	printf("Ценность карты: %i\n", val);
	return 0;
}

int main();
