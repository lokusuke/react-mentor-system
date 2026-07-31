import type { ReactNode } from "react";
import type { User } from "../../store/data/userType";

// テーブルカラム情報の型を定義
export type TableColumn<T> = {
  name: string; // カラム名
  render: (data: T) => ReactNode; // カラム名に対応するデータ（戻り値をReactNode型へ変換）
};

// オブジェクトに型制約を定義する
interface Props<T> {
  columnList: TableColumn<T>[];
  data: T[];
}

export const CustomTable = <T extends User>({ columnList, data }: Props<T>) => {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            {columnList.map((column) => (
              <td scope="col" key={column.name}>
                {column.name}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.id}>
              {columnList.map((column) => (
                <td scope="col" key={column.name}>
                  {column.render(d)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
