// ベースのユーザー型制約を定義
interface BaseUser {
  id: number;
  name: string;
  email: string;
  age: number;
  postCode: string;
  phone: string;
  hobbies: string[];
  url: string;
}

// ベースを継承する生徒の型制約を定義
export interface Student extends BaseUser {
  role: "student";
  studyMinutes: number;
  taskCode: number;
  studyLangs: string[];
  score: number;
}

// ベースを継承するメンターの型制約を定義
export interface Mentor extends BaseUser {
  role: "mentor";
  experienceDays: number;
  useLangs: string[];
  availableStartCode: number;
  availableEndCode: number;
}

// ユーザーの型を定義(Student or Mentor)
export type User = Student | Mentor;

// Student型を確定させるための関数（型述語を使用）
export const isStudent = (user: User): user is Student => {
  return user.role === "student";
};
