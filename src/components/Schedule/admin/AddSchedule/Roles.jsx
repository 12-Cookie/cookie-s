import { Tag, TagCloseButton, TagLabel } from "@chakra-ui/react";
import { useFireFetch } from "../../../../hooks/useFireFetch";

const Roles = ({ user }) => {
  const fireFetch = useFireFetch();
  const company = fireFetch.getData("company", "id", user?.companyId)[0];
  return (
    <>
      {company?.role.map((v, i) => {
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
