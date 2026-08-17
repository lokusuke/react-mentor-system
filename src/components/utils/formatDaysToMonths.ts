// 月あたりの平均日数
const averageDaysPerMonth = 30.475;

// 日数をおおよその月数に変換
export const formatDaysToMonths = (days: number) => {
  return Math.floor(days / averageDaysPerMonth);
};
