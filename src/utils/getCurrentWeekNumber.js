const getCurrentWeekNumber = () => {
  const today = new Date();
  const year = today.getFullYear();

  const target = new Date(today.valueOf());
  const dayNumber = (today.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNumber + 3);

  const firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay() + 7) % 7));
  }
  return `${year}-W${String(
    Math.ceil((firstThursday - target) / 604800000) + 1,
  ).padStart(2, "0")}`;
};

export default getCurrentWeekNumber;
