import { atom } from "jotai";
import { USER_LIST } from "../data/userData";
import type { Mentor, Student } from "../data/userType";

// 新規ユーザー登録用の型を定義(Student型、Mentor型からidプロパティを除外したもの)
export type NewUserFormat = Omit<Student, "id"> | Omit<Mentor, "id">;

// 特定の生徒をサポート可能なメンターリストの型を定義
export type AssistantAvailable = {
  student: Student;
  availableMentors: Mentor[];
};

// ソートキーの型を定義
export type StudentSortKey = "" | "studyMinutes" | "score";
export type MentorSortKey = "" | "experienceDays";
export type SortKey = StudentSortKey | MentorSortKey;

// ソート順序の型を定義
export type SortOrder = "ASC" | "DESC";

// ソートキーを管理
export const StudentSortKeyAtom = atom<StudentSortKey>("");
export const MentorSortKeyAtom = atom<MentorSortKey>("");

// ソートの降順・昇順を管理
export const sortOrderAtom = atom<SortOrder>("ASC");

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
  const students = allUsers.filter((user) => user.role === "student");
  const amountOfStudent = students.length;
  return { students, amountOfStudent };
});

// ユーザーリストのうち、メンターのみを取得する関数Atomを定義（Read-Only）
export const mentorListSummaryAtom = atom((get) => {
  const { allUsers } = get(userListSummaryAtom);
  const mentors = allUsers.filter((user) => user.role === "mentor");
  const amountOfMentor = mentors.length;
  return { mentors, amountOfMentor };
});

// ユーザーリストに新規ユーザーを追加する関数Atomを定義（Write-Only)
export const appendUser = atom(null, (get, set, newUser: NewUserFormat) => {
  // 現在のユーザーリストを取得
  const { allUsers } = get(userListSummaryAtom);
  const userIdList = allUsers.map((user) => user.id);

  const maxUserId = Math.max(0, ...userIdList);
  const userForRegistration = {
    id: maxUserId + 1, // idの最大値+1を加える
    ...newUser,
  };

  // 既存のユーザーリスト(allUsers)をばらして、新規ユーザーを追加した新しい配列をAtomに登録する
  set(userListAtom, [...allUsers, userForRegistration]);
});

// Studentの課題サポートが可能なメンター情報を取得する関数(Read-Only)
export const assistantAvailableListAtom = atom<AssistantAvailable[]>((get) => {
  const { mentors } = get(mentorListSummaryAtom);
  const { students } = get(studentListSummaryAtom);

  const assistantAvailable: AssistantAvailable[] = students.map((student) => {
    const availableMentors = mentors.filter(
      (mentor) =>
        mentor.availableStartCode <= student.taskCode &&
        mentor.availableEndCode >= student.taskCode,
    );

    return {
      student,
      availableMentors,
    };
  });

  return assistantAvailable;
});

// 生徒において、ソートキーで指定した列を昇順・降順で並び替える関数Atomを定義（Read-Only）
export const SortedStudentsByKeyAtom = atom<Student[]>((get) => {
  const { students } = get(studentListSummaryAtom);

  // ソートキーを取得
  const StudentSortKey = get(StudentSortKeyAtom);

  // ソートキーが空文字なら元の順序で返す
  if (!StudentSortKey) {
    return students;
  }

  // 昇順・降順が選択されているか確認
  const sortOrder = get(sortOrderAtom);

  // ソートキーが選択されているかつ昇順が選択されている
  if (StudentSortKey && sortOrder === "ASC") {
    const sortedStudentsAsc = students.toSorted(
      (a, b) => a[StudentSortKey] - b[StudentSortKey],
    );
    return sortedStudentsAsc;
  }

  // ソートキーが選択されているかつ降順が選択されている
  if (StudentSortKey && sortOrder === "DESC") {
    const sortedStudentsDesc = students.toSorted(
      (a, b) => b[StudentSortKey] - a[StudentSortKey],
    );
    return sortedStudentsDesc;
  }
  return students;
});

// メンターにおいて、ソートキーで指定した列を昇順・降順で並び替える関数Atomを定義（Read-Only）
export const SortedMentorsByKeyAtom = atom<Mentor[]>((get) => {
  const { mentors } = get(mentorListSummaryAtom);

  // ソートキーを取得
  const MentorSortKey = get(MentorSortKeyAtom);

  // ソートキーが空文字なら元の順序で返す
  if (!MentorSortKey) {
    return mentors;
  }

  // 昇順・降順が選択されているか確認
  const sortOrder = get(sortOrderAtom);

  // ソートキーが選択されているかつ昇順が選択されている
  if (MentorSortKey && sortOrder === "ASC") {
    const sortedMentorsAsc = mentors.toSorted(
      (a, b) => a[MentorSortKey] - b[MentorSortKey],
    );
    console.log("asc");
    return sortedMentorsAsc;
  }

  // ソートキーが選択されているかつ降順が選択されている
  if (MentorSortKey && sortOrder === "DESC") {
    const sortedMentorsDesc = mentors.toSorted(
      (a, b) => b[MentorSortKey] - a[MentorSortKey],
    );
    console.log("desc");
    return sortedMentorsDesc;
  }
  return mentors;
});
