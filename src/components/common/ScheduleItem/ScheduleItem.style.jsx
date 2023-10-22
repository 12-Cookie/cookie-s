import styled from "styled-components";

export const ScheduleItemWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ScheduleItem = styled.div`
  width: 100%;
  height: 100px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 18px 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const ScheduleInfo = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
`;

export const ScheduleDate = styled.div`
  display: flex;
  font-weight: bold;
  gap: 3px;
  min-width: 80px;
`;
export const ScheduleDay = styled.div``;

export const ScheduleTime = styled.span`
  font-weight: normal;
`;

export const ScheduleStatus = styled.div`
  margin-left: auto;
`;

export const ScheduleUtil = styled.div`
  margin-left: auto;
  display: flex;
  gap: 10px;
`;
