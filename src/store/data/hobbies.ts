export const HOBBY_OPTIONS = [
  {
    id: 1,
    label: "スポーツ系",
    items: ["ランニング", "筋トレ", "サッカー", "野球", "サーフィン"],
  },
  {
    id: 2,
    label: "インドア系",
    items: ["ゲーム", "アニメ", "映画", "読書"],
  },
  {
    id: 3,
    label: "アウトドア系",
    items: ["旅行", "キャンプ", "登山", "釣り", "食べ歩き"],
  },
];

export type Hobbies = typeof HOBBY_OPTIONS;
