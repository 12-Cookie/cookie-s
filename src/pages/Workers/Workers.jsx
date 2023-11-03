import { useEffect, useState } from "react";
import { useFireFetch } from "../../hooks/useFireFetch";
import useUserStore from "../../store/user/useUserStore";
import * as style from "./Workers.style";
import { Heading, Button, Flex, Tag, TagLabel, Text } from "@chakra-ui/react";
import { calculateLegalAge } from "../../utils/legalAge";

const Workers = () => {
  const userStore = useUserStore();

  const fetch = useFireFetch();
  const [clickedStaff, setClickedStaff] = useState(null);
  const userData = fetch.getData(
    "users",
    "companyId",
    userStore.userData.companyId,
  );

  const staffData = userData.filter((user) => user.isAdmin === false);

  const handleTagClick = (userData) => {
    setClickedStaff(userData);
    console.log("clicked : ", userData);
  };

  return (
    <>
      <Heading as="h2" size="md" mb="1rem">
        직원 관리
      </Heading>
      <style.WorkersWrap>
        {staffData.map((user) => (
          <li key={user.id} onClick={() => handleTagClick(user)}>
            <Tag
              variant="solid"
              colorScheme={user.gender === "male" ? "teal" : "pink"}
            >
              <TagLabel>{user.name}</TagLabel>
            </Tag>
          </li>
        ))}
      </style.WorkersWrap>
      {clickedStaff && (
        <div>
          <Heading as="h3" size="sm" mb="1rem">
            직원 정보
          </Heading>
          <div>
            <Flex mb="1rem">
              <Text as="b" mr="10px">
                이름
              </Text>
              <Text> {clickedStaff.name}</Text>
            </Flex>
            <Flex mb="1rem">
              <Text as="b" mr="10px">
                성별
              </Text>
              <Text> {clickedStaff.gender}</Text>
            </Flex>
            <Flex mb="1rem">
              <Text as="b" mr="10px">
                나이
              </Text>
              <Text>{calculateLegalAge(clickedStaff.birthDate)}</Text>
            </Flex>

            <Flex mb="1rem">
              <Text as="b" mr="10px">
                주소
              </Text>
              <Text> {clickedStaff.address}</Text>
            </Flex>
            <Flex mb="1rem">
              <Text as="b" mr="10px">
                시급
              </Text>
              <Text> {clickedStaff.payPerHour}</Text>
            </Flex>
          </div>
        </div>
      )}
    </>
  );
};

export default Workers;
