// Partial<T> - Создает новый тип, в котором все свойства становятся необязательными
// Концепция: Частичная функция в математике, которая определена не для всех возможных входных значений
interface User {
    id: number;
    name: string;
    email: string;
  }
  
  const partialUser: Partial<User> = {
    name: "Alice"
  };
  
  // Required<T> - Делает все свойства обязательными
  // Концепция: Полная функция в математике, которая определена для всех входных значений
  interface UserOptional {
    id?: number;
    name?: string;
  }
  
  const completeUser: Required<UserOptional> = {
    id: 1,
    name: "Alice"
  };
  
  // Readonly<T> - Делает все свойства только для чтения
  // Концепция: Имутабельность (неизменяемые объекты)
  const user: Readonly<User> = {
    id: 1,
    name: "Bob",
    email: "bob@example.com"
  };
  
  // user.name = "Alice"; // Ошибка: нельзя изменять свойства
  
  // Record<K, T> - Создает тип объекта с ключами типа K и значениями типа T
  // Концепция: Функция отображения, которая сопоставляет ключи значениями
  const users: Record<number, string> = {
    1: "Alice",
    2: "Bob"
  };
  
  // Pick<T, K> - Выбирает только указанные свойства
  // Концепция: Проекция данных, выбор подмножества данных
  const pickedUser: Pick<User, 'id' | 'name'> = {
    id: 1,
    name: "Alice"
  };
  
  // Omit<T, K> - Исключает указанные свойства
  // Концепция: Противоположность Pick - исключение данных
  const omittedUser: Omit<User, 'email'> = {
    id: 1,
    name: "Alice"
  };
  
  // Exclude<T, U> - Исключает из T те типы, которые могут быть присвоены типу U
  // Концепция: Множества и операции над ними, вычитание подмножеств
  type Primitive = string | number | boolean;
  type NonString = Exclude<Primitive, string>;
  // NonString = number | boolean
  
  // Extract<T, U> - Извлекает из T только те типы, которые могут быть присвоены типу U
  // Концепция: Пересечение множеств
  type OnlyString = Extract<Primitive, string>;
  // OnlyString = string
  
  // NonNullable<T> - Удаляет из T null и undefined
  // Концепция: Опциональные типы и их ограничения
  type NonNull = NonNullable<string | number | undefined>;
  // NonNull = string | number
  
  // ReturnType<T> - Возвращает тип значения, возвращаемого функцией
  // Концепция: Отображение (функции как отображения между типами)
  function getUser() {
    return { id: 1, name: "Alice" };
  }
  type UserReturnType = ReturnType<typeof getUser>;
  // UserReturnType = { id: number; name: string; }
  
  // InstanceType<T> - Возвращает тип экземпляра класса
  // Концепция: Инстанцирование классов в ООП
  class UserClass {
    id: number = 1;
    name: string = "Alice";
  }
  type UserInstance = InstanceType<typeof UserClass>;
  // UserInstance = UserClass
  
  // Parameters<T> - Возвращает типы параметров функции как кортеж
  // Концепция: Аргументы функций как параметры отображения
  function add(a: number, b: number): number {
    return a + b;
  }
  type AddParams = Parameters<typeof add>;
  // AddParams = [number, number]
  
  // ConstructorParameters<T> - Возвращает типы параметров конструктора класса
  // Концепция: Конструкторы как отображения для создания объектов
  type UserConstructorParams = ConstructorParameters<typeof UserClass>;
  // UserConstructorParams = []
  
  // ThisType<T> - Определяет тип контекста `this` для объекта
  // Концепция: Лексическое окружение и контекст вызова
  type ObjectDescriptor<D, M> = {
    data?: D;
    methods?: M & ThisType<D & M>; // `ThisType` обеспечивает типизацию контекста
  };
  
  const obj: ObjectDescriptor<{ x: number }, { getX(): number }> = {
    data: { x: 10 },
    methods: {
      getX() {
        return this.x;
      }
    }
  };
  