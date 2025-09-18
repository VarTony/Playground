/**
 * В этой главе мы переходим от простых примитивных типов к созданию
 * собственных составных типов данных — `структур`.
 * 
 * Структура (struct) — это контейнер, который объединяет связанные 
 * между собой значения под одним именем. Можно воспринимать её как
 * «свою собственную запись» или «объект без поведения».
 * 
 * Это мощный инструмент для моделирования предметной области в коде:
 * мы можем описать сущности нашего мира как набор полей.
 */

 #[derive(Debug)]
 struct User {
     username: String,
     email: String,
     sign_in_count: u64,
     active: bool,
 }
 
 /**
  * Создание экземпляра структуры
  * 
  * Мы описали тип `User`, а теперь можем создавать конкретные значения.
  * Здесь важно, что поля называются явно — нет привязки по позиции.
  */
 
 fn main() {
     let mut user1 = User {
         email: String::from("someone@example.com"),
         username: String::from("someusername123"),
         active: true,
         sign_in_count: 1,
     };
 
     // доступ к полям — как к обычным свойствам объекта
     println!("Имя пользователя: {}", user1.username);
 
     // можно изменять поля, если экземпляр сделан `mut`
     user1.email = String::from("another@example.com");
 
 
     /**
      * Синтаксис сокращённого создания
      * 
      * Если имена локальных переменных совпадают с именами полей структуры,
      * их можно не повторять.
      */
     let username = String::from("new_user");
     let email = String::from("new@example.com");
 
     let user2 = build_user(username, email);
     println!("{:?}", user2);
 
 
     /**
      * Структурное обновление
      * 
      * Позволяет скопировать/перенести оставшиеся поля из другого экземпляра.
      * 
      * P.S. Владение строками при этом перемещается!
      */
     let user3 = User {
         email: String::from("third@example.com"),
         ..user2
     };
 
     println!("{:?}", user3);
 
 
     /**
      * Кортежные и безымянные структуры
      * 
      * Если нужно просто объединить данные, но без имён полей — есть tuple struct.
      * Они ведут себя как разные типы, даже если содержат одинаковые данные.
      */
     struct Color(i32, i32, i32);
     struct Point(i32, i32, i32);
 
     let black = Color(0, 0, 0);
     let origin = Point(0, 0, 0);
 
     println!("Black: {},{},{}", black.0, black.1, black.2);
     println!("Origin: {},{},{}", origin.0, origin.1, origin.2);
 
 
     /**
      * Unit-like структуры
      * 
      * Пустая структура без полей — как маркер или тип-единица.
      */
     struct AlwaysEqual;
     let marker = AlwaysEqual;
 }
 
 
 /**
  * Удобная фабричная функция для создания пользователя.
  * 
  * Заметь: мы явно возвращаем `User`, не `&User` — возвращается владение.
  */
 fn build_user(username: String, email: String) -> User {
     User {
         username,
         email,
         active: true,
         sign_in_count: 1,
     }
 }
 