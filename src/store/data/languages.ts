export type FrontendItem =
  | "HTML"
  | "CSS"
  | "JavaScript"
  | "TypeScript"
  | "React"
  | "Next.js"
  | "Vue.js";
export type BackendItem =
  | "Golang"
  | "PHP"
  | "Ruby"
  | "Python"
  | "Java"
  | "C#"
  | "Node.js"
  | "Rails"
  | "Rust";

export type Languages = {
  frontend: {
    label: "フロントエンド";
    items: FrontendItem[];
  };
  backend: {
    label: "バックエンド";
    items: BackendItem[];
  };
};

export const LANGUAGE_OPTIONS: Languages = {
  frontend: {
    label: "フロントエンド",
    items: [
      "HTML",
      "CSS",
      "JavaScript",
      "TypeScript",
      "React",
      "Next.js",
      "Vue.js",
    ],
  },
  backend: {
    label: "バックエンド",
    items: [
      "Golang",
      "PHP",
      "Ruby",
      "Python",
      "Java",
      "C#",
      "Node.js",
      "Rails",
      "Rust",
    ],
  },
} as const;
