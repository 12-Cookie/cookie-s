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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const Chart = ({ matchingData }) => {
  const today = new Date();
  const currentMonth = today.getMonth() + 1;
  const currentYear = today.getFullYear();
  const currentDate = today.getDate();
  const [chartPay, setChartPay] = useState([]);
  const [chartDate, setChartDate] = useState([]);
  const [chartLabel, setChartLabel] = useState("지난 7일");

  useEffect(() => {
    handleLast7days();
    console.log(matchingData);
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
    setChartPay(
      last7daysData(matchingData).map(
        (data) => `${data.date.year}-${data.date.month}-${data.date.day}`,
      ),
    );
    setChartLabel("지난 7일 페이");
    calculatePay(last7daysData(matchingData));
  };

  const handleThisMonth = () => {
    setChartPay(
      thisMonthData(matchingData).map(
        (data) => `${data.date.year}-${data.date.month}-${data.date.day}`,
      ),
    );
    setChartLabel("이번 달 페이");
    calculatePay(thisMonthData(matchingData));
  };

  const handleThisYear = () => {
    setChartPay(
      thisYearData(matchingData).map(
        (data) => `${data.date.year}-${data.date.month}-${data.date.day}`,
      ),
    );
    setChartLabel("월 별 페이");
    calculatePay(thisYearData(matchingData));
  };

  const calculatePay = (data) => {
    const OVERTIME_HOURS = 9;
    const USER_PAY = 10000;
    const newArr = data.map((item) => {
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
    setChartDate(newArr);
  };

  const labels = chartPay;
  const datas = chartDate;

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
