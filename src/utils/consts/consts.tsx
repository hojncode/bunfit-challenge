export const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const months = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
  "July", "Aug", "Sep", "Oct", "Nov", "Dec"
];

export const getMonthText = (key: number): string => {
  if (key < 1 || key > 12) {
    throw new Error("월 표기 에러...");
  }
  return months[key - 1];
};