import moment from "moment";
import Calendar from "react-calendar";
import styled from "styled-components";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";

const Div = styled.div`
  position: relative;
  .react-calendar {
    width: 100%;
    border: none;
  }
  .react-calendar__tile--now {
    background: white !important;
    color: red;
  }
  .react-calendar__tile--now:hover {
    background: white;
    color: red;
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
    padding-top: 0;
    height: 2.5rem;
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
    top: 70%;
    left: 50%;
    transform: translateX(-50%);
  }
  .dot {
    height: 6px;
    width: 6px;
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
`;

const AddCalendar = ({ onChange, value }) => {
  const initialMark = ["2023-10-02", "2023-10-12", "2023-10-10"];
  const [mark, setMark] = useState(initialMark);
  const tileDisabled = ({ date, view }) => {
    // 오늘 이전의 모든 날짜를 비활성화합니다.
    return date < new Date();
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
