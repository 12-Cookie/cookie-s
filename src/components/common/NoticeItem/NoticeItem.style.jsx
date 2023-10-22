import styled from "styled-components";

export const NoticeItem = styled.div`
  width: 100%;
  height: 48px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 12px;
  padding: 0 15px;
`;

export const NoticeDate = styled.div`
  min-width: 35px;
`;

export const NoticeContent = styled.div`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
