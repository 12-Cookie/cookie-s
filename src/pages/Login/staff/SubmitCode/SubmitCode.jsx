import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as style from "./SubmitCode.style";
import {
  collection,
  query,
  getFirestore,
  getDocs,
  where,
} from "firebase/firestore";
import { app } from "./../../../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import {
  Heading,
  PinInput,
  PinInputField,
  Button,
  FormControl,
} from "@chakra-ui/react";
import { useFireFetch } from "../../../../hooks/useFireFetch";
import useUserStore from "../../../../store/user/useUserStore";

const db = getFirestore(app);

const SubmitCode = () => {
  // const [pin, setPin] = useState(["", "", "", "", "", ""]); // 초기 상태: 4자리 빈 PIN
  const navigate = useNavigate();
  const { userData, setUserData } = useUserStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onBlur" });

  const onSubmit = (data) => {
    // firefetch.postData("users", id, data); // id 상태에서 불러오기
    reset();
    const get = async () => {
      if (data) {
        const pinNum = parseInt(
          `${data.pin1}${data.pin2}${data.pin3}${data.pin4}${data.pin5}${data.pin6}`,
          10,
        );
        const companiesRef = collection(db, "company");
        const _query = query(companiesRef, where("code", "==", pinNum));
        const querySnapshot = await getDocs(_query);

        if (querySnapshot.empty) {
          alert("일치하는 회사 코드를 찾을 수 없습니다.");
        } else {
          const companyId = querySnapshot.docs[0].data().id;
          setUserData({ ...userData, companyId });
          navigate("/dashboard");
        }
      }
    };
    get();
  };

  return (
    <style.SubmitCodeWrap>
      <Heading as="h2" size="md" mb="1rem">
        필수 정보 입력
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl display="flex" justifyContent="center" mt="6rem">
          <Controller
            name="pin1"
            control={control}
            render={({ field }) => (
              <PinInput size="lg">
                <PinInputField {...field} />
              </PinInput>
            )}
          />
          <Controller
            name="pin2"
            control={control}
            render={({ field }) => (
              <PinInput size="lg">
                <PinInputField {...field} ml="0.5rem" />
              </PinInput>
            )}
          />
          <Controller
            name="pin3"
            control={control}
            render={({ field }) => (
              <PinInput size="lg">
                <PinInputField {...field} ml="0.5rem" />
              </PinInput>
            )}
          />
          <Controller
            name="pin4"
            control={control}
            render={({ field }) => (
              <PinInput size="lg">
                <PinInputField {...field} ml="0.5rem" />
              </PinInput>
            )}
          />
          <Controller
            name="pin5"
            control={control}
            render={({ field }) => (
              <PinInput size="lg">
                <PinInputField {...field} ml="0.5rem" />
              </PinInput>
            )}
          />
          <Controller
            name="pin6"
            control={control}
            render={({ field }) => (
              <PinInput size="lg">
                <PinInputField {...field} ml="0.5rem" />
              </PinInput>
            )}
          />
        </FormControl>

        <Button type="submit" w="100%" mt="100px" colorScheme="teal" size="md">
          입력
        </Button>
      </form>
    </style.SubmitCodeWrap>
  );
};

export default SubmitCode;
