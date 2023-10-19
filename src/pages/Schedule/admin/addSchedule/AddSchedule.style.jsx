import styled from "styled-components";

export const AddScheduleWrap = styled.div``;

export const Form = styled.form`
  font-weight: 700;
  font-size: 1rem;
  margin-top: 0.8rem;
  > div {
    display: flex;
    justify-content: start;
    margin-bottom: 1rem;
    &:nth-child(2) {
      margin: 0 0 0.5rem 0;
    }
    > div:first-child {
      min-width: 15%;
    }
    > div:nth-child(2) {
      display: flex;
      align-items: center;
    }
  }
  input {
    border: 1px solid #f1f3f5;
    padding: 1px;
  }
  .react-calendar__tile {
    padding-top: 0;
    height: 2.5rem;
  }
  .dot-container {
    top: 70% !important;
  }
  .dot {
    height: 6px;
    width: 6px;
  }
`;

export const TimeInput = styled.div`
  display: flex;
  gap: 20px;
`;
