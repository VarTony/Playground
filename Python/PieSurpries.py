
import random

print("Ваш сюрприз в пирожке")

pie = 1
surpiesNum = random.randint(1, 5)

while pie >= 1:  
    
    if surpiesNum == 1:
        print("Вы получили еще пирожок")

    if surpiesNum == 2:
        print("Это майский жук")
        pie -= 1

    if surpiesNum == 3:
        print("Это 1 доллар")
        pie -= 1
        
    if surpiesNum == 4:
        print("Это обручальное кольцо")
        pie -= 1

    if surpiesNum == 5:
        print("Это 11 рублей")
        pie -= 1

    else:
        print("Этот пирожок принадлежит не вам, отдайте")
        pie -= 1


input("enter чтобы выйти")