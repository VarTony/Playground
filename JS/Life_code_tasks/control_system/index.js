// Пример и разбор каверзного вопроса, про ассинхронность в ноде.


async function start() {
    try { 
        // 'Экзекьютором' здесь является: data => data, так как, обработка
        // промисса происходит через await: -> .then(data => data).
        const result = await new Promise((done,reject) => {
            
            // Выкинет исключение и положит выполнение
            setTimeout(() => {
                console.log('before promise error')
                throw new Error('in promise error')
            }, 1200)

            // Промисс здесь ушел в ожидание результата в очереди колбеков
            // Условно внутри системы это отработает примерно так process.nextTick(setTimeout)
            // То есть таймер передастся диплексору событий в начале слудущего цикла, и вырнется от
            // обработчика через прим. 1 секунду.
            setTimeout(() => {
                console.log('before promise done')
                done('promise done')
            }, 1000)
            
            // Не сработает, так как, ошибка отработает раньше
            setTimeout(() => {
                console.log('before promise reject')
                reject('promise reject')
            }, 1400)
        })
        console.log(result); // получит данные (promise done / promise reject(Если поменять время таймеров))
    }
    // Не перехватит ошибку, - блок try/catch не будет ожидать таймеров
    // кроме первого. Так как первый вернет данные в result.
    catch(err) {
        console.log('promise error')
        
    }
    // Ждет обработки проммиса, так как, внешняя функция
    // ассинхронна, result (await) в ожидании выполнения промисса.
    console.log('finish')
}

/*
    Порядок исполнения:
        before promise done
        promise done
        finish
        before promise error
        throw ... 
*/


start();