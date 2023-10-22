import { useState } from "react";
import * as style from "./AddNotice.style";
import { Heading, Flex, Input, Textarea, Button } from "@chakra-ui/react";
import { db } from "../../../../firebase/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

const AddNotice = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const noticeCollectionRef = collection(db, "notice");

  const onSubmit = async (event) => {
    event.preventDefault();
    const newNotice = {
      // companyId: "YOUR_COMPANY_ID",
      title: title,
      content: content,
      timestamp: Timestamp.now(),
      // id: "UNIQUE_ID"
    };
    try {
      const docRef = await addDoc(noticeCollectionRef, newNotice);
      console.log("Document written with ID: ", docRef.id);
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error adding document: ", error);
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
