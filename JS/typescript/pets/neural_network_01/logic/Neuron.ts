import { neuroTypes } from './types';
import { ActivationFuncs } from './ActivationFuncs';

export class Neuron {
    
    public weights: number[] = [];
    public neuronsType: neuroTypes;
    public output: number;
    
    constructor(inputsCount: number, neuronType: neuroTypes = neuroTypes.input) {
      let i: number = 0;
        
      while(i <= inputsCount - 1)
        this.weights[i++] = +Math.random().toFixed(3);
    }

    public feedForward (inputs: number[]): number {
        
        if(inputs.length !== this.weights.length) 
            throw new Error('Количество входных весов должно соответствовать количеству весов указанных при инициализации')

        const sum: number = inputs.reduce(
          (acc: number, input: number, i: number): number => {
            acc += input * this.weights[i];
            return acc;
          }
        );
        const output: number = ActivationFuncs.sigmoid(sum); 
        this.output = output;

        return output;
    }
  
}