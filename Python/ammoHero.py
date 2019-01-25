import random

print("Ваш герой безоружен")
print("Введите 5 предметов, которые дадите ему с собой")
ammo1 = input("1: ")
ammo2 = input("2: ")
ammo3 = input("3: ")
ammo4 = input("4: ")
ammo5 = input("5: ")

print("Ваш список неприятелей включает: ")
emeny1 = input("1: ")
emeny2 = input("2: ")
emeny3 = input("3: ")
emeny4 = input("4: ")
emeny5 = input("5: ")


takeSword = random.randint(0, 4)
takeEmeny = random.randint(0, 4)
yourChance = random.randint(1, 5)

fullAmmo = [ammo1, ammo2, ammo3, ammo4, ammo5]
fullEmeny = [emeny1, emeny2, emeny3, emeny4, emeny5]

print("На вас внезапно напал "+ fullEmeny[takeEmeny] +" !!!")
print("И вы достали " + fullAmmo[takeSword])
print("Вы ударяете о "+ fullEmeny[takeEmeny] +" своим " + fullAmmo[takeSword])

if yourChance == 1:
	print(fullAmmo[takeSword] + " Сбивает с ног " + fullEmeny[takeEmeny] + ". Сегодня вы победитель")

if yourChance == 2:
	print("Вы спотыкаетесь и падаете прямо на " + fullEmeny[takeEmeny] + ". Сегодня не ваш день")

if yourChance == 3:
	print(fullEmeny[takeEmeny] + " кидает в Вас яйцом. Но вы отбивате его Вашем " + fullAmmo[takeSword] + " и яйцо летит прямо в глаз " + fullEmeny[takeEmeny])

if yourChance == 4:
	print("Достав свой " + fullAmmo[takeSword] +  " Вы пугаете " + fullEmeny[takeEmeny] + ". Он убегает в истерике.")

if yourChance == 5:
	print(fullEmeny[takeEmeny] + " кидает в Вас яйцом. Оно летит вам прямо в лоб и вы не успеваете его отбить")


input("Enter for to exit")


# for i in fullAmmo : 
# 	print("Вы " i)
