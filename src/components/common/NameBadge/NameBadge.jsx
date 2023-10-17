import * as style from "./NameBadge.style";

const NameBadge = ({ text, x }) => {
  return (
    <style.Badge $x={x}>
      <span>{text}</span>
      {x ? (
        <span
          style={{
            marginLeft: "0.3rem",
            fontSize: "0.6rem",
          }}
        >
          X
        </span>
      ) : null}
    </style.Badge>
  );
};

export default NameBadge;
