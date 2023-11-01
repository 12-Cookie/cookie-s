import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Button } from "@chakra-ui/react";
import useUserStore from "../../../../store/user/useUserStore";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const Chart = ({ matchingData }) => {
  const { payPerHour } = useUserStore((state) => state.userData);
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();
  const currentDate = today.getDate();
  const [chartDate, setChartDate] = useState([]);
  const [chartPay, setChartPay] = useState([]);
  const [chartLabel, setChartLabel] = useState("");

  useEffect(() => {
    handleLast7days();
  }, [matchingData]);

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

  const handleLast7days = () => {
    const last7DaysArr = last7daysData(matchingData);

    const sortedDates = last7DaysArr
      .map(
        (data) =>
          new Date(`${data.date.year}-${data.date.month}-${data.date.day}`),
      )
      .sort((a, b) => a - b);

    const returnStringToDate = sortedDates.map((date) => {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}-${month}-${day}`;
    });

    setChartDate(returnStringToDate);
    setChartLabel("지난 7일 근무 급여");
    calculatePay(last7daysData(matchingData));
  };

  const handleThisMonth = () => {
    const thisMonthDataArr = thisMonthData(matchingData);

    const sortedDates = thisMonthDataArr
      .map(
        (data) =>
          new Date(`${data.date.year}-${data.date.month}-${data.date.day}`),
      )
      .sort((a, b) => a - b);

    const returnStringToDate = sortedDates.map((date) => {
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}-${month}-${day}`;
    });

    setChartDate(returnStringToDate);
    setChartLabel("이번 달 근무 급여");
    calculatePay(thisMonthData(matchingData));
  };

  const handleThisYear = () => {
    const groupedData = {};
    thisYearData(matchingData).forEach((data) => {
      const key = `${data.date.year}-${data.date.month}`;
      if (!groupedData[key]) {
        groupedData[key] = [];
      }
      groupedData[key].push(data);
    });

    const thisYearPay = [];

    const sortedKeys = Object.keys(groupedData).sort((a, b) => {
      const dateA = new Date(a);
      const dateB = new Date(b);
      return dateA - dateB;
    });

    for (const key in groupedData) {
      const OVERTIME_HOURS = 9;
      const USER_PAY = payPerHour;
      const monthData = groupedData[key];
      const totalPayForMonth = monthData.reduce((totalPay, item) => {
        const start = Number(item.time.start.replace(":", ""));
        const end = Number(item.time.end.replace(":", ""));
        const answer = (end - start) / 100;
        let pay;

        if (answer <= OVERTIME_HOURS) {
          pay = answer * USER_PAY;
        } else {
          pay =
            OVERTIME_HOURS * USER_PAY +
            (answer - OVERTIME_HOURS) * USER_PAY * 1.5;
        }

        return totalPay + pay;
      }, 0);

      thisYearPay.push(totalPayForMonth);
    }
    setChartPay(thisYearPay);
    setChartDate(sortedKeys);
    setChartLabel("월 별 급여 총액");
  };

  const calculatePay = (data) => {
    const OVERTIME_HOURS = 9;
    const USER_PAY = payPerHour;
    const userPay = data.map((item) => {
      const start = Number(item.time.start.replace(":", ""));
      const end = Number(item.time.end.replace(":", ""));
      const answer = (end - start) / 100;
      let pay;

      if (answer <= OVERTIME_HOURS) {
        pay = answer * USER_PAY;
      } else {
        pay =
          OVERTIME_HOURS * USER_PAY +
          (answer - OVERTIME_HOURS) * USER_PAY * 1.5;
      }

      return pay;
    });
    setChartPay(userPay);
  };

  const labels = chartDate;
  const datas = chartPay;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: "Chart.js Bar Chart",
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        label: chartLabel,
        data: datas,
        backgroundColor: "rgb(49, 151, 149)",
      },
    ],
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "5px", justifyContent: "flex-end" }}>
        <Button onClick={handleLast7days} colorScheme="teal" size="sm">
          지난 7일
        </Button>
        <Button onClick={handleThisMonth} colorScheme="teal" size="sm">
          이번 달
        </Button>
        <Button onClick={handleThisYear} colorScheme="teal" size="sm">
          월 별
        </Button>
      </div>
      <Bar options={options} data={data} />
    </div>
  );
};

export default Chart;
