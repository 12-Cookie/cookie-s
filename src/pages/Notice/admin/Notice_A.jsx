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
} from "@chakra-ui/react";

const Notice_S = () => {
  const navigate = useNavigate();
  const fetch = useFireFetch();
  const notices = fetch.getData("notice");
  console.log(notices);

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
                    {notice.title}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h3>
              <AccordionPanel pb={4}>{notice.content}</AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </style.NoticeWrap>
  );
};

export default Notice_S;
