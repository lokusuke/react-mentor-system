// 入力フォームのデフォルト値を定義
export const defaultFormValues = {
  // 共通項目
  name: "",
  email: "",
  age: 0,
  postCode: "",
  phone: "",
  hobbies: [],
  url: "",
  role: "",

  // 生徒用項目
  studyMinutes: 0,
  taskCode: 0,
  studyLangs: [],
  score: 0,

  // メンター用項目
  experienceDays: 0,
  useLangs: [],
  availableStartCode: 0,
  availableEndCode: 0,
};
// ------------------------------------------

export type UserForm = typeof defaultFormValues;
