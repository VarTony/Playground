
import { avarage, getRandomInt } from '.';


// σ^2|D = (∑(x-μ)^2)/n: Дисперсия
const dispersion = list => {

    const n = list.length; 
    const μ = avarage(list);
    
    const amountDifference = list.reduce((sum, x) => {
        sum += (x - μ) ** 2; 
        return sum;
    }, 0);

    return amountDifference / n;
};


exports [ dispersion ];