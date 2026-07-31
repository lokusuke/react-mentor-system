import { useAtomValue } from "jotai";
import {
  assistantAvailableListAtom,
  studentListSummaryAtom,
} from "../../store/atoms/userListAtom";
import { type Student } from "../../store/data/userType";
import { CustomTable } from "../common/Table";
import type { TableColumn } from "../common/Table";
import { getAvailableMentorsByStudentId } from "../utils/mentorStudentUtils";

export const StudentList = () => {
  // Atomからユーザーリストを取得
  const { students } = useAtomValue(studentListSummaryAtom);

  // Atomから利用可能メンター表を取得
  const availableMentors = useAtomValue(assistantAvailableListAtom);

  // カラム情報およびカラム対応する値を取得するrender関数を定義
  const studentColumnList: TableColumn<Student>[] = [
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
      render: (u) => u.studyMinutes,
    },
    { name: "課題番号", render: (u) => u.taskCode },
    {
      name: "勉強中の言語",
      render: (u) => u.studyLangs.join("/"),
    },
    { name: "ハピネススコア", render: (u) => u.score },
    {
      name: "対応可能なメンター",
      render: (u) =>
        getAvailableMentorsByStudentId(u.id, availableMentors).join(","),
    },
  ];

  return (
    <div>
      <CustomTable columnList={studentColumnList} data={students} />
    </div>
  );
};
