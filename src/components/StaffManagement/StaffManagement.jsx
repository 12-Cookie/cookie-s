import { Tag, TagLabel } from "@chakra-ui/react";
import PropTypes from "prop-types";

const StaffManagement = ({ userData }) => {
  const handleClick = (userData) => {
    const { id, name } = userData;
    console.log("id", id);
    console.log("name", name);
  };

  const renderUserTag = (userData) => {
    if (userData.gender === "male") {
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
      <h1 onClick={handleClick}>직원관리</h1>
      <ul>
        {userData.map((userData) => (
          <li key={userData.id} onClick={() => handleClick(userData)}>
            {renderUserTag(userData)}
          </li>
        ))}
      </ul>
    </>
  );
};

export default StaffManagement;

StaffManagement.propTypes = {
  userData: PropTypes.array,
};
