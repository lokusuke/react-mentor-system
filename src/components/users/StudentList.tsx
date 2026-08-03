import { useAtom, useAtomValue } from "jotai";
import {
  assistantAvailableListAtom,
  SortedStudentsByKeyAtom,
  StudentSortKeyAtom,
  sortOrderAtom,
  type StudentSortKey,
  type SortOrder,
} from "../../store/atoms/userListAtom";
import { type Student } from "../../store/data/userType";
import { Table } from "../common/Table";
import type { TableColumn } from "../common/Table";
import { getAvailableMentorsByStudentId } from "../utils/mentorStudentUtils";
import { SelectSortOrder } from "../common/SelectSortOrder";
import { SelectSortKey } from "../common/SelectSortKey";

export const StudentList = () => {
  // Atomからソートに使用する生徒リストを取得
  const sortedStudents = useAtomValue(SortedStudentsByKeyAtom);

  // Atomから利用可能メンター表を取得
  const availableMentors = useAtomValue(assistantAvailableListAtom);

  // Atomからソートキーを取得
  const [StudentSortKey, setStudentSortKey] = useAtom(StudentSortKeyAtom);

  // Atomから昇順か降順かを取得
  const [sortOrder, setSortOrder] = useAtom(sortOrderAtom);

  const handleStudentSortKeyChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => setStudentSortKey(e.target.value as StudentSortKey);

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSortOrder(e.target.value as SortOrder);

  // カラム情報およびカラム対応する値を取得するrender関数を定義
  const studentColumnList: TableColumn<Student>[] = [
    { name: "ID", render: (u) => u.id },
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
      <label>並び替え</label>
      <SelectSortKey
        currentSortKey={StudentSortKey}
        onChange={handleStudentSortKeyChange}
        options={[
          { name: "", key: "指定なし" },
          { name: "studyMinutes", key: "勉強時間" },
          { name: "score", key: "ハピネススコア" },
        ]}
      />
      {StudentSortKey && (
        <SelectSortOrder
          currentSortOrder={sortOrder}
          onChange={handleSortOrderChange}
          options={[
            { name: "ASC", key: "昇順" },
            { name: "DESC", key: "降順" },
          ]}
        />
      )}
      <Table columnList={studentColumnList} data={sortedStudents} />
    </div>
  );
};
