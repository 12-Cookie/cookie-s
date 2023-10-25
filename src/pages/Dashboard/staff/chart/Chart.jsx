import { useFireFetch } from "../../../../hooks/useFireFetch";

const Chart = () => {
  const dummyUserData = JSON.parse(localStorage.getItem("user"));
  const dummyUserId = dummyUserData.userId;
  const fetch = useFireFetch();
  const scheduleData = fetch.getData("schedule");
  const bookingShiftsData = fetch.getData(
    "bookingShifts",
    "userId",
    dummyUserId,
  );

  const matchingData = [];
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();
  const currentDate = today.getDate();

  for (const secondItem of bookingShiftsData) {
    const scheduleId = secondItem.scheduleId;

    const matchingFirstItem = scheduleData.find(
      (firstItem) => firstItem.id === scheduleId,
    );

    if (matchingFirstItem) {
      const newObject = {
        ...matchingFirstItem,
      };

      matchingData.push(newObject);
    }
  }

  const last7daysData = (data) => {
    const filteredData = data.filter(
      (item) =>
        item.date.month === currentMonth &&
        item.date.year === currentYear &&
        item.date.day >= currentDate - 7 &&
        item.date.day < today,
    );
    return filteredData;
  };

  const thisMonthData = (data) => {
    const filteredData = data.filter(
      (item) =>
        item.date.month === currentMonth && item.date.year === currentYear,
    );
    return filteredData;
  };

  const thisYearData = (data) => {
    const filteredData = data.filter((item) => item.date.year === currentYear);
    return filteredData;
  };

  const handleClick = () => {
    console.log(bookingShiftsData);
  };

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>
        <button onClick={handleClick}>지난 7일</button>
        <p>11</p>
      </div>
      <div>
        <button>이번 달</button>
      </div>
      <div>
        <button>이번 연도</button>
      </div>
      <div>
        {/* {last7daysData.map((item) => (
          <p key={item.id}>{item.id}</p>
        ))} */}
      </div>
    </div>
  );
};

export default Chart;
