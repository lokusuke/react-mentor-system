// 新規登録フォームの項目を決めるための型を定義
import type { NewUserFormat } from "../atoms/userListAtom";
import { HOBBY_OPTIONS } from "./hobbies";
import { LANGUAGE_OPTIONS } from "./languages";
import { ROLE_OPTIONS } from "./role";
import type { Mentor, Student } from "./userType";

// 登録項目を型定義
export type RegistrationItem<T extends NewUserFormat> = {
  name: string; // 登録項目名
  key: keyof T; // register()関数で登録するキー名
  type: "text" | "number" | "checkbox" | "select"; // 登録項目の入力タイプ
  options?: Record<string, any>[]; // typeが"select", checkbox のときの選択肢
  required?: boolean; // 入力必須であるか
};

// 登録項目名とデータのキーをマッピング
export const commonItems: RegistrationItem<NewUserFormat>[] = [
  { name: "名前", key: "name", type: "text", required: true },
  { name: "メールアドレス", key: "email", type: "text", required: true },
  { name: "年齢", key: "age", type: "number" },
  { name: "住所", key: "postCode", type: "text" },
  { name: "電話番号", key: "phone", type: "text" },
  {
    name: "趣味",
    key: "hobbies",
    type: "checkbox",
    options: HOBBY_OPTIONS,
    required: true,
  },
  { name: "Webサイト", key: "url", type: "text" },
  {
    name: "役割",
    key: "role",
    type: "select",
    options: ROLE_OPTIONS,
    required: true,
  },
];

export const studentItems: RegistrationItem<Omit<Student, "id">>[] = [
  { name: "勉強時間", key: "studyMinutes", type: "number" },
  { name: "課題コード", key: "taskCode", type: "number" },
  {
    name: "学習言語",
    key: "studyLangs",
    type: "checkbox",
    options: LANGUAGE_OPTIONS,
    required: true,
  },
  { name: "スコア", key: "score", type: "number" },
];

export const mentorItems: RegistrationItem<Omit<Mentor, "id">>[] = [
  { name: "経験日数", key: "experienceDays", type: "number" },
  {
    name: "使用言語",
    key: "useLangs",
    type: "checkbox",
    options: LANGUAGE_OPTIONS,
    required: true,
  },
  { name: "対応開始コード", key: "availableStartCode", type: "number" },
  { name: "対応終了コード", key: "availableEndCode", type: "number" },
];

export type AnyRegistrationItem =
  | RegistrationItem<NewUserFormat>
  | RegistrationItem<Omit<Student, "id">>
  | RegistrationItem<Omit<Mentor, "id">>;
