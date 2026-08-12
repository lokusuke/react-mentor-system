import type { BaseUser, Mentor, Student, User } from "./userType";

// ----- 新規登録フォーム用の型定義 -----
export type BaseUserForm = Omit<BaseUser, "id"> & { role: "" | User["role"] };

export type StudentForm = Pick<
  Student,
  "studyMinutes" | "taskCode" | "studyLangs" | "score"
>;

export type MentorForm = Pick<
  Mentor,
  "experienceDays" | "useLangs" | "availableStartCode" | "availableEndCode"
>;

export type UserForm = BaseUserForm & StudentForm & MentorForm;

// 入力フォームのデフォルト値を定義
export const defaultFormValues: UserForm = {
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
