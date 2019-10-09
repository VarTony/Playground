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








