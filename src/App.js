import "./App.css";
import API from "axios";
import {
  Container,
  Col,
  Card,
  Button,
  InputGroup,
  FormControl,
  Image,
  Dropdown,
  Row,
  Form,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { propTypes } from "react-bootstrap/esm/Image";

function App() {
  const [tweets, setTweets] = useState([]);
  const [users, setUsers] = useState([]);
  const [post, setPost] = useState("");
  const [usersFollowed, setUsersFollowed] = useState([]);
  const [usersToFollow, setUsersToFollow] = useState([]);
  const [currentUser, setCurrentUser] = useState(3);
  const [dropdownOpen, setDropdownOpen] = useState(true);

  const getTweets = () => {
    API.get(`http://localhost:3000/getweets/${currentUser}`).then((tweets) =>
      setTweets(tweets.data)
    );
    API.get(`http://localhost:3000/getusers`).then((users) =>
      setUsers(users.data)
    );
    API.get(`http://localhost:3000/getusersfollowed/${currentUser}`).then(
      (usersFollowed) => setUsersFollowed(usersFollowed.data)
    );
  };

  useEffect(() => {
    getTweets();
  }, [currentUser]);

  function cardList() {
    const cardsArray = tweets.map((user) => (
      <Card key={user.tid} className="tweet">
        <Card.Header>
          <strong>{getUserName(user.uid)}</strong>
        </Card.Header>
        <Card.Body>
          <p>
            {" "}
            <strong>Tweet: </strong>
            {user.post}{" "}
          </p>
        </Card.Body>
        <Card.Footer>{new Date(user.date).toLocaleString()}</Card.Footer>
      </Card>
    ));
    return <div>{cardsArray}</div>;
  }

  function userFollowList() {
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
              window.location.reload();
            }}
          >
            unfollow
          </Button>
        </Card.Body>
      </Card>
    ));
    return <div>{cardsArray}</div>;
  }

  function usersToFollowList() {
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
              window.location.reload();
            }}
          >
            follow
          </Button>
        </Card.Body>
      </Card>
    ));
    return <div>{cardsArray}</div>;
  }

  function usersList() {
    const UsersDrop = (
      <Dropdown>
        <Dropdown.Toggle
          variant="success"
          id="dropdown-basic"
          toggle={setDropdownOpen}
          drop="down"
          key="down"
        >
          User
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {users.map((obj, idx) => {
            return (
              <Dropdown.Item
                href={`#-${obj.uid}`}
                onClick={() => {
                  setCurrentUser(obj.uid);
                  setDropdownOpen(true);
                }}
              >
                {obj.username}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
    );

    return <div>{UsersDrop}</div>;
  }

  function follow(id) {
    API.post(`http://localhost:3000/follows`, {
      follower: currentUser,
      uid: id,
    }).then((usersFollowed) => setUsersFollowed(usersFollowed.data));
  }

  function unfollow(id) {
    API.put(`http://localhost:3000/follows`, {
      follower: currentUser,
      uid: id,
    }).then((usersFollowed) => setUsersFollowed(usersFollowed.data));
  }

  function getContractWithSigner() {}

  async function handleBid() {}

  function placeBid(contract) {}

  function getUserName(id) {
    if (users.length > 0) {
      const user = users.filter(function (el) {
        return el.uid === id;
      });
      return user[0].username;
    }
  }

  function tweet() {
    const d = new Date();
    API.post(`http://localhost:3000/tweets`, {
      uid: currentUser,
      post: post,
      date:
        d.toISOString().split("T")[0] + " " + d.toTimeString().split(" ")[0],
    });
  }

  return (
    <Container>
      {usersList()}
      <Row>
        <Form className="tweetbox">
          <Form.Group className="mb-3">
            <Form.Label>Tweet Something {getUserName(currentUser)}</Form.Label>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Something interesting..."
              onChange={(e) => setPost(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit" onClick={() => tweet()}>
            Submit
          </Button>
        </Form>
      </Row>
      <Col>Users Following{userFollowList()}</Col>
      <Col>Users to follow{usersToFollowList()}</Col>
      <Col>Tweets from users you follow{cardList()}</Col>
    </Container>
  );
}

export default App;
