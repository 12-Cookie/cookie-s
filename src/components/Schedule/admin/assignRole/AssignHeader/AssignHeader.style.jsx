import styled from "styled-components";

export const AssignHeaderWrap = styled.div`
  border: 2px solid #eee;
  border-radius: 0.5rem;

  padding: 0.5rem;

  font-size: 0.7rem;
  font-weight: bold;
`;

export const AssignHeaderTop = styled.div`
  margin: 0.2rem 0;
`;

export const AssignHeaderBottom = styled(AssignHeaderTop)`
  display: flex;

  & > span {
    width: 50%;
  }
`;
