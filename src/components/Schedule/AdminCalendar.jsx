import moment from "moment";
import Calendar from "react-calendar";
import styled from "styled-components";
import "react-calendar/dist/Calendar.css";

const Div = styled.div`
  position: relative;
  .react-calendar__tile--now {
    background-color: white;
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
    height: 9px;
    width: 9px;
    background-color: #f87171;
    border-radius: 50%;
    display: flex;
  }
`;

const AdminCalendar = ({ onChange, value, mark }) => {
  return (
    <Div>
      <Calendar
        onChange={onChange}
        formatDay={(locale, date) => moment(date).format("DD")}
        value={value}
        navigationLabel={null}
        showNeighboringMonth={false}
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

export default AdminCalendar;
