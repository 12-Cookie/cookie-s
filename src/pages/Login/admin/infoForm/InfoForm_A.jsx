import { useState } from "react";
import { useForm } from "react-hook-form";
import * as style from "./InfoForm_A.style";
import { useNavigate } from "react-router";

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
  const [roles, setRoles] = useState([""]);
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
    setRoles([""]);
    reset();
    if (data) {
      navigate("/info/code");
    }
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
      <h1>필수 정보 입력</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">기업명: </label>
          <input
            type="text"
            placeholder="대한주식회사"
            {...register("name", companyName)}
          />
          {errors?.name && (
            <div>
              <span>{errors?.name?.message}</span>
            </div>
          )}
        </div>

        <div>
          <label htmlFor="address">주소: </label>
          <input
            type="text"
            placeholder="서울시 강남구 역삼동 123-45"
            {...register("address", companyAddress)}
          />
          {errors?.address && (
            <div>
              <span>{errors?.address?.message}</span>
            </div>
          )}
        </div>

        {roles.map((role, index) => (
          <div key={index}>
            <label htmlFor={`role[${index}]`}>역할: </label>
            <input
              type="text"
              placeholder="팀장"
              {...register(`role[${index}]`, companyRole)}
              value={role}
              onChange={(e) => handleRoleChange(index, e.target.value)}
            />
            {errors[`role[${index}]`] && (
              <div>
                <span>{errors[`role[${index}]`]?.message}</span>
              </div>
            )}
            <button type="button" onClick={() => removeRoleField(index)}>
              제거
            </button>
          </div>
        ))}

        <button type="button" onClick={addRoleField}>
          추가
        </button>

        <button type="submit">입력</button>
      </form>
    </style.InfoFormWrap>
  );
};

export default InfoForm_A;
