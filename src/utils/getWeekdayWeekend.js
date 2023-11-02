import { useState, useEffect } from "react";
import getDayOfWeek from "./getDayOfWeek";

const getWeekdayWeekend = (year, weekNumber) => {
  const [weekdays, setWeekdays] = useState([]);
  const [weekends, setWeekends] = useState([]);
  const formatDate = (currentDate) => {
    const date = new Date(currentDate);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const dayOfWeek = getDayOfWeek(year, month, day);
    return `${year}-${month}-${day} ${dayOfWeek}`;
  };
  useEffect(() => {
    const firstDayOfYear = new Date(year, 0, 1);
    const daysToFirstMonday = 1 - firstDayOfYear.getDay();
    const startDate = new Date(
      year,
      0,
      1 + daysToFirstMonday + (weekNumber - 1) * 7,
    );

    const tempWeekdays = [];
    const tempWeekends = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startDate.getTime());
      currentDate.setDate(startDate.getDate() + i);
      if (currentDate.getDay() === 0 || currentDate.getDay() === 6) {
        tempWeekends.push(formatDate(currentDate));
      } else {
        tempWeekdays.push(formatDate(currentDate));
      }
    }
    setWeekdays(tempWeekdays);
    setWeekends(tempWeekends);
  }, [year, weekNumber]);
  return { weekdays, weekends };
};

export default getWeekdayWeekend;
