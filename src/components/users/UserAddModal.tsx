import { useForm } from "react-hook-form";
import { Modal } from "../common/Modal";
import { Button } from "../common/Button";
import { appendUser, type NewUserFormat } from "../../store/atoms/userListAtom";
import { useSetAtom } from "jotai";
import type { Mentor, Student } from "../../store/data/userType";

type RegistrationItem<T extends NewUserFormat> = {
  name: string; // 登録項目名
  key: keyof T; // register()関数で登録するキー名
};

const commonItems: RegistrationItem<NewUserFormat>[] = [
  { name: "名前", key: "name" },
  { name: "メールアドレス", key: "email" },
  { name: "年齢", key: "age" },
  { name: "住所", key: "postCode" },
  { name: "電話番号", key: "phone" },
  { name: "趣味", key: "hobbies" },
  { name: "Webサイト", key: "url" },
  { name: "役割", key: "role" },
];

const studentItems: RegistrationItem<Omit<Student, "id">>[] = [
  { name: "勉強時間", key: "studyMinutes" },
  { name: "課題コード", key: "taskCode" },
  { name: "学習言語", key: "studyLangs" },
  { name: "スコア", key: "score" },
];

const mentorItems: RegistrationItem<Omit<Mentor, "id">>[] = [
  { name: "経験日数", key: "experienceDays" },
  { name: "使用言語", key: "useLangs" },
  { name: "対応開始コード", key: "availableStartCode" },
  { name: "対応終了コード", key: "availableEndCode" },
];

export const UserAddModal = () => {
  const { register, handleSubmit, watch } = useForm<NewUserFormat>();
  const addUser = useSetAtom(appendUser);

  // useFormの戻り値watchは指定プロパティの値を監視
  const watchRole = watch("role");

  const onSubmit = (data: NewUserFormat) => {
    // Atomをつかってデータ追加
    addUser(data);
  };

  return (
    <div>
      <Modal>
        <p className="font-sans m-2 pb-1 text-sm  text-gray-700">
          ユーザー新規登録
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          {commonItems.map((item) =>
            item.key === "role" ? (
              <div key={item.key}>
                <label>{item.name}</label>
                <select className="border" {...register(item.key)}>
                  <option value="">役割を選択してください</option>
                  <option value="student">生徒</option>
                  <option value="mentor">メンター</option>
                </select>
              </div>
            ) : (
              <div key={item.key}>
                <label>{item.name}</label>
                <input className="border" {...register(item.key)} />
              </div>
            ),
          )}
          {watchRole === "student" &&
            studentItems.map((item) => (
              <div key={item.key}>
                <label>{item.name}</label>
                <input className="border" {...register(item.key)} />
              </div>
            ))}
          {watchRole === "mentor" &&
            mentorItems.map((item) => (
              <div key={item.key}>
                <label>{item.name}</label>
                <input className="border" {...register(item.key)} />
              </div>
            ))}

          <Button buttonTitle="送信" type="submit"></Button>
        </form>
      </Modal>
    </div>
  );
};
