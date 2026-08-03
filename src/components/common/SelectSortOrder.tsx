import type { ChangeEvent } from "react";
import type { SortOrder } from "../../store/atoms/userListAtom";

type OrderOption = {
  name: SortOrder & string;
  key: string;
};

type Props = {
  currentSortOrder: SortOrder;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  options: OrderOption[];
};

export const SelectSortOrder = ({
  currentSortOrder,
  onChange,
  className,
  options,
}: Props) => {
  return (
    <select
      value={currentSortOrder}
      className={`border ${className}`}
      onChange={onChange}
    >
      {options.map((option) => (
        <option key={option.key} value={option.name}>
          {option.key}
        </option>
      ))}
    </select>
  );
};
