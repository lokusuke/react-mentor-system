import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

// モーダル表示のベースとなる暗転部分
export const Modal = ({ children, className = "" }: Props) => {
  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50"
      style={{ zIndex: 1050 }}
    >
      <div
        className={`bg-light d-flex flex-column rounded-4 p-2 m-3 w-100 ${className}`}
        style={{ maxWidth: "400px" }}
      >
        {children}
      </div>
    </div>
  );
};
