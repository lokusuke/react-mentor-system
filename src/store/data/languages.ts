export const LANGUAGE_OPTIONS = [
  {
    id: 1,
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
  {
    id: 2,
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
];

export type Languages = typeof LANGUAGE_OPTIONS;
