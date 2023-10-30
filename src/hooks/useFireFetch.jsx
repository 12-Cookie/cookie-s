import {
  collection,
  query,
  getDocs,
  where,
  doc,
  setDoc,
  addDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useEffect, useState } from "react";

export const useFireFetch = () => {
  const [data, setData] = useState([]);

  const [join, setJoin] = useState([]);

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

  const addData = (initialCollection, data) => {
    const set = async () => {
      try {
        const docRef = await addDoc(collection(db, initialCollection), data);
        const docId = docRef.id;
        const newData = { id: docId, ...data };

        // 데이터 업데이트
        await setDoc(doc(db, initialCollection, docId), newData);
        console.log(data);
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

        console.log("성공, 문서 ID:", docRef.id);
      } catch (error) {
        console.error(error);
      }
    };
    set();
  };

  const bookedUser = (id) => {
    useEffect(() => {
      const dataJoin = async () => {
        const dataRef = collection(db, "bookedShifts");
        const dataQ = query(dataRef, where("scheduleId", "==", id));
        const usersRef = collection(db, "users");

        const dataSnapshot = await getDocs(dataQ);

        const data = [];

        dataSnapshot.forEach(async (doc, i) => {
          const usersQ = query(usersRef, where("id", "==", doc.data().userId));

          const userSnapshot = await getDocs(usersQ);

          userSnapshot.forEach((doc2) => {
            data.push(doc2.data());
          });
          setJoin(data);
        });
      };
      dataJoin();
    }, [id]);

    return join;
  };

  const deleteById = (initialCollection, id) => {
    console.log(schedule);
    const set = async () => {
      try {
        await deleteDoc(doc(db, initialCollection, id));
        console.log(`문서 ${id} 삭제 완료`);
      } catch (error) {
        console.error(error);
      }
    };
    set();
  };

  const get = async (initialCollection, key = null, value = null) => {
    if (key) {
      const Ref = collection(db, initialCollection);
      const q = query(Ref, where(key, "==", value));
      const querySnapshot = await getDocs(q);
      const userData = [];

      querySnapshot.forEach((doc) => {
        userData.push(doc.data());
      });

      return userData;
    } else {
      const Ref = collection(db, initialCollection);
      const userData = [];
      const querySnapshot = await getDocs(Ref);

      querySnapshot.forEach((doc) => {
        userData.push(doc.data());
      });

      return userData;
    }
  };

  const update = async (initialCollection, id, newData) => {
    try {
      const docRef = doc(db, initialCollection, id);

      await updateDoc(docRef, newData);

      console.log("good");
    } catch (error) {
      console.error("bad: ", error);
    }
  };

  return { getData, postData, bookedUser, addData, deleteById, get, update };
};
