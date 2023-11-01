import { Tag, TagLabel } from "@chakra-ui/react";
import { useFireFetch } from "../../../../hooks/useFireFetch";

const Roles = ({ companyId }) => {
  const fireFetch = useFireFetch();
  const company = fireFetch.getData("company", "id", companyId)[0];
  return (
    <>
      {company?.roles.map((v, i) => {
        return (
          <Tag size="md" key={i} mr="1rem" cursor="pointer">
            <TagLabel>{v}</TagLabel>
          </Tag>
        );
      })}
    </>
  );
};

export default Roles;
