----------------------------------------------------------------------------------------------Capture-5/Part-2----------------------------------------------------------------------------------------------------------

--Выражения.

--Example-1
--Вывести процентное соотношение объема продаж для каждого офиса.
SELECT city, target, sales, (sales/target) * 100 
    FROM offices;


--Example-2
--Вывести города, где объем продаж офисов превышает план на 50000$. 
SELECT city from offices 
    WHERE sales > target + 50000.00;


--Example-3
--Вывод с конкатенацией.
SELECT 'Ann office in ' || city || ' sold this month paper on ' || sales || '.'  
    FROM offices;


--Встроенные функции.

--Example-1
--Извлечь месяц из даты устройства сотрудника.
SELECT name, EXTRACT(MONTH FROM hire_date) 
    FROM salesreps;


--Example-2
--Выбрать сотрудников, где год найма равен 2005-му.
SELECT name, EXTRACT(MONTH FROM hire_date) 
    FROM salesreps
    WHERE EXTRACT(YEAR FROM hire_date) = 2005;


--Example-3
--Перевод даты найма в предпочтительный для чтения формат.
SELECT name, TO_CHAR(hire_date, 'DAY MONTH DD, YYYY') 
    FROM salesreps;


--Example-4
--Вывовод колличества бит в каждого строке имени.
SELECT name || ' amount bit in name - ' || BIT_LENGTH(name) 
    FROM salesreps;
