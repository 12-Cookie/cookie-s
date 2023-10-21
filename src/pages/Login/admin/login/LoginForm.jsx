import * as style from "./Login_A.style";
import { useForm } from "react-hook-form";

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
    <style.loginWrap>
      <h1>내 근무에 맞게</h1>
      <h1>근무 스케줄 지정</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input
            type="email"
            placeholder="E-mail"
            {...register("email", userEmail)}
          />
          {errors?.email && (
            <div>
              <span>{errors?.email?.message}</span>
            </div>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            {...register("password", userPassword)}
          />
          {errors?.password && <span>{errors?.password?.message}</span>}
        </div>

        <button type="submit">{title}</button>
        {firebaseError && <span>{firebaseError}</span>}
      </form>
    </style.loginWrap>
  );
};

export default LoginForm;
