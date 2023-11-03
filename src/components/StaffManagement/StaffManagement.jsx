import { Tag, TagLabel } from "@chakra-ui/react";
import PropTypes from "prop-types";
import * as style from "./StaffManagement.style";

const StaffManagement = ({ userData }) => {
  const handleClick = (userData) => {
    const { id, name } = userData;
  };

  const renderUserTag = (userData) => {
    if (userData.gender === "남자") {
      return (
        <Tag variant="solid" colorScheme="teal">
          <TagLabel>{userData.name}</TagLabel>
        </Tag>
      );
    } else {
      return (
        <Tag variant="solid" colorScheme="pink">
          <TagLabel>{userData.name}</TagLabel>
        </Tag>
      );
    }
  };

  return (
    <>
      <style.Title>직원관리</style.Title>
      <style.StaffManagementWrap>
        {userData.map((userData) => (
          <li key={userData.id} onClick={() => handleClick(userData)}>
            {renderUserTag(userData)}
          </li>
        ))}
      </style.StaffManagementWrap>
    </>
  );
};

export default StaffManagement;

StaffManagement.propTypes = {
  userData: PropTypes.array,
};
