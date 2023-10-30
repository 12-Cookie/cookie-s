import moment from "moment";
import Calendar from "react-calendar";
import styled from "styled-components";
import "react-calendar/dist/Calendar.css";
import { useEffect, useState } from "react";
import { useFireFetch } from "../../../../hooks/useFireFetch";

const Div = styled.div`
  position: relative;
  .react-calendar {
    width: 100%;
    border: none;
  }
  .react-calendar__tile--now {
    background: grey;
    color: white;
  }
  .react-calendar__tile--now:hover {
    background: #f0f0f0;
    color: white;
  }
  .react-calendar__tile--active {
    background-color: white;
  }
  .react-calendar__tile--active:hover {
    background-color: white;
  }
  .react-calendar__tile {
    position: relative;
    height: 3rem;
  }
  .react-calendar__tile--active abbr {
    background: #f87171 !important;
    background-color: rgb(49, 130, 206) !important;
    padding: 15%;
    font-size: 1rem;
    border-radius: 50% !important;
  }
  .dot-container {
    position: absolute;
    top: 80%;
    left: 50%;
    transform: translateX(-50%);
  }
  .dot {
    height: 7px;
    width: 7px;
    background-color: red;
    border-radius: 50%;
    display: flex;
  }
  .react-calendar__navigation {
    margin-bottom: 0;
  }
  .react-calendar__month-view__days__day--neighboringMonth {
    color: #f0f0f0;
  }
  .react-calendar__tile:disabled {
    opacity: 0.5;
  }
`;

const AddCalendar = ({ onChange, value, companyId }) => {
  const [mark, setMark] = useState([]);
  const [scheduleLists, setScheduleLists] = useState([]);
  const fireFetch = useFireFetch();
  const schedules = fireFetch.getData("schedule", "companyId", companyId);
  useEffect(() => {
    if (schedules[0]) {
      setScheduleLists([...schedules]);
      const date = schedules.map((obj) => {
        return `${obj.date.year}-${obj.date.month
          .toString()
          .padStart(2, "0")}-${obj.date.day.toString().padStart(2, "0")}`;
      });
      setMark(date);
    }
  }, [schedules]);
  const tileDisabled = ({ date }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const twoDaysAgo = new Date();
    twoDaysAgo.setDate(today.getDate());
    twoDaysAgo.setHours(0, 0, 0, 0);
    return date < twoDaysAgo;
  };
  return (
    <Div>
      <Calendar
        onChange={onChange}
        formatDay={(locale, date) => moment(date).format("DD")}
        value={value}
        navigationLabel={null}
        showNeighboringMonth={true}
        tileDisabled={tileDisabled}
        tileContent={({ date }) => {
          let html = [];
          if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
            html.push(<div key={date} className="dot"></div>);
          }
          return (
            <>
              <div className="dot-container">{html}</div>
            </>
          );
        }}
      />
    </Div>
  );
};

export default AddCalendar;
