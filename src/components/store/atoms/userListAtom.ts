import { atom } from "jotai";
import { USER_LIST } from "../data/userData";
import type { Mentor, Student } from "../data/userType";

// 新規ユーザー登録用の型制約を定義(Student型、Mentor型からidプロパティを除外したもの)
type NewUserFormat = Omit<Student, "id"> | Omit<Mentor, "id">;

// 課題コードに対応したサポート可能なメンターリストの型を定義
export type AssistantAvailable = {
  student: Student;
  mentors: Mentor[];
};

// ユーザーリストの生データの複製をAtomで管理
export const userListAtom = atom(USER_LIST);

// ユーザーリスト全体を取得し、ユーザー数を返す関数Atomを定義（Read-Only）
export const userListSummaryAtom = atom((get) => {
  const allUsers = get(userListAtom);
  const amountOfUser = allUsers.length;
  return { allUsers, amountOfUser };
});

// ユーザーリストのうち、生徒のみを取得する関数Atomを定義（Read-Only）
export const studentListSummaryAtom = atom((get) => {
  const { allUsers } = get(userListSummaryAtom);
  const studentList = allUsers.filter((user) => user.role === "student");
  const amountOfStudent = studentList.length;
  return { studentList, amountOfStudent };
});

// ユーザーリストのうち、メンターのみを取得する関数Atomを定義（Read-Only）
export const mentorListSummaryAtom = atom((get) => {
  const { allUsers } = get(userListSummaryAtom);
  const mentorList = allUsers.filter((user) => user.role === "mentor");
  const amountOfMentor = mentorList.length;
  return { mentorList, amountOfMentor };
});

// ユーザーリストに新規ユーザーを追加する関数Atomを定義（Write-Only)
export const appendUser = atom(null, (get, set, newUser: NewUserFormat) => {
  // 現在のユーザーリストを取得
  const { allUsers } = get(userListSummaryAtom);
  const userIdList = allUsers.map((user) => user.id);

  // ToDo: allUsersが空のときを考慮する
  const maxUserId = Math.max(...userIdList);
  const userForRegistration = {
    id: maxUserId + 1, // idの最大値+1を加える
    ...newUser,
  };

  // 既存のユーザーリスト(allUsers)をばらして、新規ユーザーを追加した新しい配列をAtomに登録する
  set(userListAtom, [...allUsers, userForRegistration]);
});

// Studentの課題サポートが可能なメンター情報を取得する関数(Read-Only)
export const assistantAvailableListAtom = atom<AssistantAvailable[]>((get) => {
  const { mentorList } = get(mentorListSummaryAtom);
  const { studentList } = get(studentListSummaryAtom);

  const assistantAvailable: AssistantAvailable[] = studentList.map(
    (student) => {
      const mentors = mentorList.filter(
        (mentor) =>
          mentor.availableStartCode <= student.taskCode &&
          mentor.availableEndCode >= student.taskCode,
      );

      return {
        student,
        mentors,
      };
    },
  );

  return assistantAvailable;
});
