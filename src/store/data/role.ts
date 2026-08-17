// 入力フォームの役割選択用のデータを定義
export const ROLE_OPTIONS = [
  {
    id: 1,
    label: "生徒",
    value: "student",
  },
  {
    id: 2,
    label: "メンター",
    value: "mentor",
  },
];

// 入力フォームの役割選択用の型を定義
export type Role = typeof ROLE_OPTIONS;
