import styled from "styled-components";

export const BottomNavWrap = styled.div`
  display: flex;
`;

export const BottomNavLink = styled.div`
  user-select: none;
  cursor: pointer;
  width: calc(var(--main-width) / 5);
  height: calc(var(--main-width) / 5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
  border-top: 1px solid #ccc;
`;

export const Icon = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
