import { Layer } from './Layer';
import { Topology } from '../data/Topology';
import { Neuron } from './Neuron';
import { neuroTypes } from './types';



class NeuralNetwork {
    layers: Layer[];
    topology: Topology;

    constructor(topology: Topology) {
        this.topology = topology;
        this.layers = [];

        this.createInputLayer();
        this.createHiddenLayers();
        this.createOutputLayer();
    }

    private sendSignalsToInputNeurons(inputSignals: number[]) {
        inputSignals.forEach((signal: number, i: number): void => {
            const neuron = this.layers[0].neurons[i];
            neuron.feedForward([signal]); 
        });  
    }

    private feedForwardAllLayersAfterInput() {
        this.layers.forEach((layer: Layer, i: number) => {
            const neurons = layer.neurons;
            const prviousLayerSignals: number[] = this.layers[i - 1].getSignals();
            
            neurons.forEach((neuron: Neuron) => {
                neuron.feedForward(prviousLayerSignals);
            });       
        })
    }


    private FeedForward(inputSignals: number[]): Neuron {
        this.sendSignalsToInputNeurons(inputSignals);
        this.feedForwardAllLayersAfterInput();
        const indexLastLayers = this.layers.length - 1;
        
        if(this.topology.outputCount === 1) 
            return this.layers[indexLastLayers].neurons[0];
        else 
            return this.getOutputNeuronWithMaxSignal(indexLastLayers);
    }

    private createInputLayer(): void {
        const count =this.topology.inputCount;
        const inputNeurons: Neuron[] = [];

        inputNeurons.fill(new Neuron(1, neuroTypes.input), 0, count);

        const inputLayer: Layer = new Layer(inputNeurons, neuroTypes.input);
        this.layers.push(inputLayer);

    }

    private createHiddenLayers(): void {
        let i = 0;
        while(i < this.topology.hiddenCount.length) {
            const count = this.topology.hiddenCount[i];
            const hiddenNeurons: Neuron[] = [];
            const lastLayerSize = this.getSizeLastLayer();
    
            hiddenNeurons.fill(new Neuron(lastLayerSize, neuroTypes.output), 0, count);
    
            const outputLayer: Layer = new Layer(hiddenNeurons);
            this.layers.push(outputLayer);
            
            i++;
        }
    }

    private createOutputLayer(): void {
        const count =this.topology.outputCount;
        const outputNeurons: Neuron[] = [];
        const lastLayerSize = this.getSizeLastLayer();

        outputNeurons.fill(new Neuron(lastLayerSize, neuroTypes.output), 0, count);

        const outputLayer: Layer = new Layer(outputNeurons, neuroTypes.output);
        this.layers.push(outputLayer);
        
    }

  private getOutputNeuronWithMaxSignal(indexLastLayers: number = this.layers.length - 1 ): Neuron {
        
    const neuronWithMaxSignal: Neuron = this.layers[indexLastLayers].neurons
      .reduce((neuronWithMaxSignal: any, neuron: Neuron, i: number): Neuron => {
        if(i === 0) {
          neuronWithMaxSignal = neuron;
          return neuronWithMaxSignal;
        } 
        neuronWithMaxSignal = neuronWithMaxSignal.output < neuron.output
          ? neuron
          : neuronWithMaxSignal;
                    
          return neuronWithMaxSignal;
      });
    
    return neuronWithMaxSignal;

    };

    private getSizeLastLayer(): number {
        const indexLastLayers = this.layers.length - 1;
        const lastLayerSize = this.layers[indexLastLayers].neuronsCount;

        return lastLayerSize;
    }

};        
