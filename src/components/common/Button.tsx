import type React from "react";

// bootstrapのボタンスタイリングを使用
const variantClass = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  success: "btn-success",
  danger: "btn-danger",
};

// onClickにはボタン操作時にuseStateから返る更新関数の型のみを許可する(更新する値の型がT)
type Props<T> = {
  type: "button" | "submit";
  buttonTitle: string;
  variant?: "primary" | "secondary" | "success" | "danger"; // ボタンの色
  onClick?: React.Dispatch<React.SetStateAction<T>>; // クリック時の処理関数
  value?: T; // 処理関数の引数
};

export const Button = <T,>({
  type,
  variant = "primary",
  buttonTitle,
  onClick,
  value,
}: Props<T>) => {
  return (
    <button
      type={type}
      className={`btn ${variantClass[variant]}`}
      onClick={
        type === "submit"
          ? undefined
          : onClick && value
            ? () => onClick(value)
            : undefined
      }
    >
      {buttonTitle}
    </button>
  );
};
