import React, { useState, useEffect } from "react";
import { Col, Container, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

const InboxViewPage = () => {
  const myEmail = useSelector(state => state.authentication.email);
  const [myMails, setMyMails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://email-client-31403-default-rtdb.firebaseio.com/${myEmail}/myInbox.json`
        );
        if (!response.ok) {
          throw new Error("Something went wrong...");
        } else {
          const jsonData = await response.json();
          setMyMails(jsonData);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [myEmail]);

  const mails = Object.keys(myMails).map((key) => {
    return (
      <ListGroupItem key={key}>
        {myMails[key].from} - {myMails[key].subject} - {myMails[key].message}
      </ListGroupItem>
    );
  });

  return (
    <React.Fragment>
      <Container fluid>
        <Row style={{ marginTop: "100px" }}>
          <Col>
            <ListGroup className="mt-5">
                <h4>My Mails</h4>
                {mails}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default InboxViewPage;
