import type { AssistantAvailable } from "../store/atoms/userListAtom";

// 指定する生徒をサポート可能なメンターを取得する関数
export const getAvailableMentorsByStudentId = (
  studentId: number,
  availableMentors: AssistantAvailable[],
) => {
  const targetAvailableMentors = availableMentors.find(
    (a) => a.student.id === studentId,
  );

  const target = targetAvailableMentors?.availableMentors.map(
    (mentor) => mentor.name,
  );

  return target ?? [];
};

// 指定のメンターがサポート可能な生徒を取得する関数
export const getSupportedStudentsByMentorId = (
  mentorId: number,
  availableMentors: AssistantAvailable[],
) => {
  const target = availableMentors.filter((am) => {
    const mentorIdList = am.availableMentors.map((a) => a.id);
    return mentorIdList.includes(mentorId);
  });

  return target.map((t) => t.student.name);
};
