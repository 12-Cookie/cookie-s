import {
  collection,
  query,
  getFirestore,
  getDocs,
  where,
  doc,
  setDoc,
} from "firebase/firestore";
import { app } from "../firebase/firebase";
import { useEffect, useState } from "react";

const db = getFirestore(app);

export const useFireFetch = () => {
  const [data, setData] = useState([]);

  const [bookedShifts, setBookedShifts] = useState([]);
  const [bookingShifts, setBookingShifts] = useState([]);
  const [company, setCompany] = useState([]);
  const [notice, setNotice] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [users, setUsers] = useState([]);

  const getData = (initialCollection, key = null, value = null) => {
    useEffect(() => {
      const get = async () => {
        try {
          if (key) {
            const Ref = collection(db, initialCollection);
            const q = query(Ref, where(key, "==", value));
            const querySnapshot = await getDocs(q);
            const userData = [];

            querySnapshot.forEach((doc) => {
              userData.push(doc.data());
            });
            if (initialCollection === "bookedShifts") setBookedShifts(userData);
            else if (initialCollection === "bookingShifts")
              setBookingShifts(userData);
            else if (initialCollection === "company") setCompany(userData);
            else if (initialCollection === "notice") setNotice(userData);
            else if (initialCollection === "schedule") setSchedule(userData);
            else if (initialCollection === "users") setUsers(userData);
          } else {
            const Ref = collection(db, initialCollection);
            const querySnapshot = await getDocs(Ref);
            const userData = [];

            querySnapshot.forEach((doc) => {
              userData.push(doc.data());
            });

            if (initialCollection === "bookedShifts") setBookedShifts(userData);
            else if (initialCollection === "bookingShifts")
              setBookingShifts(userData);
            else if (initialCollection === "company") setCompany(userData);
            else if (initialCollection === "notice") setNotice(userData);
            else if (initialCollection === "schedule") setSchedule(userData);
            else if (initialCollection === "users") setUsers(userData);
          }
        } catch (error) {
          console.error(error);
        }
      };
      get();
    }, [initialCollection]);

    if (initialCollection === "bookedShifts") return bookedShifts;
    else if (initialCollection === "bookingShifts") return bookingShifts;
    else if (initialCollection === "company") return company;
    else if (initialCollection === "notice") return notice;
    else if (initialCollection === "schedule") return schedule;
    else if (initialCollection === "users") return users;
  };

  const postData = (initialCollection, id, data) => {
    const set = async () => {
      try {
        await setDoc(doc(db, initialCollection, id), data);

        if (initialCollection === "bookedShifts")
          setBookedShifts((prev) => [data, ...prev]);
        else if (initialCollection === "bookingShifts")
          setBookingShifts((prev) => [data, ...prev]);
        else if (initialCollection === "company")
          setCompany((prev) => [data, ...prev]);
        else if (initialCollection === "notice")
          setNotice((prev) => [data, ...prev]);
        else if (initialCollection === "schedule")
          setSchedule((prev) => [data, ...prev]);
        else if (initialCollection === "users")
          setUsers((prev) => [data, ...prev]);

        console.log("성공");
      } catch (error) {
        console.error(error);
      }
    };
    set();
  };

  return { getData, postData };
};
