----------------------------------------------------------------------------------------------Capture-6/Part-2----------------------------------------------------------------------------------------------------------

--Вычисляемые столбцы.

--Example-1
--Увеличить плановые продажи на 3% от фактических для каждого служаща=е=его.
SELECT name, quota, (quota + (.03 * sales)) 
    FROM salesreps;


--Example-2
--Повышение удобочитаемости при выводе данных с помощью использования констант.
SELECT city, 'has sales of', sales
    FROM offices;


--Example-3
--Distinct
SELECT DISTINCT mgr FROM offices;

--Example-4
--BETWEEN

SELECT order_num, amount 
    FROM orders 
    WHERE amount BETWEEN 25000  AND 34999;


--Example-5
--NOT BETWEEN

SELECT name, sales, quota 
    FROM salesreps
    WHERE sales NOT BETWEEN (0.8 * quota) AND (1.2 * quota);


--Example-6
-- IN

SELECT name, quota, sales
    FROM salesreps
    WHERE rep_office IN (4, 8, 15, 11, 16, 23, 42);


--Example-7
--LIKE

SELECT name, sales 
    FROM salesreps 
    WHERE name LIKE 'N%';


--Example-8
-- IS NULL

SELECT name
    FROM salesreps 
    WHERE rep_office IS NULL;


--Example-9
--Отсортровать список по регионам и городам. 
--Первый указанный столбец в предложении ORDER BY является старшим ключом.

SELECT region, city, sales  
    FROM offices
    ORDER BY region, city;


--Example-10
--Сортировка по несуществующему столбцу

--I

SELECT region, city, (sales - target)  
    FROM offices
    ORDER BY 3, city DESC;

--II

SELECT region, city, (sales - target)  
    FROM offices
    ORDER BY (sales - target), city DESC;

--III

SELECT region, city, (sales - target) AS difference 
    FROM offices
    ORDER BY difference DESC;


--Example-11
--Вывести список офисов, отсортированный в алфавитном порядке по названиям регионов,
--а в каждом регионе - по разности между фактическим и плановым объемами продаж в порядке убывания. 

SELECT city, region, (sales - target) AS difference 
    FROM offices
    ORDER BY region ASC, difference DESC;


--Example-12
--UNION

SELECT DISTINCT mfr, product
    FROM orders
 WHERE amount > 30000 
 UNION ALL
SELECT mfr_id, product_id
    FROM products
 WHERE price > 2000.00
 ORDER BY 1, 2;

--Примичание по умолчанию SELECT ипользует инструкцию - ALL, а UNION - DISTINCT.

--ALL: выводит все строки.
--DISTINCT: исключает повторение. 
--Запрос ALL выполняется быстрее, так как нет постфильтрации данных. 

--A UNION (B UNION C) <-> (A UNION B) UNION C, etc equals.
--A UNION ALL (B UNION C) <-> (A UNION ALL B) UNION C, not equals.








