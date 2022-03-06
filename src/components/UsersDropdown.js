import React from "react";
import { Dropdown } from "react-bootstrap";

const UsersDropdown = ({ currentUser, users, setCurrentUser, getUserName }) => {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic" drop="down">
        User: {getUserName(currentUser)}
        <i class="fa fa-caret-down"></i>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        {users.map((user) => {
          return (
            <Dropdown.Item
              key={user.uid}
              onClick={() => setCurrentUser(user.uid)}
            >
              {user.username}
            </Dropdown.Item>
          );
        })}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default UsersDropdown;
