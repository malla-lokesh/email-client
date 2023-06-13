import React, { useState, useEffect } from "react";
import { Button, Card, Col, ListGroup, ListGroupItem, Row, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";

const SentMailPage = () => {
  const myEmail = useSelector(state => state.authentication.email);
  const [sentMails, setSentMails] = useState([]);
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleMsgClick = (message) => {
    setSelectedMsg(message);
    setShowModal(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://email-client-31403-default-rtdb.firebaseio.com/${myEmail}/mySentBox.json`
        );
        if (!response.ok) {
          throw new Error("Something went wrong...");
        } else {
          const jsonData = await response.json();
          setSentMails(jsonData);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [myEmail]);

  const mails = sentMails
    ? Object.keys(sentMails).map((key) => {
        const message = sentMails[key];

        return (
          <ListGroupItem
            key={key}
            style={{ cursor: 'pointer' }}
            onClick={() => handleMsgClick({ ...message, id: key })}
          >
            {message.mailId} - {message.subject} - {message.message}
          </ListGroupItem>
        );
      })
    : null;

  return (
    <React.Fragment>
        <Row style={{ marginTop: "100px" }}>
          <Col>
            <ListGroup className="mt-5">
              <h4>Sent Mail</h4>
              {mails}
            </ListGroup>
            {selectedMsg && (
              <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                  <Modal.Title>{selectedMsg.subject}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Card.Subtitle className="mb-2 text-muted">{selectedMsg.to}</Card.Subtitle>
                  <Card.Text>{selectedMsg.message}</Card.Text>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={handleCloseModal}>Close</Button>
                </Modal.Footer>
              </Modal>
            )}
          </Col>
        </Row>
    </React.Fragment>
  );
};

export default SentMailPage;
