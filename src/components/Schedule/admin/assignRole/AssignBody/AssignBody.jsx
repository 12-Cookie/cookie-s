import * as style from "./AssignBody.style";
import { useFireFetch } from "../../../../../hooks/useFireFetch";

const AssignBody = ({ schedule }) => {
  const fireFetch = useFireFetch();

  const company = fireFetch.getData("company", "id", schedule.companyId)[0];

  return (
    <style.AssignBodyWrap>
      {company
        ? company.role.map((v, i) => {
            return <style.Role key={i}>{v}</style.Role>;
          })
        : null}
    </style.AssignBodyWrap>
  );
};

export default AssignBody;
