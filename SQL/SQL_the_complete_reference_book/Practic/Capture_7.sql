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
