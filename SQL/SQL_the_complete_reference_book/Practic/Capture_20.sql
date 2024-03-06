-- Хранимые процедуры
-- Пример:

CREATE OR REPLACE PROCEDURE add_cust(
    -- Перечисление параметров
    c_name     varchar(20),
    c_num      integer,
    cred_lim   numeric(9,2),
    tgt_sls    numeric(9,2),
    c_rep      integer,
    c_offc     varchar(15),
    OUT updated_salesreps INTEGER, -- Возвращаемое количество обновлённых строк в salesreps
    OUT updated_offices INTEGER    -- Возвращаемое количество обновлённых строк в offices
)
LANGUAGE plpgsql -- Указание используемого диалекта PLSQL
AS $$ -- Начало тела процедуры
BEGIN -- Открытие блока кода, - все что находится внутри блока, является частью единого исполнения.
    INSERT INTO customers (cust_num, company, cust_rep, credit_limit)
    VALUES (c_num, c_name, c_rep, cred_lim);

    -- Обновление данных в таблице salesreps и сохранение количества затронутых строк
    UPDATE salesreps
    SET quota = quota + tgt_sls
    WHERE empl_num = c_rep;
    GET DIAGNOSTICS updated_salesreps = ROW_COUNT; -- Получение количества обновлённых строк в salesreps

    -- Обновление данных в таблице offices и сохранение количества затронутых строк
    UPDATE offices
    SET target = target + tgt_sls
    WHERE city = c_offc;
    GET DIAGNOSTICS updated_offices = ROW_COUNT; -- Получение количества обновлённых строк в offices
    
    -- В PostgreSQL COMMIT внутри процедуры обычно не требуется,
    -- так как вызов процедуры сам по себе выполняется в транзакционном контексте.
    -- COMMIT может использоваться для завершения текущей транзакции и начала новой.
    COMMIT;
END; -- Закрытие блока кода
$$; -- Конец тела процедуры



-- Хранимые функции
-- Пример:


CREATE OR REPLACE FUNCTION add_cust(
    c_name     varchar(20),
    c_num      integer,
    cred_lim   numeric(9,2),
    tgt_sls    numeric(9,2),
    c_rep      integer,
    c_offc     varchar(15)
)
RETURNS update_results -- Использование определённого пользовательского составного типа
LANGUAGE plpgsql
AS $$
DECLARE
    result update_results; -- Переменная для хранения результатов
BEGIN
    INSERT INTO customers (cust_num, company, cust_rep, credit_limit)
    VALUES (c_num, c_name, c_rep, cred_lim);

    -- Обновление данных в таблице salesreps и сохранение количества затронутых строк
    UPDATE salesreps
    SET quota = quota + tgt_sls
    WHERE empl_num = c_rep;
    GET DIAGNOSTICS result.updated_salesreps = ROW_COUNT; -- Запись количества обновлённых строк в result

    -- Обновление данных в таблице offices и сохранение количества затронутых строк
    UPDATE offices
    SET target = target + tgt_sls
    WHERE city = c_offc;
    GET DIAGNOSTICS result.updated_offices = ROW_COUNT; -- Запись количества обновлённых строк в result

    RETURN result; -- Возврат составного результата
END;
$$;



-- Хранимые процедуры в PostgreSQL, в отличие от функций, могут содержать команды управления транзакциями,
-- такие как COMMIT и ROLLBACK. Это позволяет процедурам выполнять или отменять транзакции в рамках своего выполнения,
-- чего функции делать не могут, поскольку они выполняются в контексте уже существующей транзакции,
-- инициированной клиентом.

-- Процедуры могут быть настроены для возвращения результата через OUT параметры или даже не возвращать значения(возвращаемый тип void).
-- В то время как функции обычно возвращают одно значение (скалярное или составное),
-- процедуры могут использовать OUT параметры для возврата нескольких значений
-- или не возвращать никаких значений вовсе.

-- Есть возможность использования курсоров, для обработки данных построчно, например при внешнем запросе на конкретную строку, но работает 
-- это в разы медленнее и используется только в экзотичных случаях. По умолчанию СУБД делает выгрузку данных большими наборами или целиком, 
-- а не построчно.

-- Так же как и другие языки программирования имеют возможность использования условных конструкций и циклов.

