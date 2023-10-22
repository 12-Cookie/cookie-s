import styled from "styled-components";

export const AssignBodyWrap = styled.div``;

export const Role = styled.div`
  border-bottom: 2px solid #eee;

  position: relative;

  font-weight: bold;
  padding: 1rem 0;

  display: flex;
  justify-content: space-between;

  & > span:first-child {
    width: 20%;
  }

  & > span.tags {
    margin-left: 1rem;
  }

  & > span.empty {
    flex-grow: 1;
  }

  & > span:last-child {
    display: flex;
    align-items: center;

    margin-right: 1rem;

    font-size: 0.8rem;
    font-weight: normal;
    color: #999;

    text-decoration: underline;

    cursor: pointer;
  }
`;
