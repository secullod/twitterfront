import React from "react";
import { Card } from "react-bootstrap";

const TweetList = ({ tweets, getUserName }) => {
  const cardsArray = tweets.map((tweet) => (
    <Card key={tweet.tid} className="tweet">
      <Card.Header>
        <strong>{getUserName(tweet.uid)}</strong>
      </Card.Header>
      <Card.Body>
        <strong>Tweet: </strong>
        {tweet.post}
      </Card.Body>
      <Card.Footer>{new Date(tweet.date).toLocaleString()}</Card.Footer>
    </Card>
  ));
  return <div>Tweets from users you follow{cardsArray}</div>;
};

export default TweetList;
