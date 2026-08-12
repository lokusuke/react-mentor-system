export type Sports =
  | "ランニング"
  | "筋トレ"
  | "サッカー"
  | "野球"
  | "サーフィン";
export type Indoor = "ゲーム" | "アニメ" | "映画" | "読書";
export type Outdoor = "旅行" | "キャンプ" | "登山" | "釣り" | "食べ歩き";

export type Hobbies = {
  sports: {
    label: "スポーツ系";
    items: Sports[];
  };
  indoor: {
    label: "インドア系";
    items: Indoor[];
  };
  outdoor: {
    label: "アウトドア系";
    items: Outdoor[];
  };
};

export const HOBBY_OPTIONS: Hobbies = {
  sports: {
    label: "スポーツ系",
    items: ["ランニング", "筋トレ", "サッカー", "野球", "サーフィン"],
  },

  indoor: {
    label: "インドア系",
    items: ["ゲーム", "アニメ", "映画", "読書"],
  },

  outdoor: {
    label: "アウトドア系",
    items: ["旅行", "キャンプ", "登山", "釣り", "食べ歩き"],
  },
} as const;
