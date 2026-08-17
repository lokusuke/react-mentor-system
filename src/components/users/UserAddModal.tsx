import { useForm } from "react-hook-form";
import { Modal } from "../common/Modal";
import { Button } from "../common/Button";
import { appendUser } from "../../store/atoms/userListAtom";
import { useSetAtom } from "jotai";
import {
  defaultFormValues,
  type UserForm,
} from "../../store/data/userFormType";
import {
  commonItems,
  mentorItems,
  studentItems,
  type AnyRegistrationItem,
} from "../../store/data/userRegistrationItemType";
import type { Mentor, Student } from "../../store/data/userType";
import { FormField } from "./FormField";

type Props = {
  isPushed: boolean;
  setIsPushed: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UserAddModal = ({ isPushed, setIsPushed }: Props) => {
  const { register, handleSubmit, watch } = useForm<UserForm>({
    // アンマウントされたコンポーネントの登録内容を削除
    shouldUnregister: true,
    // デフォルト値
    defaultValues: defaultFormValues,
  });

  const addUser = useSetAtom(appendUser);

  // useFormの戻り値watchは指定プロパティの値を監視
  const watchRole = watch("role");

  // roleによって登録項目を変更する関数
  const roleItems: AnyRegistrationItem[] =
    watchRole === "student"
      ? studentItems
      : watchRole === "mentor"
        ? mentorItems
        : [];

  // 入力フォームの項目を最終決定
  const formItems: AnyRegistrationItem[] = [...commonItems, ...roleItems];

  const onSubmit = (data: UserForm) => {
    const commonUser = {
      name: data.name,
      email: data.email,
      age: data.age,
      postCode: data.postCode,
      phone: data.phone,
      hobbies: data.hobbies,
      url: data.url,
    };

    if (data.role === "student") {
      const newStudent: Omit<Student, "id"> = {
        ...commonUser,
        role: "student",
        studyMinutes: data.studyMinutes,
        taskCode: data.taskCode,
        studyLangs: data.studyLangs,
        score: data.score,
      };

      console.log(newStudent);

      // 関数Atomを使用してデータを保管
      addUser(newStudent);
    }

    if (data.role === "mentor") {
      const newMentor: Omit<Mentor, "id"> = {
        ...commonUser,
        role: "mentor",
        experienceDays: data.experienceDays,
        useLangs: data.useLangs,
        availableStartCode: data.availableStartCode,
        availableEndCode: data.availableEndCode,
      };

      console.log(newMentor);

      // 関数Atomを使用してデータを保管
      addUser(newMentor);
    }

    // 編集モーダルを閉じる
    setIsPushed(!isPushed);
    return;
  };

  return (
    <div>
      <Modal>
        <p className="font-sans m-2 pb-1 text-sm  text-gray-700">
          ユーザー新規登録
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          {formItems.map((formItem) => (
            <FormField item={formItem} register={register} key={formItem.key} />
          ))}
          <Button buttonTitle="送信" type="submit"></Button>
        </form>
      </Modal>
    </div>
  );
};
