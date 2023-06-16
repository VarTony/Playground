class CustomPromise {
    constructor(cb){
        this.cb = cb;
    }

    resolve(data) {
        this.then(data);
    }

    reject(err) {
        this.catch(err);
    }

    then(data) {
        const res = cb => cb(data);
        return res;

        // cb(new CustomPromise(this.cb));
    }

    catch(err) {
        const rej = cb => cb(err);
        return rej;
        
        // cb(new CustomPromise);
    }
}