export class CatCalorie {
  readonly weight: number;

  constructor(weight: number) {
    this.weight = weight;
  }

  calculateRER(): number {
    return 70 * Math.pow(this.weight, 0.75);
  }

  calculateSimpleRER(): number {
    return this.weight * 30 + 70;
  }

  calculateDER(multiplier: number): number {
    return this.calculateRER() * multiplier;
  }
}
