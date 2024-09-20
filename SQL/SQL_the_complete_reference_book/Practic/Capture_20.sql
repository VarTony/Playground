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


-- Отличия хранимых процедур от хранимых функций(Postgres):

-- Хранимые процедуры в PostgreSQL, в отличие от функций, могут содержать команды управления транзакциями,
-- такие как COMMIT и ROLLBACK. Это позволяет процедурам выполнять или отменять транзакции в рамках своего выполнения,
-- чего функции делать не могут, поскольку они выполняются в контексте уже существующей транзакции,
-- инициированной клиентом.

-- Процедуры могут быть настроены для возвращения результата через OUT параметры или даже не возвращать значения(возвращаемый тип void).
-- В то время как функции обычно возвращают одно значение (скалярное или составное),
-- процедуры могут использовать OUT параметры для возврата нескольких значений
-- или не возвращать никаких значений вовсе.



-- Курсоры:

-- Есть возможность использования курсоров, для обработки данных построчно, например при внешнем запросе на конкретную строку, но работает 
-- это в разы медленнее и используется только в экзотичных случаях. По умолчанию СУБД делает выгрузку данных большими наборами или целиком, 
-- а не построчно.

-- Так же как и другие языки программирования имеют возможность использования условных конструкций и циклов.



-- Преимущества хранимых процедур:
-- Производительность: Хранимые процедуры компилируются и оптимизируются базой данных один раз,
-- что обеспечивает более быстрое выполнение по сравнению с динамическими SQL-запросами.

-- Повторное использование и стандартизация: Процедуры могут быть вызваны из различных приложений без необходимости переписывать один и тот же код,
-- что способствует снижению риска ошибок и обеспечению единообразия.

-- Сокращение сетевого трафика: При использовании в распределенных и клиент-серверных системах,
-- хранимые процедуры могут уменьшить количество данных, передаваемых по сети.

-- Безопасность: Хранимые процедуры могут обеспечить дополнительный уровень безопасности за счет выполнения операций 
-- с базой данных с учетными данными и правами, отличными от прав пользователя, вызывающего процедуру.

-- Инкапсуляция бизнес-логики: Логика, связанная с бизнес-правилами и операциями с данными, может быть инкапсулирована в процедурах,
-- что облегчает управление изменениями и поддержку.



-- Недостатки хранимых процедур:

--   Сложность обслуживания: С течением времени и увеличением количества хранимых процедур их поддержка и обновление
--   могут стать более сложными и трудоемкими.
  
--   Зависимость от платформы: Хранимые процедуры часто зависят от конкретной СУБД,
--   что может затруднить перенос приложений на другие системы управления базами данных.
  
--   Ограничения языка: Язык, используемый в хранимых процедурах, обычно менее гибкий и мощный,
--   чем языки общего назначения, что может затруднить реализацию сложной логики.
  
--   Производительность: Хотя хранимые процедуры могут улучшить производительность благодаря предварительной компиляции,
--   неправильно написанные или сложные процедуры могут вызвать узкие места в производительности.
  
--   Риски безопасности: Неправильно настроенные права доступа к хранимым процедурам могут представлять угрозы безопасности,
--   так как они могут предоставить избыточные привилегии вызывающим их пользователям.
  
--   Тестирование: Автоматизация тестирования для хранимых процедур может быть более сложной,
--   чем для кода приложения, из-за необходимости взаимодействия с СУБД.
  
--   Отладка: Отладка хранимых процедур может быть менее удобной, чем отладка кода приложений,
--   поскольку не все СУБД предоставляют продвинутые инструменты для отладки.




-- Производительность хранимых процедур:

-- Интерпритированное исполнение:

-- В некоторых системах текст хранимой процедуры находится в базе данных в том
-- виде, в каком он был написан проrраммистом, и интерпретируется только тогда,
-- когда процедура выполняется. Этот подход позволяет создавать гибкие языки про
-- граммирования хранимых процедур, но сильно замедляет их выполнение. Ведь
-- СУБД должна по ходу выполнения процедуры читать ее инструкции, осуществ
-- лять их синтаксический анализ и определять, что ей следует делать.


-- Компилируеммое исполнение:

-- Именно по причине низкой производительности интерпретируемых процедур
-- некоторые производители СУБД предпочитают компилировать их заранее, гене
-- рируя некоторый промежуточный код, который выполняется гораздо быстрее.
-- Компиляция может происходить как автоматически, сразу после создания проце
-- дуры, так и по запросу пользователя. Однако у предварительной компиляции
-- хранимых процедур есть свой недостаток: точный процесс выполнения процедуры
-- фиксируется во время ее компиляции и уже не может быть изменен. Чем это пло
-- хо? Предположим, что после компиляции процедуры были определены дополни
-- тельные индексы для таблиц, с которыми она работает. Скомпилированные запро
-- сы этой процедуры были оптимизированы без учета этих индексов и будут выпол
-- няться медленнее, чем могли бы в случае, если их перекомпилировать.
-- Для решения этой проблемы некоторые СУБД автоматически помечают все
-- скомпилированные процедуры, на которых мог ли отразиться изменения объектов
-- базы данных, как нуждающиеся в повторной компиляции. Когда такая процедура
-- в очередной раз вызывается, СУБД видит пометку и компилирует процедуру пе
-- ред ее выполнением. Так сохраняется преимущество предварительной компиля
-- ции, и процедуры выполняются оптимальным образом. Но и у этого подхода оста
-- ется один недостаток: непредсказуемые задержки в выполнении процедур, свя
-- занные с их динамической перекомпиляцией. Когда повторная компиляция не
-- нужна, хранимая процедура может выполниться очень быстро; если же процедуру
-- потребовалось перекомпилировать, перед ее выполнением может быть довольно
-- ощутимая задержка - существенно большая, чем при использовании старой
-- скомпилированной версии