export class CatCalorie {
    readonly weight: number;

    constructor(weight: number) {
        this.weight = weight;
    }


    calculateRER(): number {
        return 70 * Math.pow(this.weight, 0.75);
    }

    calculateDER(multiplier: number): number {
        return this.calculateRER() * multiplier;
    }
}
