/*
* Программа для оценивания сложности карт (Магнитики)
*/

#include <stdlib.h>
#include<stdio.h>

int main() {
    int count = 0;
    char card_name[3];
    while(card_name[0] != 'X') {
        puts("Введите название карты: ");
        scanf("%2s", card_name);
        int val = 0;
        if (card_name[0] == 'K') val = 10;
        else if (card_name[0] == 'Q') val = 10;
        else if (card_name[0] == 'J') val = 10;
        else if (card_name[0] == 'A') val = 11;
        else val = atoi(card_name); //atoi преобразовывает текст в число
        printf("Ценность карты: %i\n", val);
        if(val < 1  ||  val > 11) {
            puts("Я не понимаю это значение");
            break;
        }
        if(val > 10) {
            count -= 2;
            printf("Счетчик уменьшился : %i\n", count);
        }
        if else (val == 10) {
            count--;
            printf("Счетчик уменьшился : %i\n", count);
        } else {
            count++;
            printf("Счетчик увеличился : %i\n", count);
        }
    }
    return 0;
}

int main();