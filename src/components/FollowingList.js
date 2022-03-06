import React from "react";
import { Card, Button } from "react-bootstrap";
import API from "axios";
import HOST from "../App";

const FollowingList = ({
  currentUser,
  usersFollowed,
  setSubmitToggle,
  submitToggle,
}) => {
  function unfollow(id) {
    API.put(`${HOST}/follows`, {
      follower: currentUser,
      uid: id,
    });
  }

  var e = usersFollowed.filter(function (el) {
    return el.uid !== currentUser;
  });
  const cardsArray = e.map((user) => (
    <Card key={user.tid} className="follow">
      <Card.Header>
        <strong>{user.username}</strong>
      </Card.Header>
      <Card.Body>
        <Button
          onClick={() => {
            unfollow(user.uid);
            setSubmitToggle(!submitToggle);
          }}
        >
          unfollow
        </Button>
      </Card.Body>
    </Card>
  ));
  return <div>Users I Follow{cardsArray}</div>;
};

export default FollowingList;
