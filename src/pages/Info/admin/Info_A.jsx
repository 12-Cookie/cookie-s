import * as style from "./Info_A.style";
import { Heading, Flex, Spacer, Text } from "@chakra-ui/react";
import { useFireFetch } from "../../../hooks/useFireFetch";

const Info_A = () => {
  const fetch = useFireFetch();
  const company = fetch.getData("company");
  console.log(company);
  return (
    <style.InfoWrap>
      <Heading as="h2" size="md" mb="1rem">
        회사 정보
      </Heading>
      <Flex align="center" mb="1rem">
        <Heading as="h3" size="xs" align="center">
          회사명
        </Heading>
        <Spacer />
        <Text fontSize="sm">쿠키</Text>
      </Flex>
    </style.InfoWrap>
  );
};

export default Info_A;
