export class Topology {
    public inputCount: number;
    public outputCount: number;
    public hiddenCount: number[];

    constructor (iCount: number, oCount: number, hCount: number[]) {
        this.inputCount = iCount;
        this.outputCount = oCount;
        this.hiddenCount = [ ...hCount ];
    }


}