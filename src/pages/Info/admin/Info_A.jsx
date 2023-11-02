import * as style from "./Info_A.style";
import { app } from "../../../firebase/firebase";
import { signOut, getAuth } from "firebase/auth";
import {
  Button,
  Flex,
  Heading,
  Spacer,
  Text,
  Tag,
  Center,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../../store/user/useUserStore";
import { useFireFetch } from "../../../hooks/useFireFetch";

const Info_A = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const userStore = useUserStore();

  const fetch = useFireFetch();
  const currentCompanyId = userStore.userData.companyId;
  const companyInfo = fetch.getData("company").find((company) => {
    return company.id === currentCompanyId;
  });

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        useUserStore.persist.clearStorage();
        window.location.reload();
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <style.InfoWrap>
      <Heading as="h2" size="md" mb="2rem">
        회사정보
      </Heading>
      {companyInfo ? (
        <>
          <Flex mb={4}>
            <Heading as="h5" size="sm">
              회사명
            </Heading>
            <Spacer />
            <Text>{companyInfo.name}</Text>
          </Flex>
          <Flex mb={4}>
            <Heading as="h5" size="sm">
              포지션
            </Heading>
            <Spacer />
            <Flex flexWrap="wrap">
              {companyInfo.roles.map((role, index) => (
                <Tag key={index} size="sm" marginLeft="2" marginBottom="2">
                  {role}
                </Tag>
              ))}
            </Flex>
          </Flex>
          <Flex>
            <Heading as="h5" size="sm">
              주소
            </Heading>
            <Spacer />
            <Text>{companyInfo.address}</Text>
          </Flex>
          <Center>
            <Button onClick={handleLogOut}>로그아웃</Button>
          </Center>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </style.InfoWrap>
  );
};

export default Info_A;
