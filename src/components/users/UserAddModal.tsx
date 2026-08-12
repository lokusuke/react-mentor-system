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
} from "../../store/data/userRegistrationItemType";
import { HOBBY_OPTIONS } from "../../store/data/hobbies";
import type { Mentor, Student } from "../../store/data/userType";
import { LANGUAGE_OPTIONS } from "../../store/data/languages";

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
          {commonItems.map((item) => {
            if (item.key === "role") {
              return (
                <div key={item.key}>
                  <label>{item.name}</label>
                  <select
                    className="border"
                    {...register(item.key, {
                      required: `${item.name}は必須です。`,
                    })}
                  >
                    <option value="">{`${item.name}を選択してください`}</option>
                    <option value="student">生徒</option>
                    <option value="mentor">メンター</option>
                  </select>
                </div>
              );
            }

            if (item.key === "hobbies") {
              return (
                <div key={item.key}>
                  <label>{item.name}</label>
                  {Object.entries(HOBBY_OPTIONS).map(
                    ([categoryKey, category]) => (
                      <div key={categoryKey}>
                        <label>{category.label}</label>
                        {category.items.map((i) => (
                          <label key={i}>
                            <input
                              type="checkbox"
                              value={i}
                              {...register(`${item.key}`, {
                                required: `${item.name}は必須です。`,
                              })}
                            />
                            {i}
                          </label>
                        ))}
                      </div>
                    ),
                  )}
                </div>
              );
            }

            return (
              <div key={item.key}>
                <label>{item.name}</label>

                <input
                  className="border"
                  {...register(
                    item.key,
                    item.key === "age"
                      ? {
                          valueAsNumber: true,
                        }
                      : undefined,
                  )}
                />
              </div>
            );
          })}
          {watchRole === "student" &&
            studentItems.map((item) => {
              if (item.key === "studyLangs") {
                return (
                  <div key={item.key}>
                    <label>{item.name}</label>
                    {Object.entries(LANGUAGE_OPTIONS).map(
                      ([categoryKey, category]) => (
                        <div key={categoryKey}>
                          <label>{category.label}</label>
                          {category.items.map((i) => (
                            <label key={i}>
                              <input
                                type="checkbox"
                                value={i}
                                {...register(`${item.key}`, {
                                  required: `${item.name}は必須です。`,
                                })}
                              />
                              {i}
                            </label>
                          ))}
                        </div>
                      ),
                    )}
                  </div>
                );
              }
              return (
                <div key={item.key}>
                  <label>{item.name}</label>
                  <input className="border" {...register(item.key)} />
                </div>
              );
            })}
          {watchRole === "mentor" &&
            mentorItems.map((item) => {
              if (item.key === "useLangs") {
                return (
                  <div key={item.key}>
                    <label>{item.name}</label>
                    {Object.entries(LANGUAGE_OPTIONS).map(
                      ([categoryKey, category]) => (
                        <div key={categoryKey}>
                          <label>{category.label}</label>
                          {category.items.map((i) => (
                            <label key={i}>
                              <input
                                type="checkbox"
                                value={i}
                                {...register(`${item.key}`, {
                                  required: `${item.name}は必須です。`,
                                })}
                              />
                              {i}
                            </label>
                          ))}
                        </div>
                      ),
                    )}
                  </div>
                );
              }
              return (
                <div key={item.key}>
                  <label>{item.name}</label>
                  <input className="border" {...register(item.key)} />
                </div>
              );
            })}

          <Button buttonTitle="送信" type="submit"></Button>
        </form>
      </Modal>
    </div>
  );
};
