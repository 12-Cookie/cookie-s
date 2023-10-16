import * as style from "./Dashboard_S.style";
import { Button } from "@chakra-ui/react";
import { useFireFetch } from "../../../hooks/useFireFetch";

const Dashboard_S = () => {
  const fireFetch = useFireFetch();

  const users = fireFetch.getData("users", "isAdmin", false);

  const handleGetClick = () => {
    console.log(users);
  };

  const handleSetClick = () => {
    fireFetch.postData("users", "1234", {
      id: "1234",
      isAdmin: false,
      name: "유저test",
    });
  };

  return (
    <style.DashboardWrap>
      <h1>Dashboard_S</h1>
      <div style={{ marginBottom: "30px" }}>
        <Button colorScheme="teal" size="md" onClick={handleGetClick}>
          get
        </Button>
      </div>
      <div>
        <Button colorScheme="teal" size="md" onClick={handleSetClick}>
          set
        </Button>
      </div>
      {users.map((v, i) => {
        return <div key={i}>{v.name}</div>;
      })}
    </style.DashboardWrap>
  );
};

export default Dashboard_S;
