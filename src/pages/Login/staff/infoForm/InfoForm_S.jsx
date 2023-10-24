import { useForm } from "react-hook-form";
import * as style from "./InfoForm_S.style";
import { useFireFetch } from "../../../../hooks/useFireFetch";
import { useNavigate } from "react-router";

const userName = {
  required: "필수 필드입니다.",
};

const userGender = {
  required: "필수 필드입니다.",
};

const userBirthdate = {
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
  const firefetch = useFireFetch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onBlur" });

  const onSubmit = (data) => {
    // firefetch.postData("users", id, data); // id 상태에서 불러오기
    console.log(data);
    reset();
    if (data) {
      navigate("/info/code");
    }
  };

  return (
    <style.InfoFormWrap>
      <h1>필수 정보 입력</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">이름: </label>
          <input
            type="text"
            placeholder="홍길동"
            {...register("name", userName)}
          />
          {errors?.name && (
            <div>
              <span>{errors?.name?.message}</span>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="gender">성별: </label>
          <div>
            <label>
              <input
                type="radio"
                value="남자"
                checked
                {...register("gender", userGender)}
              />
              남자
            </label>
            <label>
              <input
                type="radio"
                value="여자"
                {...register("gender", userGender)}
              />
              여자
            </label>
          </div>
          {errors?.gender && (
            <div>
              <span>{errors?.gender?.message}</span>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="birthdate">생년월일: </label>
          <input
            type="text"
            placeholder="YYYY.MM.DD"
            {...register("birthdate", userBirthdate)}
          />
          {errors?.birthdate && (
            <div>
              <span>{errors?.birthdate?.message}</span>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="address">주소: </label>
          <input
            type="text"
            placeholder="서울시 강남구 역삼동 123-45"
            {...register("address", userAddress)}
          />
          {errors?.address && (
            <div>
              <span>{errors?.address?.message}</span>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="payPerHour">시급: </label>
          <input
            type="number"
            placeholder="9620"
            {...register("payPerHour", userPayPerHour)}
          />
          {errors?.payPerHour && (
            <div>
              <span>{errors?.payPerHour?.message}</span>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="phone">핸드폰 번호: </label>
          <input
            type="text"
            placeholder="010-1234-5678"
            {...register("phone", userPhone)}
          />
          {errors?.phone && (
            <div>
              <span>{errors?.phone?.message}</span>
            </div>
          )}
        </div>

        <button type="submit">입력</button>
      </form>
    </style.InfoFormWrap>
  );
};

export default InfoForm_S;
