import type { NewUserFormat } from "../atoms/userListAtom";
import type { Mentor, Student } from "./userType";

// 登録項目を型定義
export type RegistrationItem<T extends NewUserFormat> = {
  name: string; // 登録項目名
  key: keyof T; // register()関数で登録するキー名
};

// 登録項目名とデータのキーをマッピング
export const commonItems: RegistrationItem<NewUserFormat>[] = [
  { name: "名前", key: "name" },
  { name: "メールアドレス", key: "email" },
  { name: "年齢", key: "age" },
  { name: "住所", key: "postCode" },
  { name: "電話番号", key: "phone" },
  { name: "趣味", key: "hobbies" },
  { name: "Webサイト", key: "url" },
  { name: "役割", key: "role" },
];

export const studentItems: RegistrationItem<Omit<Student, "id">>[] = [
  { name: "勉強時間", key: "studyMinutes" },
  { name: "課題コード", key: "taskCode" },
  { name: "学習言語", key: "studyLangs" },
  { name: "スコア", key: "score" },
];

export const mentorItems: RegistrationItem<Omit<Mentor, "id">>[] = [
  { name: "経験日数", key: "experienceDays" },
  { name: "使用言語", key: "useLangs" },
  { name: "対応開始コード", key: "availableStartCode" },
  { name: "対応終了コード", key: "availableEndCode" },
];
