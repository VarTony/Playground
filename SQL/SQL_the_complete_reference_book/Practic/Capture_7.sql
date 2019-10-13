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
