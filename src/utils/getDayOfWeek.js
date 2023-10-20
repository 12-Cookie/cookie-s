const getDayOfWeek = (year, month, day) => {
  const days = ["일", "월", "화", "수", "목", "금", "토"];

  const date = new Date(year, month - 1, day);

  const dayOfWeek = date.getDay();
  const dayText = days[dayOfWeek];

  return dayText;
};

export default getDayOfWeek;
