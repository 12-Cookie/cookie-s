import { useState } from "react";
import { useForm } from "react-hook-form";
import * as style from "./SubmitCode.style";
import combineArrayToNumber from "../../../../utils/combineArrayToNumber";
import {
  collection,
  query,
  getFirestore,
  getDocs,
  where,
} from "firebase/firestore";
import { app } from "./../../../../firebase/firebase";
import { useNavigate } from "react-router-dom";

const companyCode = {
  required: "필수 필드입니다.",
};

const db = getFirestore(app);

const SubmitCode = () => {
  const [pin, setPin] = useState(["", "", "", "", "", ""]); // 초기 상태: 4자리 빈 PIN
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
      const pinNum = combineArrayToNumber(data.code);

      const companiesRef = collection(db, "company");
      const _query = query(companiesRef, where("code", "==", pinNum));
      const querySnapshot = getDocs(_query);
      querySnapshot.map((doc) => {
        console.log(doc.data);
      });

      if (querySnapshot) {
        navigate("/dashboard");
      } else {
        console.log("일치하는 회사 코드를 찾을 수 없습니다.");
      }
    }
  };

  const handleChange = (index, value) => {
    const newPin = [...pin];
    newPin[index] = value;

    if (/^\d+$/.test(value) || value === "") {
      const newPin = [...pin];
      newPin[index] = value;

      setPin(newPin);
    }
  };

  return (
    <style.SubmitCodeWrap>
      <h1>기업 코드 등록</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {pin.map((digit, index) => (
            <div key={index}>
              <label htmlFor={`code[${index}]`}>PIN{index + 1}: </label>
              <input
                type="text"
                {...register(`code[${index}]`, companyCode)}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                maxLength="1"
              />
              <br />
              {errors[`code[${index}]`] && (
                <div>
                  <span>{errors[`code[${index}]`]?.message}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <button type="submit">입력</button>
      </form>
    </style.SubmitCodeWrap>
  );
};

export default SubmitCode;
