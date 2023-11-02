import * as style from "../../pages/Login/admin/login/Login_A.style";
import { useForm } from "react-hook-form";
import { Heading, Input, Text, Button } from "@chakra-ui/react";

const userEmail = {
  required: "필수 필드입니다.",
};

const userPassword = {
  required: "필수 필드입니다.",
  minLegnth: {
    value: 6,
    message: "최소 6자입니다.",
  },
};

const LoginForm = ({ title, getDataForm, firebaseError }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onBlur" });

  const onSubmit = ({ email, password }) => {
    getDataForm(email, password);
    reset();
  };

  return (
    <>
      <Heading as="h2" size="md" mb="1rem">
        내 일정에 맞게
        <br />
        근무 스케줄 지정
      </Heading>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Input
            type="email"
            placeholder="E-mail"
            {...register("email", userEmail)}
            mt="1rem"
          />
          {errors?.email && (
            <div>
              <Text color="red">{errors?.email?.message}</Text>
            </div>
          )}
        </div>

        <div>
          <Input
            type="password"
            placeholder="Password"
            {...register("password", userPassword)}
            mt="1rem"
          />
          {errors?.password && (
            <Text color="red">{errors?.password?.message}</Text>
          )}
        </div>
        {firebaseError && (
          <Text color="red" mt="1rem">
            {firebaseError}
          </Text>
        )}

        <Button type="submit" w="100%" mt="100px" colorScheme="teal" size="md">
          {title}
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
