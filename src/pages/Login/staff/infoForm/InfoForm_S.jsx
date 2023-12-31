import { set, useForm } from "react-hook-form";
import * as style from "./InfoForm_S.style";
import { useFireFetch } from "../../../../hooks/useFireFetch";
import { useNavigate } from "react-router";
import {
  Heading,
  Text,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Button,
} from "@chakra-ui/react";
import useUserStore from "../../../../store/user/useUserStore";

const userName = {
  required: "필수 필드입니다.",
};

const userGender = {
  required: "필수 필드입니다.",
};

const userBirthDate = {
  required: "필수 필드입니다.",
};

const userAddress = {
  required: "필수 필드입니다.",
};

const userPayPerHour = {
  required: "필수 필드입니다.",
};

const userPhone = {
  required: "필수 필드입니다.",
};

const InfoForm_S = () => {
  const fireFetch = useFireFetch();
  const navigate = useNavigate();
  const { userData, setUserData } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onBlur" });

  const onSubmit = async (data) => {
    reset();

    const updatedUserData = {
      ...userData,
      name: data.name,
      phone: data.phone,
      gender: data.gender,
      payPerHour: data.payPerHour,
      birthDate: data.birthDate,
      address: data.address,
    };
    await setUserData(updatedUserData);
    await fireFetch.post("users", userData.id, updatedUserData);
    navigate("/info/code");
  };

  return (
    <style.InfoFormWrap>
      <Heading as="h2" size="md" mb="1rem">
        필수 정보 입력
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <style.InputWrap>
          <Text htmlFor="name" as="b">
            이름
          </Text>
          <Input
            type="text"
            placeholder="홍길동"
            {...register("name", userName)}
            width="85%"
            ml="1rem"
          />
          {errors?.name && (
            <div>
              <Text color="red">{errors?.name?.message}</Text>
            </div>
          )}
        </style.InputWrap>

        <style.InputWrap>
          <Text htmlFor="gender" as="b">
            성별
          </Text>
          <div>
            <RadioGroup mt="0.5rem">
              <Stack direction="row">
                <Radio value="남자" {...register("gender", userGender)}>
                  남자
                </Radio>
                <Radio
                  type="radio"
                  value="여자"
                  {...register("gender", userGender)}
                >
                  여자
                </Radio>
              </Stack>
            </RadioGroup>
          </div>
          {errors?.gender && (
            <div>
              <Text color="red">{errors?.gender?.message}</Text>
            </div>
          )}
        </style.InputWrap>

        <style.InputWrap>
          <Text htmlFor="birthDate" as="b">
            생년월일
          </Text>
          <Input
            type="text"
            placeholder="YYYY.MM.DD"
            {...register("birthDate", userBirthDate)}
            width="76.3%"
            ml="1rem"
          />
          {errors?.birthDate && (
            <div>
              <Text color="red">{errors?.birthDate?.message}</Text>
            </div>
          )}
        </style.InputWrap>

        <style.InputWrap>
          <Text htmlFor="address" as="b">
            주소
          </Text>
          <Input
            type="text"
            placeholder="서울시 강남구 역삼동 123-45"
            {...register("address", userAddress)}
            width="85%"
            ml="1rem"
          />
          {errors?.address && (
            <div>
              <Text color="red">{errors?.address?.message}</Text>
            </div>
          )}
        </style.InputWrap>

        <style.InputWrap>
          <Text htmlFor="payPerHour" as="b">
            시급
          </Text>
          <Input
            type="number"
            placeholder="9620"
            {...register("payPerHour", userPayPerHour)}
            width="85%"
            ml="1rem"
          />
          {errors?.payPerHour && (
            <div>
              <Text color="red">{errors?.payPerHour?.message}</Text>
            </div>
          )}
        </style.InputWrap>

        <style.InputWrap>
          <Text htmlFor="phone" as="b">
            핸드폰 번호
          </Text>
          <Input
            type="text"
            placeholder="010-1234-5678"
            {...register("phone", userPhone)}
            width="70.8%"
            ml="1rem"
          />
          {errors?.phone && (
            <div>
              <Text color="red">{errors?.phone?.message}</Text>
            </div>
          )}
        </style.InputWrap>

        <Button type="submit" w="100%" mt="50px" colorScheme="teal" size="md">
          입력
        </Button>
      </form>
    </style.InfoFormWrap>
  );
};

export default InfoForm_S;
