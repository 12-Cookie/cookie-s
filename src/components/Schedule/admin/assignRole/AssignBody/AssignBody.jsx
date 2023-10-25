import * as style from "./AssignBody.style";
import { useFireFetch } from "../../../../../hooks/useFireFetch";
import { useEffect, useState } from "react";
import { Tag } from "@chakra-ui/react";

const AssignBody = ({
  schedule,
  roleData,
  isHidden,
  userData,
  config,
  booking,
  userId,
  setViewFooter,
  setRoleDate,
  setConfig,
  setIsHidden,
  setBooking,
}) => {
  const [isConfig, setIsConfig] = useState([]);

  const fireFetch = useFireFetch();

  const company = fireFetch.getData("company", "id", schedule.companyId)[0];

  useEffect(() => {
    if (company) {
      const map = new Map();
      company.role.forEach((v, i) => {
        map.set(v, []);
      });

      setRoleDate(map);
      setIsConfig(Array(company.role.length).fill(false));
    }
  }, [company]);

  const handleConfig = (role, i) => {
    setViewFooter(true);
    setConfig(role);

    const copy = [...isConfig];
    copy.forEach((v, i) => {
      copy[i] = false;
    });
    copy[i] = true;
    setIsConfig(copy);
  };

  const handleTag = (name) => {
    const bl = roleData.get(config).includes(name);
    if (bl) {
      const index = userData.findIndex((v) => v === name);
      const copy = [...isHidden];
      copy[index] = !copy[index];
      setIsHidden(copy);

      const mapCopy = new Map(roleData);
      const roleCopy = [...mapCopy.get(config)];
      const i = roleCopy.findIndex((v, i) => v === name);
      
      roleCopy.splice(i, 1);
      mapCopy.set(config, roleCopy);
      setRoleDate(mapCopy);

      const user = userId.find((v, i) => v.name === name);
      const newArray = booking.filter((v, i) => v.userId !== user.id);
      setBooking([...newArray]);
    }
  };

  return (
    <style.AssignBodyWrap>
      {company
        ? company.role.map((roleV, i) => {
            return (
              <style.Role
                key={i}
                style={isConfig[i] ? { borderColor: "#999" } : null}
              >
                <span>{roleV}</span>
                <span className="tags">
                  {roleData.size &&
                    roleData.get(roleV).map((v, i) => {
                      return (
                        <Tag
                          key={i}
                          mr=".3rem"
                          cursor="pointer"
                          userSelect="none"
                          onClick={() => {
                            handleTag(v);
                          }}
                        >
                          {v}
                          {config === roleV ? " ✕" : ""}
                        </Tag>
                      );
                    })}
                </span>
                <span className="empty"></span>
                <span
                  onClick={() => {
                    handleConfig(roleV, i);
                  }}
                >
                  설정
                </span>
              </style.Role>
            );
          })
        : null}
    </style.AssignBodyWrap>
  );
};

export default AssignBody;
