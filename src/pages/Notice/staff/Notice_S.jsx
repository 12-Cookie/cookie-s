import * as style from "./Notice_S.style";
import { useFireFetch } from "../../../hooks/useFireFetch";
import {
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Flex,
  Spacer,
  Text,
} from "@chakra-ui/react";
import useUserStore from "../../../store/user/useUserStore";

const formatDate = (date) => {
  return `${date.year}-${date.month}-${date.day}`;
};

const Notice_S = () => {
  const fetch = useFireFetch();
  const userStore = useUserStore();
  const currentCompanyId = userStore.userData.companyId;
  const notices = fetch.getData("notice").filter((notice) => {
    return notice.companyId === currentCompanyId;
  });
  return (
    <style.NoticeWrap>
      <Heading as="h2" size="md" mb="1rem">
        공지사항
      </Heading>
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

export default Notice_S;
