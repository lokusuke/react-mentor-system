import type { ChangeEvent } from "react";
import type { SortKey } from "../../store/atoms/userListAtom";

type KeyOption = {
  name: SortKey & string;
  key: string;
};

type Props = {
  currentSortKey: SortKey;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
  options: KeyOption[];
};

export const SelectSortKey = ({
  currentSortKey,
  onChange,
  className = "",
  options,
}: Props) => {
  return (
    <select
      value={currentSortKey}
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
