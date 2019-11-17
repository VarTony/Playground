/*
Краткая информация о базе данных "Компьютерная фирма":

Схема БД состоит из четырех таблиц:
Product(maker, model, type)
PC(code, model, speed, ram, hd, cd, price)
Laptop(code, model, speed, ram, hd, price, screen)
Printer(code, model, color, type, price)
Таблица Product представляет производителя (maker), номер модели (model) и тип ('PC' - ПК, 'Laptop' - ПК-блокнот или 'Printer' - принтер). Предполагается, что номера моделей в таблице Product уникальны для всех производителей и типов продуктов. В таблице PC для каждого ПК, однозначно определяемого уникальным кодом – code, указаны модель – model (внешний ключ к таблице Product), скорость - speed (процессора в мегагерцах), объем памяти - ram (в мегабайтах), размер диска - hd (в гигабайтах), скорость считывающего устройства - cd (например, '4x') и цена - price. Таблица Laptop аналогична таблице РС за исключением того, что вместо скорости CD содержит размер экрана -screen (в дюймах). В таблице Printer для каждой модели принтера указывается, является ли он цветным - color ('y', если цветной), тип принтера - type (лазерный – 'Laser', струйный – 'Jet' или матричный – 'Matrix') и цена - price.


I
Задание: 9 (Serge I: 2002-11-02)
Найдите производителей ПК с процессором не менее 450 Мгц. Вывести: Maker
*/
SELECT maker FROM product 
INNER JOIN pc ON product.model = pc.model
WHERE speed >= 450
GROUP BY maker;




/*
II
Задание: 10 (Serge I: 2002-09-23)
Найдите модели принтеров, имеющих самую высокую цену. Вывести: model, price
*/
SELECT model, price FROM printer WHERE price=(SELECT MAX(price) FROM printer);



/*
III
Задание: 11 (Serge I: 2002-11-02)
Найдите среднюю скорость ПК.
*/
SELECT AVG(speed) FROM pc;




/*
IV
Задание: 12 (Serge I: 2002-11-02)
Найдите среднюю скорость ПК-блокнотов, цена которых превышает 1000 дол.
 */
SELECT AVG(speed) FROM laptop WHERE price > 1000;



/*
V
Задание: 13 (Serge I: 2002-11-02)
Найдите среднюю скорость ПК, выпущенных производителем A.
 */
SELECT AVG(speed) FROM pc
INNER JOIN product ON pc.model = product.model
WHERE maker='A';


/* 
VI
Задание: 15 (Serge I: 2003-02-03)
Найдите размеры жестких дисков, совпадающих у двух и более PC. Вывести: HD
*/
SELECT hd FROM PC 
GROUP BY hd
HAVING COUNT(hd) >= 2;



/*
VII
Задание: 19 (Serge I: 2003-02-13)
Для каждого производителя, имеющего модели в таблице Laptop, найдите средний размер экрана выпускаемых им ПК-блокнотов. 
Вывести: maker, средний размер экрана.
 */
SELECT maker, AVG(screen) FROM laptop
INNER JOIN product ON product.model=laptop.model 
GROUP BY maker;



/*
VIII
Задание: 21 (Serge I: 2003-02-13)
Найдите максимальную цену ПК, выпускаемых каждым производителем, у которого есть модели в таблице PC. 
Вывести: maker, максимальная цена.
 */
SELECT DISTINCT maker, MAX(price) FROM pc
INNER JOIN product ON product.model=pc.model
GROUP BY maker;



/*
IX
Задание: 22 (Serge I: 2003-02-13)
Для каждого значения скорости ПК, превышающего 600 МГц, определите среднюю цену ПК с такой же скоростью. Вывести: speed, средняя цена
 */
SELECT DISTINCT speed, AVG(price) FROM pc 
WHERE speed > 600
GROUP BY speed;




/* 
X
Задание: 28 (Serge I: 2012-05-04)
Используя таблицу Product, определить количество производителей, выпускающих по одной модели.
*/
SELECT DISTINCT COUNT(maker) FROM product
WHERE maker IN
(
  SELECT DISTINCT maker FROM product
  GROUP BY maker
  HAVING COUNT(DISTINCT model)=1
);


/* 
XI
Задание: 8 (Serge I: 2003-02-03)
Найдите производителя, выпускающего ПК, но не ПК-блокноты.
*/
SELECT DISTINCT maker FROM product 
WHERE type = 'pc' 
  AND
maker NOT IN (
  SELECT DISTINCT maker FROM product 
  WHERE type = 'laptop'
);


/*
XII
Задание: 16 (Serge I: 2003-02-03)
Найдите пары моделей PC, имеющих одинаковые скорость и RAM.
В результате каждая пара указывается только один раз, т.е. (i,j), но не (j,i), 

Порядок вывода: модель с большим номером, модель с меньшим номером, скорость и RAM.
*/

SELECT DISTINCT pc.model, pc2.model, pc.speed, pc.ram
  FROM pc INNER JOIN
(SELECT model, ram, speed 
  FROM pc) AS pc2
ON (pc.model > pc2.model) AND (pc.ram = pc2.ram)  AND (pc.speed = pc2.speed)
ORDER BY pc2.model, pc.model ASC, pc.speed, pc.ram;


/*
XIII
Задание: 17 (Serge I: 2003-02-03)
Найдите модели ПК-блокнотов, скорость которых меньше скорости любого из ПК. 
Вывести: type, model, speed
*/

SELECT DISTINCT 'Laptop', model, speed 
FROM laptop 
WHERE speed < ALL(SELECT speed FROM pc);


/*
XIV
Задание: 18 (Serge I: 2003-02-03)
Найдите производителей самых дешевых цветных принтеров. Вывести: maker, price
*/

SELECT DISTINCT product.maker, printer.price FROM product
INNER JOIN printer 
 ON (product.model = printer.model)
 AND (printer.price = (SELECT MIN(price) FROM printer WHERE color = 'y'
))
WHERE color = 'y';






