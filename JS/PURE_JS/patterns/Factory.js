class Animal {
  constructor(action, sound){
    this.moveAction = action,
    this.voiceSound = sound
  }

  move() {
    console.log(this.moveAction ? this.moveAction : 'Тык-тык-тык');
  }

  voice() {
    console.log(this.voiceSound ? this.voiceSound : 'Позвучало');
  }
}


class Dog extends Animal {
  constructor(action = 'Побежала', sound = 'Гав-гав') {
    super(action, sound);
  }
}

class Cat extends Animal {
  constructor(action = 'Прыгнула', sound = 'Мяу-мяу') {
    super(action, sound);
  }
}

class Cow extends Animal {
  constructor(action = 'Перемнулась', sound = 'Му-у-у-уууу') {
    super(action, sound);
  }
}





class Factory {
  constructor(essenceName, essenceClass) {
    this.essences = {
      'dog' : new Dog(),
      'cat' : new Cat(),
      'cow' : new Cow()
    }
    if (essenceName && essenceClass) {
      this.essences = Object.assign(this.assign, {[essenceName] : essenceClass()});
      console.log(`Список классов расширен классом : ${essenceName}`);
    } else console.log(`Список классов задан по умолчанию`);

  }
  createEssence(type) {
    type = type.toLowerCase();
    const essence = this.essences[type];
    essence.goToFactory = () => console.log(`${type} go to factory.`);
    return essence;

  }
}




const cat1 = new Cat('Виииииииииу', 'Шшшшшшшшшшшшшшшш');
cat1.voice();
cat1.move();

const factory = new Factory();
const cat2 = factory.createEssence('cat');
cat2.voice();
cat2.goToFactory();
cat2.move();



/*
Основная идея в том, что мы создаем фабрику, которая может создавать нам обьекты.
 Фабрику стоит использовать, если в конструкторе очень высокая сложность создания обьекта,
чаще всего, когда он может создаваться из нескольких источников.
Также она отлично подходит, когда нужно создавать много обьектов с одинаковыми полями.
Но она может создать дополнительную сложность в приложении там, где ее можно было бы избежать.



*/
