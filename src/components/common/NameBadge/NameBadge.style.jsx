import styled from "styled-components";

export const Badge = styled.div`
  cursor: pointer;

  display: inline-flex;
  align-items: center;

  padding: 0.1rem 0.5rem;

  border: 1px solid rgb(113, 113, 255);
  border-radius: 0.3rem;

  color: rgb(113, 113, 255);

  font-size: 0.8rem;

  &:hover {
    background-color: rgb(113, 113, 255);
    color: #fff;
  }
`;
