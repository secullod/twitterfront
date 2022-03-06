import React, { useState } from "react";
import { Form, Button, Row } from "react-bootstrap";
import API from "axios";
import HOST from "../App";

const TweetBox = ({
  currentUser,
  getUserName,
  submitToggle,
  setSubmitToggle,
}) => {
  const [post, setPost] = useState("");

  function tweet() {
    const date = new Date();
    API.post(`${HOST}/tweets`, {
      uid: currentUser,
      post: post,
      date:
        date.toISOString().split("T")[0] +
        " " +
        date.toTimeString().split(" ")[0],
    });
  }

  return (
    <Row>
      <Form className="tweetbox">
        <Form.Group className="mb-3">
          <Form.Label>Tweet Something {getUserName(currentUser)}</Form.Label>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            value={post}
            placeholder="Something interesting..."
            onChange={(e) => setPost(e.target.value)}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          onClick={() => {
            tweet();
            setPost("");
            setSubmitToggle(!submitToggle);
          }}
        >
          Submit
        </Button>
      </Form>
    </Row>
  );
};

export default TweetBox;
