import { useAtom, useAtomValue } from "jotai";
import {
  assistantAvailableListAtom,
  MentorSortKeyAtom,
  SortedMentorsByKeyAtom,
  sortOrderAtom,
  type MentorSortKey,
  type SortOrder,
} from "../../store/atoms/userListAtom";
import { type Mentor } from "../../store/data/userType";
import { Table } from "../common/Table";
import type { TableColumn } from "../common/Table";
import { getSupportedStudentsByMentorId } from "../utils/mentorStudentUtils";
import { formatDaysToMonths } from "../utils/formatDaysToMonths";
import { SelectSortKey } from "../common/SelectSortKey";
import { SelectSortOrder } from "../common/SelectSortOrder";

export const MentorList = () => {
  // Atomからソートに使用するメンターリストを取得
  const sortedMentors = useAtomValue(SortedMentorsByKeyAtom);

  // Atomからソートキーを取得
  const [mentorSortKey, setMentorSortKey] = useAtom(MentorSortKeyAtom);

  // Atomから昇順か降順かを取得
  const [sortOrder, setSortOrder] = useAtom(sortOrderAtom);

  // Atomから利用可能メンター表を取得
  const availableMentors = useAtomValue(assistantAvailableListAtom);

  const handleMentorSortKeyChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setMentorSortKey(e.target.value as MentorSortKey);

  const handleSortOrderChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSortOrder(e.target.value as SortOrder);

  // カラム情報およびカラム対応する値を取得するrender関数を定義
  const mentorColumnList: TableColumn<Mentor>[] = [
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
      name: "実務経験月数",
      render: (u) => formatDaysToMonths(u.experienceDays),
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
      <label>並び替え</label>
      <SelectSortKey
        currentSortKey={mentorSortKey}
        onChange={handleMentorSortKeyChange}
        options={[
          { name: "", key: "指定なし" },
          { name: "experienceDays", key: "実務経験月数" },
        ]}
      />
      {mentorSortKey && (
        <SelectSortOrder
          currentSortOrder={sortOrder}
          onChange={handleSortOrderChange}
          options={[
            { name: "ASC", key: "昇順" },
            { name: "DESC", key: "降順" },
          ]}
        />
      )}
      <Table columnList={mentorColumnList} data={sortedMentors} />
    </div>
  );
};
