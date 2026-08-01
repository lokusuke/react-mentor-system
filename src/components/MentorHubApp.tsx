import { useState } from "react";
import { UserList } from "./users/UserList";
import { StudentList } from "./users/StudentList";
import { MentorList } from "./users/MentorList";
import { Button } from "./common/Button";
import { UserAddModal } from "./users/UserAddModal";

// トグルの種類を定義
type ToggleString = "allUsers" | "students" | "mentors";

export const MentorHubApp = () => {
  // トグルの初期状態を定義
  const [activeToggle, setActiveToggle] = useState<ToggleString>("allUsers");

  // ユーザー新規登録ボタンの状態を定義
  const [isPushed, setIsPushed] = useState<boolean>(false);

  return (
    <div className="container items-center" role="group">
      <div className="d-flex justify-content-between m-3">
        <div
          className="btn-group"
          role="group"
          aria-label="this is radio toggle button group"
        >
          <input
            type="radio"
            className="btn-check"
            name="radio-button"
            id="rb1"
            checked={activeToggle === "allUsers"}
            onChange={() => setActiveToggle("allUsers")}
          />
          <label className="btn btn-outline-primary" htmlFor="rb1">
            全ユーザー
          </label>
          <input
            type="radio"
            className="btn-check"
            name="radio-button"
            id="rb2"
            checked={activeToggle === "students"}
            onChange={() => setActiveToggle("students")}
          />
          <label className="btn btn-outline-primary" htmlFor="rb2">
            生徒
          </label>
          <input
            type="radio"
            className="btn-check"
            name="radio-button"
            id="rb3"
            checked={activeToggle === "mentors"}
            onChange={() => setActiveToggle("mentors")}
          />
          <label className="btn btn-outline-primary" htmlFor="rb3">
            メンター
          </label>
        </div>
        <Button
          type="button"
          buttonTitle="+ 新規追加"
          onClick={setIsPushed}
          value={!isPushed}
        ></Button>
      </div>
      {activeToggle === "allUsers" && <UserList />}
      {activeToggle === "students" && <StudentList />}
      {activeToggle === "mentors" && <MentorList />}
      {/* Todo: 新規登録ボタンを押したらユーザー登録モーダルを表示 */}
      {isPushed && <UserAddModal />}
    </div>
  );
};
