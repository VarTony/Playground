export class ActivationFuncs {
  constructor() {};

  public static sigmoid(x: number): number {
    const y: number = 1 / (1 + Math.E ** x)
    return y;
  };

  public static heavisideFunc(x: number, board: number = 0.5): number {
    const y: number = (x > board)
      ? 1
      : 0;
    return y;  
  };

  public static reLu(x: number): number {
    const y: number = (x > 0)
      ? x
      : 0;
    return y;
  }
}