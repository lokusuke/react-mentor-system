import type React from "react";

// onClickにはボタン操作時にuseStateから返る更新関数の型のみを許可する(更新する値の型がT)
type Props<T> = {
  buttonTitle: string;
  onClick: React.Dispatch<React.SetStateAction<T>>;
  value: T;
};

export const Button = <T,>({ buttonTitle, onClick, value }: Props<T>) => {
  return (
    <button
      type="button"
      className="btn btn-secondary"
      onClick={() => onClick(value)}
    >
      {buttonTitle}
    </button>
  );
};
