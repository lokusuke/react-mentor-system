import { useAtomValue } from "jotai";
import {
  assistantAvailableListAtom,
  mentorListSummaryAtom,
} from "./store/atoms/userListAtom";
import { type Mentor } from "./store/data/userType";
import { CustomTable } from "./common/Table";
import type { TableColumn } from "./common/Table";
import { getSupportedStudentsByMentorId } from "./utils/mentorStudentUtils";

export const MentorList = () => {
  // Atomからユーザーリストを取得
  const { mentors } = useAtomValue(mentorListSummaryAtom);

  // Atomから利用可能メンター表を取得
  const availableMentors = useAtomValue(assistantAvailableListAtom);

  // カラム情報およびカラム対応する値を取得するrender関数を定義
  const mentorColumnList: TableColumn<Mentor>[] = [
    { name: "名前", render: (u) => u.name },
    { name: "ロール", render: (u) => u.role },
    { name: "メールアドレス", render: (u) => u.email },
    { name: "年齢", render: (u) => u.age },
    { name: "郵便番号", render: (u) => u.postCode },
    { name: "電話番号", render: (u) => u.phone },
    { name: "趣味", render: (u) => u.hobbies.join("/") },
    { name: "URL", render: (u) => u.url },
    {
      name: "実務経験月数",
      render: (u) => u.experienceDays,
    },
    {
      name: "現場で使っている言語",
      render: (u) => u.useLangs.join("/"),
    },
    {
      name: "担当できる課題番号初め",
      render: (u) => u.availableStartCode,
    },
    {
      name: "担当できる課題番号終わり",
      render: (u) => u.availableEndCode,
    },
    {
      name: "対応可能な生徒",
      render: (u) =>
        getSupportedStudentsByMentorId(u.id, availableMentors).join(", "),
    },
  ];

  return (
    <div>
      <CustomTable columnList={mentorColumnList} data={mentors} />
    </div>
  );
};
