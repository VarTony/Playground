----------------------------------------------------------------------------------------------Capture-7/Part-2----------------------------------------------------------------------------------------------------------

-----------JOIN

--Example-1
--Join tables without join
SELECT city, name, title 
    FROM offices, salesreps
WHERE mgr = empl_num; 

--Join tables with join
SELECT city, name, title 
    FROM offices JOIN salesreps 
ON mgr = empl_num; 


--Example-2
--Связь без приватного и внешнего ключей, в общем случае данная связь имеет отношение многие ко многим.
SELECT order_num, amount, order_date, name
    FROM orders, salesreps
WHERE order_date = hire_date;

--Version with operator join
SELECT order_num, amount, order_date, name
    FROM orders JOIN salesreps
ON order_date = hire_date;


--Example-3
--Внутрении и внешние(полное, левое, правое) соединения

SELECT * FROM boys
    INNER JOIN girls ON boys.city = girls.city;

SELECT * FROM boys 
    FULL OUTER JOIN girls ON boys.city = girls.city; 

SELECT * FROM boys 
    LEFT OUTER JOIN girls ON boys.city = girls.city;

SELECT * FROM boys 
    RIGHT OUTER JOIN girls ON boys.city = girls.city;

--Если в двух таблицах идет сравнения по колонкам с одинаковыми именами.
SELECT * FROM boys
    INNER JOIN girls USING(city);


--Example-4
--Перескестные соединения (CROSS JOIN)

SELECT * FROM boys CROSS JOIN girls;

--Тот же самый результат
--->

SELECT * FROM boys, girls;


--Example-5 
--Вложенные соединения

complete_sql=> SELECT DISTINCT girls.name, pname AS mom, boys.name, girls.city
    FROM ((girls  JOIN parents
    ON parents.child = name)
   JOIN boys
    ON (girls.city = boys.city))
   WHERE type = 'MOTHER';






