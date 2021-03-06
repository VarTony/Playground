import { Neuron } from './Neuron';
import { neuroTypes } from './types'; 

export class Layer {

    public neurons: Neuron[];
    public neuronsCount: number | 0;

    constructor(neurons: Neuron[], neuronType: neuroTypes = neuroTypes.normal) {
        //TODO: проверить все входные нейроны на соответствие типу.

        this.neurons = neurons;
    }

    public getSignals(): number[] {
        const signals: number[] = this.neurons.map(
            (neuron: Neuron) => neuron.output
        );
        return signals;
    }
    
}