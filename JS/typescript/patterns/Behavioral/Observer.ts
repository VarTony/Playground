/**
 * Паттерн Наблюдатель - позволяет подвязать наблюдателей к какому-либо классу, реализуещему 
 *  интерфейс оповещателя ('субьекта'), и получать от него рассылку при обновление данных, при
 *  этом связи между объектами являются 'слабыми', не важно какого типа получатели, а какого 
 *  отправитель, важно лишь то что они имлементируют интерфейсы 'Субъекта и наблюдателя', что 
 *  хорошо сказывается на гибкости и масштабируемости программы.
 */


/**
 * Блок субъекта:
 */
interface ISubject {
    attach(observer: IObserver): void;
    detach(observer: IObserver): void;
    notify(): void;
    getData(): any;
    setData(data: any): void;
  }
   
  
  class SomebodySubject implements ISubject {
    private observers: IObserver[] = [];
    private data: any;
    
    public attach(observer: IObserver) {
      if(!this.observers.includes(observer)) 
        this.observers.push(observer);
    }
  
    public detach(observer: IObserver): void {
      const observIndx = this.observers.indexOf(observer);
      this.observers = this.observers
        .filter((_, i) => i !== observIndx);
    }

    public notify() {
        this.observers.forEach((observer, i) => observer.update(this, i));
    }
  
    public getData() {
      return this.data;
    }
    
    public setData(data: any) {
      this.data = data;
    }
  }
  

  
  /**
   * Блок наблюдателя:
   */
  interface IObserver {
    update(subject: ISubject, index: number): void;
  }
  
  
  class SomebodyObserver implements IObserver {
    private updatedData: any;
    
    public update(subject: ISubject, i: number) {
      this.updatedData = subject.getData()
      this.displayUpdate(i);
    }
  
     /** 
     * В данном случае метод отображения вызывается в методе обновления 
     *   для большей наглядности, но лучше так не делать. 
     */ 
    private displayUpdate(i: number) {
      console.log(this.updatedData, `(Index of observer: ${i})`);
    }
  }
  
  
   /**
   * Экземпляры и тестирование 
   */
  const somebodySubject_1 = new SomebodySubject();
  const somebodyObserver_1 = new SomebodyObserver();
  const somebodyObserver_2 = new SomebodyObserver();
  
  somebodySubject_1.attach(somebodyObserver_1);
  somebodySubject_1.attach(somebodyObserver_2);
  somebodySubject_1.setData('Something data');
  somebodySubject_1.notify(); // Something data (Index of observer: 0) ... & (Index of observer: 1)
  somebodySubject_1.detach(somebodyObserver_2);
  somebodySubject_1.setData('Only for you <3');
  somebodySubject_1.notify(); // Only for you <3 (Index of observer: 0)