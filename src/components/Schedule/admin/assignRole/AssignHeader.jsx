import * as style from "./AssignHeader.style";

const AssignHeader = () => {
  return (
    <style.AssignHeaderWrap>
      <style.AssignHeaderTop>2023.10.10(수)</style.AssignHeaderTop>
      <style.AssignHeaderBottom>
        <span>오전 10:00</span>
        <span>오후 18:00</span>
      </style.AssignHeaderBottom>
    </style.AssignHeaderWrap>
  );
};

export default AssignHeader;
