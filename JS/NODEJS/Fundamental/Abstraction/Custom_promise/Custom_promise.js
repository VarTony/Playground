class CustomPromise {
    constructor(executor){
        executor(value => { this.hidden = value });
        this.callbacks = [];
    }

    resolve() {
        const [ cb, ...cbs ] = this.callbacks;
        let result = cb(this.hidden);
        cbs.forEach(cb => {  result = cb(result) });

        return result;
    }

    then(cb) {
        this.callbacks.push(cb);
        this.resolve();

        return this;
    }

    catch(cb) {}
}