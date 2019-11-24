----------------------------------------------------------------------------------------------Capture-8----------------------------------------------------------------------------------------------------------

--Example-1
--Группировка

SELECT empl_num, name, MAX(amount), MIN(amount), AVG(amount)::integer AS mid, SUM(amount) 
 FROM orders, salesreps
 WHERE rep = empl_num
 GROUP BY empl_num, name;



--Example-2
--Having

SELECT order_date, AVG(amount)
 FROM orders
 GROUP BY order_date
 HAVING SUM(amount) > 25000
 ORDER BY order_date; 

