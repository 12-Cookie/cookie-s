import { useState } from "react";
import * as style from "./AddNotice.style";
import { Heading, Flex, Input, Textarea, Button } from "@chakra-ui/react";
import { collection, addDoc, serverTimestamp, doc } from "firebase/firestore";
import { useFireFetch } from "../../../../hooks/useFireFetch";
import { useNavigate } from "react-router-dom";
import useUserStore from "../../../../store/user/useUserStore";

const AddNotice = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const companyId = useUserStore((state) => state.userData.companyId);
  const fetch = useFireFetch();
  const date = new Date();

  const onSubmit = async (event) => {
    event.preventDefault();

    const newNotice = {
      companyId: companyId,
      title: title,
      content: content,
      timestamp: serverTimestamp(),
      date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
      },
    };

    try {
      await fetch.addData("notice", newNotice);
      setTitle("");
      setContent("");
      navigate("/notice");
    } catch (error) {
      console.error("Failed to add notice:", error);
    }
  };
  return (
    <style.AddNoticeWrap>
      <Heading as="h2" size="md" mb="1rem">
        공지사항 작성
      </Heading>
      <form onSubmit={onSubmit}>
        <Flex align="center" mb="1rem">
          <Heading as="h3" size="sm" w="50px">
            제목
          </Heading>
          <Input
            size="sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></Input>
        </Flex>
        <Textarea
          placeholder="공지내용을 입력하세요"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button type="submit">작성</Button>
      </form>
    </style.AddNoticeWrap>
  );
};

export default AddNotice;
