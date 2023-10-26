import { useState } from "react";
import { useForm } from "react-hook-form";
import * as style from "./InfoForm_A.style";
import { Button, Heading, Input, Text } from "@chakra-ui/react";
import { useFireFetch } from "../../../../hooks/useFireFetch";
import { useNavigate } from "react-router";
import useCompanyStore from "../../../../store/company/useCompanyStore";

const companyName = {
  required: "필수 필드입니다.",
};

const companyAddress = {
  required: "필수 필드입니다.",
};

const companyRole = {
  required: "필수 필드입니다.",
};

const InfoForm_A = () => {
  const fireFetch = useFireFetch();
  const navigate = useNavigate();
  const [roles, setRoles] = useState([""]);
  const { companyData, setCompanyData } = useCompanyStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onBlur" });

  const onSubmit = async (data) => {
    setRoles([""]);
    reset();
    await setCompanyData({
      ...companyData,
      name: data.name,
      address: data.address,
      roles: data.roles,
    });
    await fireFetch.postData("company", companyData.id, companyData);
    navigate("/dashboard");
  };

  const addRoleField = () => {
    setRoles([...roles, ""]);
  };

  const removeRoleField = (index) => {
    const updatedRoles = [...roles];
    updatedRoles.splice(index, 1);
    setRoles(updatedRoles);
  };

  const handleRoleChange = (index, value) => {
    const updatedRoles = [...roles];
    updatedRoles[index] = value;
    setRoles(updatedRoles);
  };

  return (
    <style.InfoFormWrap>
      <Heading as="h2" size="md" mb="1rem">
        필수 정보 입력
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <style.InputWrap>
          <Text htmlFor="name" as="b">
            기업명
          </Text>
          <Input
            type="text"
            placeholder="대한주식회사"
            {...register("name", companyName)}
            width="80.5%"
            ml="1rem"
          />
          {errors?.name && (
            <div>
              <Text color="red">{errors?.name?.message}</Text>
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
            {...register("address", companyAddress)}
            width="85%"
            ml="1rem"
          />
          {errors?.address && (
            <div>
              <Text color="red">{errors?.address?.message}</Text>
            </div>
          )}
        </style.InputWrap>

        {roles.map((role, index) => (
          <style.InputWrap key={index}>
            <Text htmlFor={`roles[${index}]`} as="b">
              역할
            </Text>
            <Input
              type="text"
              placeholder="팀장"
              {...register(`roles[${index}]`, companyRole)}
              value={role}
              onChange={(e) => handleRoleChange(index, e.target.value)}
              width="73%"
              ml="1rem"
            />
            {errors[`roles[${index}]`] && (
              <div>
                <Text color="red">{errors[`roles[${index}]`]?.message}</Text>
              </div>
            )}
            <Button
              type="button"
              onClick={() => removeRoleField(index)}
              colorScheme="red"
              size="xs"
              variant="ghost"
              mb="0.3rem"
              ml="0.1rem"
            >
              제거
            </Button>
          </style.InputWrap>
        ))}

        <Button
          type="button"
          onClick={addRoleField}
          variant="ghost"
          mt="0.5rem"
          left="-0.7rem"
        >
          <svg
            width="24"
            height="24"
            xmlns="http://www.w3.org/2000/svg"
            fill-rule="evenodd"
            clip-rule="evenodd"
          >
            <path d="M11.5 0c6.347 0 11.5 5.153 11.5 11.5s-5.153 11.5-11.5 11.5-11.5-5.153-11.5-11.5 5.153-11.5 11.5-11.5zm0 1c5.795 0 10.5 4.705 10.5 10.5s-4.705 10.5-10.5 10.5-10.5-4.705-10.5-10.5 4.705-10.5 10.5-10.5zm.5 10h6v1h-6v6h-1v-6h-6v-1h6v-6h1v6z" />
          </svg>
        </Button>

        <Button type="submit" w="100%" mt="50px" colorScheme="teal" size="md">
          입력
        </Button>
      </form>
    </style.InfoFormWrap>
  );
};

export default InfoForm_A;
