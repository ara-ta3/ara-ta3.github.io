import dualiesRespawn from "@/assets/images/splatoon/splatoon1.png";
import dualiesSwim from "@/assets/images/splatoon/splatoon2.png";
import nzap from "@/assets/images/splatoon/splatoon3.png";
import slosher from "@/assets/images/splatoon/splatoon4.png";
import gal from "@/assets/images/splatoon/splatoon5.png";
import splatling from "@/assets/images/splatoon/splatoon6.png";
import dappleDualiesNouveau from "@/assets/images/splatoon/splatoon7.png";
import splashOMatic from "@/assets/images/splatoon/splatoon8.png";

export const splatoonGearPowerGroups = [
  {
    id: "common",
    label: "共通",
    powers: [
      "インク効率アップ（メイン）",
      "インク効率アップ（サブ）",
      "インク回復力アップ",
      "ヒト移動速度アップ",
      "イカダッシュ速度アップ",
      "スペシャル増加量アップ",
      "スペシャル減少量ダウン",
      "スペシャル性能アップ",
      "復活時間短縮",
      "スーパージャンプ時間短縮",
      "サブ性能アップ",
      "相手インク影響軽減",
      "サブ影響軽減",
      "アクション強化",
    ],
  },
  {
    id: "head",
    label: "アタマ専用",
    powers: ["スタートダッシュ", "ラストスパート", "逆境強化", "カムバック"],
  },
  {
    id: "clothes",
    label: "フク専用",
    powers: [
      "イカニンジャ",
      "リベンジ",
      "サーマルインク",
      "復活ペナルティアップ",
      "追加ギアパワー倍化",
    ],
  },
  {
    id: "shoes",
    label: "クツ専用",
    powers: ["ステルスジャンプ", "対物攻撃力アップ", "受け身術"],
  },
] as const;

type GearPowerName = (typeof splatoonGearPowerGroups)[number]["powers"][number];

type GearMemo = {
  id: string;
  weapon: string;
  variant: string;
  recordedOn: string;
  image: string;
  powers: readonly (readonly [
    name: GearPowerName,
    main: number,
    sub: number,
  ])[];
};

export const splatoonGearMemos: readonly GearMemo[] = [
  {
    id: "dualies-respawn",
    weapon: "オーダーマニューバー レプリカ",
    variant: "復活時間短縮",
    recordedOn: "2026-10-29",
    image: dualiesRespawn,
    powers: [
      ["復活時間短縮", 1, 2],
      ["カムバック", 1, 0],
      ["ステルスジャンプ", 1, 0],
      ["イカダッシュ速度アップ", 0, 2],
      ["スーパージャンプ時間短縮", 0, 1],
      ["スペシャル減少量ダウン", 0, 1],
      ["相手インク影響軽減", 0, 1],
      ["サブ影響軽減", 0, 1],
      ["アクション強化", 0, 1],
    ],
  },
  {
    id: "dualies-swim",
    weapon: "オーダーマニューバー レプリカ",
    variant: "イカダッシュ速度アップ",
    recordedOn: "2026-10-29",
    image: dualiesSwim,
    powers: [
      ["イカダッシュ速度アップ", 1, 2],
      ["カムバック", 1, 0],
      ["ステルスジャンプ", 1, 0],
      ["スペシャル増加量アップ", 0, 2],
      ["スーパージャンプ時間短縮", 0, 2],
      ["スペシャル減少量ダウン", 0, 1],
      ["相手インク影響軽減", 0, 1],
      ["サブ影響軽減", 0, 1],
    ],
  },
  {
    id: "nzap85",
    weapon: "N-ZAP85",
    variant: "サブ性能アップ",
    recordedOn: "2026-10-29",
    image: nzap,
    powers: [
      ["サブ性能アップ", 1, 0],
      ["カムバック", 1, 0],
      ["ステルスジャンプ", 1, 0],
      ["イカダッシュ速度アップ", 0, 2],
      ["スペシャル増加量アップ", 0, 2],
      ["スペシャル性能アップ", 0, 2],
      ["スーパージャンプ時間短縮", 0, 2],
      ["スペシャル減少量ダウン", 0, 1],
    ],
  },
  {
    id: "slosher",
    weapon: "オーダースロッシャー レプリカ",
    variant: "イカダッシュ速度アップ",
    recordedOn: "2026-10-29",
    image: slosher,
    powers: [
      ["イカダッシュ速度アップ", 1, 2],
      ["カムバック", 1, 0],
      ["ステルスジャンプ", 1, 0],
      ["スペシャル減少量ダウン", 0, 2],
      ["スーパージャンプ時間短縮", 0, 2],
      ["インク効率アップ（サブ）", 0, 1],
      ["相手インク影響軽減", 0, 1],
      ["サブ影響軽減", 0, 1],
    ],
  },
  {
    id: "52gal",
    weapon: ".52ガロン",
    variant: "イカダッシュ速度アップ・アクション強化",
    recordedOn: "2026-10-29",
    image: gal,
    powers: [
      ["イカダッシュ速度アップ", 1, 5],
      ["アクション強化", 1, 0],
      ["ステルスジャンプ", 1, 0],
      ["スペシャル減少量ダウン", 0, 1],
      ["スーパージャンプ時間短縮", 0, 1],
      ["相手インク影響軽減", 0, 1],
      ["サブ影響軽減", 0, 1],
    ],
  },
  {
    id: "splatling",
    weapon: "オーダースピナー レプリカ",
    variant: "ヒト移動速度アップ",
    recordedOn: "2026-10-31",
    image: splatling,
    powers: [
      ["ヒト移動速度アップ", 2, 0],
      ["対物攻撃力アップ", 1, 0],
      ["相手インク影響軽減", 0, 3],
      ["スペシャル性能アップ", 0, 2],
      ["アクション強化", 0, 2],
      ["スーパージャンプ時間短縮", 0, 1],
      ["サブ影響軽減", 0, 1],
    ],
  },
  {
    id: "dapple-dualies-nouveau",
    weapon: "スパッタリー・ヒュー",
    variant: "復活時間短縮",
    recordedOn: "2026-11-23",
    image: dappleDualiesNouveau,
    powers: [
      ["復活時間短縮", 1, 0],
      ["カムバック", 1, 0],
      ["ステルスジャンプ", 1, 0],
      ["スーパージャンプ時間短縮", 0, 3],
      ["イカダッシュ速度アップ", 0, 2],
      ["スペシャル性能アップ", 0, 2],
      ["サブ性能アップ", 0, 2],
    ],
  },
  {
    id: "splash-o-matic",
    weapon: "シャープマーカー",
    variant: "サブ性能アップ",
    recordedOn: "2026-11-23",
    image: splashOMatic,
    powers: [
      ["サブ性能アップ", 1, 1],
      ["イカダッシュ速度アップ", 1, 0],
      ["ステルスジャンプ", 1, 0],
      ["スーパージャンプ時間短縮", 0, 3],
      ["インク回復力アップ", 0, 2],
      ["ヒト移動速度アップ", 0, 2],
      ["サブ影響軽減", 0, 1],
    ],
  },
];
