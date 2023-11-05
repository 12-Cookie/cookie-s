import * as style from "./Notice_A.style";
import { useFireFetch } from "../../../hooks/useFireFetch";
import { useNavigate } from "react-router-dom";
import {
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Button,
  Flex,
  Spacer,
  Text,
} from "@chakra-ui/react";
import useUserStore from "../../../store/user/useUserStore";

const formatDate = (date) => {
  return `${date.year}-${date.month}-${date.day}`;
};

const Notice_A = () => {
  const navigate = useNavigate();
  const fetch = useFireFetch();
  const userStore = useUserStore();
  const currentCompanyId = userStore.userData.companyId;
  const notices = fetch.getData("notice").filter((notice) => {
    return notice.companyId === currentCompanyId;
  });

  return (
    <style.NoticeWrap>
      <Flex>
        <Heading as="h2" size="md" mb="1rem">
          공지사항
        </Heading>
        <Spacer />
        <Button
          size="sm"
          mb="10"
          onClick={() => {
            navigate("/notice/add");
          }}
        >
          작성
        </Button>
      </Flex>
      <Accordion allowToggle>
        {notices.map((notice, id) => {
          return (
            <AccordionItem key={id}>
              <h3>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    <Flex>
                      <Text>{notice.title}</Text>
                      <Spacer />
                      <Text size="xs">{formatDate(notice.date)}</Text>
                    </Flex>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h3>
              <AccordionPanel pb={4}>
                <Text>{notice.content}</Text>
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </style.NoticeWrap>
  );
};

export default Notice_A;
