import * as style from "./Info_S.style";
import { app } from "../../../firebase/firebase";
import { signOut, getAuth } from "firebase/auth";
import { Button, Center, Flex, Heading, Spacer, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../../store/user/useUserStore";

const Info_S = () => {
  const auth = getAuth(app);
  const navigate = useNavigate();
  const userStore = useUserStore();

  const myInfo = userStore.userData;

  const handleLogOut = () => {
    signOut(auth)
      .then(() => {
        window.location.reload();
        useUserStore.persist.clearStorage();
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <style.InfoWrap>
      <Heading as="h2" size="md" mb="2rem">
        내 정보
      </Heading>
      {myInfo ? (
        <>
          <Flex mb={4}>
            <Heading as="h5" size="sm">
              회사명
            </Heading>
            <Spacer />
            <Text>{myInfo.name}</Text>
          </Flex>
          <Flex mb={4}>
            <Heading as="h5" size="sm">
              주소
            </Heading>
            <Spacer />
            <Text>{myInfo.address}</Text>
          </Flex>
          <Flex mb={4}>
            <Heading as="h5" size="sm">
              생년월일
            </Heading>
            <Spacer />
            <Text>{myInfo.birthDate}</Text>
          </Flex>
          <Flex mb={4}>
            <Heading as="h5" size="sm">
              시급
            </Heading>
            <Spacer />
            <Text>{myInfo.payPerHour}</Text>
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

export default Info_S;
