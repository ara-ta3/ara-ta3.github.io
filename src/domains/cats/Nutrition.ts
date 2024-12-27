export class Nutrition {
  readonly carbohydrate: number;
  constructor(
    public readonly protein: number,
    public readonly fat: number,
    public readonly fiber: number,
    public readonly ash: number,
    public readonly moisture: number,
  ) {
    this.carbohydrate = Math.max(
      0,
      Math.round(100 - (protein + fat + fiber + ash + moisture)),
    );
  }
}
