import { useState } from "react";
import * as style from "./AddNotice.style";
import { Heading, Flex, Input, Textarea, Button } from "@chakra-ui/react";
import { db } from "../../../../firebase/firebase";
import { collection, addDoc, serverTimestamp, doc } from "firebase/firestore";
import { useFireFetch } from "../../../../hooks/useFireFetch";
import { useNavigate } from "react-router-dom";

const AddNotice = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const fetch = useFireFetch();
  // const user = fetch.getData("users", "id", "2qDwPH70ot7fSw7ixr1Z")[0];
  // const company = user?.companyId;
  const date = new Date();

  const onSubmit = async (event) => {
    event.preventDefault();

    const newNotice = {
      // companyId: company,
      title: title,
      content: content,
      timestamp: serverTimestamp(),
      // id: doc.id,
      date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
      },
    };

    // const docRef = await addDoc(noticeCollectionRef, newNotice);
    await fetch.addData("notice", newNotice);
    setTitle("");
    setContent("");
    navigate("/notice");
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
