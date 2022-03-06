import React from "react";
import { Card, Button } from "react-bootstrap";
import API from "axios";
import HOST from "../App";

const FollowingList = ({
  currentUser,
  usersFollowed,
  setUsersFollowed,
  users,
  setSubmitToggle,
  submitToggle,
}) => {
  function follow(id) {
    API.post(`${HOST}/follows`, {
      follower: currentUser,
      uid: id,
    });
  }

  var c = users.filter(function (objFromA) {
    return !usersFollowed.find(function (objFromB) {
      return objFromA.uid === objFromB.uid;
    });
  });

  var d = c.filter(function (el) {
    return el.uid !== currentUser;
  });

  const cardsArray = d.map((user) => (
    <Card key={user.tid} className="follow">
      <Card.Header>
        <strong>{user.username}</strong>
      </Card.Header>
      <Card.Body>
        <Button
          onClick={() => {
            follow(user.uid);
            setSubmitToggle(!submitToggle);
          }}
        >
          follow
        </Button>
      </Card.Body>
    </Card>
  ));
  return <div>Users to follow{cardsArray}</div>;
};

export default FollowingList;
