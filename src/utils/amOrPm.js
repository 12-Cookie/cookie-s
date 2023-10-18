const amOrPm = (time) => {
  const parts = time.split(":");
  const hour = ~~parts[0];

  if (hour <= 12) return "오전";
  else return "오후";
};

export default amOrPm;
