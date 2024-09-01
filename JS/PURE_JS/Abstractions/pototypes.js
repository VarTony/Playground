// Блок с классом

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    describe() {
        return `${this.name}, ${this.age} years old`;
    }
}

class Employee extends Person {
    constructor(name, age, jobTitle) {
        super(name, age); // Вызываем конструктор базового класса
        this.jobTitle = jobTitle;
    }

    describe() {
        // Вызываем родительский метод describe и добавляем информацию о работе
        return `${super.describe()} and works as a ${this.jobTitle}`;
    }
}

const employee_1 = new Employee('Alice', 28, 'Software Developer');
console.log(employee_1.describe()); // Alice, 28 years old and works as a Software Developer


// То что будет под "капотом"

function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.describe = function() {
    return `${this.name}, ${this.age} years old`;
};

function Employee(name, age, jobTitle) {
    Person.call(this, name, age); // Эквивалент super в классах
    this.jobTitle = jobTitle;
}

Employee.prototype = Object.create(Person.prototype); // Наследуем прототип Person
Employee.prototype.constructor = Employee; // Восстанавливаем конструктор

Employee.prototype.describe = function() {
    // Переопределяем метод describe для Employee
    return `${Person.prototype.describe.call(this)} and works as a ${this.jobTitle}`;
};

const employee_2 = new Employee('Bob', 30, 'Web Developer');
console.log(employee_2.describe()); // Bob, 30 years old and works as a Web Developer
