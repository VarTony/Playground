/*
    Null_Object - поведенчиский паттерн, позволяет решить проблему избыточности условных конструкций
    с проверкой на null(существование объекта), перед обращением к его методам.

    Решение данной проблемы уже встроенно в ts(?.), - пример: user?.getUserName(), поэтому знание его
    носит больше просветительский характер.
*/

type ACCESS = { publicKey: string, name: string };


/**
 *  Обычный объект, для работы с сущностью полтзователя;
 */
class User {
    private readonly access: ACCESS;

    constructor(access: ACCESS) {
        this.access = access;
    }

    getUserName = () => this.access.name;

    getPubKey = () => this.access.publicKey;
    // ...   
}


/**
 * Объект пустышка для подмены. 
 */
class Guest {
    getUserName = () => 'guest';

    getPubKey = () => null;
    // ...   
}


// Примеры:
 const access1 = { publicKey: '9ab32c5d634abb2501', name: 'Lulu' };
 const access2 = null; // Данные о пользователе не найдены;

 const user1 = access1? new User(access1): new Guest();
 const user2 = access2? new User(access2): new Guest();
 
 // .... Где-то в коде 
 
user1.getUserName();
user2.getUserName(); // Заглушка отработает и вернет guest;

 

