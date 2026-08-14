import type { AnyRegistrationItem } from "../../store/data/userRegistrationItemType";
import type { UserForm } from "../../store/data/userFormType";
import type { UseFormRegister } from "react-hook-form";

type Props = {
  item: AnyRegistrationItem;
  register: UseFormRegister<UserForm>;
};

export const FormField = ({ item, register }: Props) => {
  // 入力項目が必須ならregisterに渡すvalidationを作る
  const validation = item.required
    ? { required: `${item.name}は必須です。` }
    : {};

  // コンポーネントタイプ(text, select...etc)で分岐
  switch (item.type) {
    case "select":
      return (
        <div>
          <label htmlFor={item.key}>{item.name}</label>
          <select
            id={item.key}
            className="border"
            {...register(item.key, validation)}
          >
            <option value="">{`${item.name}を選択してください`}</option>
            {item.options?.map((option) => (
              <option value={option.value} key={Number(option.id)}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );
    case "checkbox":
      return (
        <div key={item.key}>
          <label>{item.name}</label>
          {item.options?.map((option) => (
            <div key={String(option.id)}>
              <label>{option.label}</label>
              {[...option.items].map((i) => (
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
          ))}
        </div>
      );
    default:
      return (
        <div key={item.key}>
          <label htmlFor={item.key}>{item.name}</label>
          <input
            id={item.key}
            className="border"
            type={item.type}
            {...register(item.key, {
              ...validation,
              valueAsNumber: item.type === "number",
            })}
          />
        </div>
      );
  }
};
