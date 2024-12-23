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

export interface Food {
  id: number;
  name: string;
  kcalPer100: number;
  url: string;
  nutrition: Nutrition;
}

class Nutrition {
  readonly carbohydrate: number;
  constructor(
    public readonly protein: number,
    public readonly fat: number,
    public readonly fiber: number,
    public readonly ash: number,
    public readonly moisture: number,
  ) {
    this.carbohydrate = Math.round(100 - (protein + fat + fiber + ash + moisture));
  }
}

export const DryFoods: Food[] = [
  {
    id: 1,
    name: "ピュリナワン グレインフリー チキン",
    kcalPer100: 413,
    url: "https://nestle.jp/brand/one/cat/lineup/grainfree1/",
    nutrition: new Nutrition(
      35,
      14,
      2,
      9,
      12,
    ),
  },
  {
    id: 2,
    name: "ピュリナワン グレインフリー 白身魚",
    kcalPer100: 365,
    url: "https://nestle.jp/brand/one/cat/lineup/grainfree2/",
    nutrition: new Nutrition(
      35,
      14,
      2,
      9,
      12,
    ),
  },
  {
    id: 3,
    name: "ニュートロ ナチュラル チョイス キャット 室内猫用 アダルト チキン",
    kcalPer100: 360,
    url: "https://marspetcare.jp/category/COND_C_DRY/NC_C_ADULT_LIMITED.html",
    nutrition: new Nutrition(
      33,
      14,
      7,
      9,
      10,
    ),
  },
  {
    id: 4,
    name: "ニュートロ シュプレモ 成猫用 チキン＆サーモン",
    kcalPer100: 365,
    url: "https://marspetcare.jp/category/COND_C_DRY/SUPREMO_C_ADULT_CHICKEN_SALMON.html",
    nutrition: new Nutrition(
      35,
      14,
      4,
      10.2,
      8,
    ),
  },
  {
    id: 5,
    name: "ニュートロ シュプレモ 成猫用 サーモン＆チキン",
    kcalPer100: 365,
    url: "https://marspetcare.jp/category/COND_C_DRY/SUPREMO_C_ADULT_SALMON_CHICKEN.html",
    nutrition: new Nutrition(
      35,
      14,
      4,
      9.6,
      8,
    ),
  },
  {
    id: 6,
    name: "ニュートロ シュプレモ 成猫用 白身魚＆チキン",
    kcalPer100: 365,
    url: "https://marspetcare.jp/category/COND_C_DRY/SUPREMO_C_ADULT_WHITEFISH_CHICKEN.html",
    nutrition: new Nutrition(
      35,
      14,
      4,
      9.6,
      8,
    ),
  },
  {
    id: 7,
    name: "ニュートロ ナチュラル チョイス キャット 穀物フリー アダルト サーモン",
    kcalPer100: 380,
    url: "https://marspetcare.jp/category/COND_C_DRY/NC_C_ADULT_GRAINFREE_SALMON.html",
    nutrition: new Nutrition(
      33,
      16,
      4,
      9,
      10,
    ),
  },
  {
    id: 8,
    name: "ニュートロ ナチュラル チョイス キャット 穀物フリー アダルト ダック",
    kcalPer100: 380,
    url: "https://marspetcare.jp/category/COND_C_DRY/NC_C_ADULT_GRAINFREE_DUCK.html",
    nutrition: new Nutrition(
      33,
      15,
      7,
      9,
      10,
    ),
  },
  {
    id: 9,
    name: "ニュートロ ナチュラル チョイス キャット 穀物フリー アダルト チキン",
    kcalPer100: 375,
    url: "https://marspetcare.jp/category/COND_C_DRY/NC_C_ADULT_GRAINFREE_CHICKEN.html",
    nutrition: new Nutrition(
      33,
      16,
      4,
      9,
      10,
    ),
  },
  
];


