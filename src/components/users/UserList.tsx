import { useAtomValue } from "jotai";
import {
  assistantAvailableListAtom,
  userListSummaryAtom,
} from "../../store/atoms/userListAtom";
import { isStudent, type User } from "../../store/data/userType";
import { CustomTable } from "../common/Table";
import type { TableColumn } from "../common/Table";
import {
  getAvailableMentorsByStudentId,
  getSupportedStudentsByMentorId,
} from "../utils/mentorStudentUtils";

export const UserList = () => {
  // Atomからユーザーリストを取得
  const { allUsers } = useAtomValue(userListSummaryAtom);

  // Atomから利用可能メンター表を取得
  const availableMentors = useAtomValue(assistantAvailableListAtom);

  // カラム情報およびカラム対応する値を取得するrender関数を定義
  const userColumnList: TableColumn<User>[] = [
    { name: "名前", render: (u) => u.name },
    { name: "ロール", render: (u) => u.role },
    { name: "メールアドレス", render: (u) => u.email },
    { name: "年齢", render: (u) => u.age },
    { name: "郵便番号", render: (u) => u.postCode },
    { name: "電話番号", render: (u) => u.phone },
    { name: "趣味", render: (u) => u.hobbies.join("/") },
    { name: "URL", render: (u) => u.url },
    {
      name: "勉強時間",
      render: (u) => (isStudent(u) ? u.studyMinutes : "-"),
    },
    { name: "課題番号", render: (u) => (isStudent(u) ? u.taskCode : "-") },
    {
      name: "勉強中の言語",
      render: (u) => (isStudent(u) ? u.studyLangs.join("/") : "-"),
    },
    { name: "ハピネススコア", render: (u) => (isStudent(u) ? u.score : "-") },
    {
      name: "対応可能なメンター",
      render: (u) =>
        isStudent(u)
          ? getAvailableMentorsByStudentId(u.id, availableMentors).join(",")
          : "-",
    },
    {
      name: "実務経験月数",
      render: (u) => (!isStudent(u) ? u.experienceDays : "-"),
    },
    {
      name: "現場で使っている言語",
      render: (u) => (!isStudent(u) ? u.useLangs.join("/") : "-"),
    },
    {
      name: "担当できる課題番号初め",
      render: (u) => (!isStudent(u) ? u.availableStartCode : "-"),
    },
    {
      name: "担当できる課題番号終わり",
      render: (u) => (!isStudent(u) ? u.availableEndCode : "-"),
    },
    {
      name: "対応可能な生徒",
      render: (u) =>
        !isStudent(u)
          ? getSupportedStudentsByMentorId(u.id, availableMentors).join(", ")
          : "-",
    },
  ];

  return (
    <div>
      <CustomTable columnList={userColumnList} data={allUsers} />
    </div>
  );
};
