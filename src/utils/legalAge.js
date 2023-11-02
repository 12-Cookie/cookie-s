export function calculateLegalAge(birthDate) {
  if (!birthDate) {
    return null;
  }

  const [year, month, day] = birthDate.split(".");
  const birthYear = parseInt(year, 10);
  const birthMonth = parseInt(month, 10);
  const birthDay = parseInt(day, 10);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const currentDay = currentDate.getDate();
  let legalAge = currentYear - birthYear;

  if (
    currentMonth < birthMonth ||
    (currentMonth === birthMonth && currentDay < birthDay)
  ) {
    legalAge--;
  }

  return legalAge;
}
