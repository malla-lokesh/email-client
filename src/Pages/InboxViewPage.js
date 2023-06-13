import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, ListGroup, ListGroupItem, Row, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { inboxActions } from "../Store/InboxReducer";

const InboxViewPage = () => {
  const myEmail = useSelector(state => state.authentication.email);
  const [myMails, setMyMails] = useState([]);
  const unReadMails = useSelector(state => state.inbox.unReadMails);
  const [selectedMsg, setSelectedMsg] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const markMessageAsRead = async (messageId) => {
    try {
      await fetch(
        `https://email-client-31403-default-rtdb.firebaseio.com/${myEmail}/myInbox/${messageId}.json`,
        {
          method: 'PATCH',
          body: JSON.stringify({ read: true }),
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const response = await fetch(
        `https://email-client-31403-default-rtdb.firebaseio.com/${myEmail}/myInbox.json`
      );
      if (!response.ok) {
        throw new Error("Something went wrong...");
      } else {
        const jsonData = await response.json();
        setMyMails(jsonData);
      }

      if (!selectedMsg.read) {
        dispatch(inboxActions.decrementUnReadMails());
      }      
    } catch (error) {
      console.log(error);
    }
  };

  const handleMsgClick = (message) => {
    if (!message.read) {
      markMessageAsRead(message.id);
    }
    
    setSelectedMsg(message);
    setShowModal(true);
  };

  const handleDelete = async (messageId) => {
    try {
      await fetch(
        `https://email-client-31403-default-rtdb.firebaseio.com/${myEmail}/myInbox/${messageId}.json`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (selectedMsg && selectedMsg.id === messageId) {
        setSelectedMsg(null);
        setShowModal(false);
      }

      const updatedMails = { ...myMails };
      delete updatedMails[messageId];
      setMyMails(updatedMails);
    } catch (error) {
      console.log(error);
    }
  };

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

    if (selectedMsg && !selectedMsg.read) {
      markMessageAsRead(selectedMsg.id);
    }
  }, [myEmail, selectedMsg]);

  useEffect(() => {
    const countUnreadMails = () => {
      if (myMails) {
        const count = Object.values(myMails).reduce((acc, message) => {
          return !message.read ? acc + 1 : acc;
        }, 0);

        // Update unReadMails count in the reducer
        dispatch(inboxActions.setUnReadMails(count));
      }
    };

    countUnreadMails();
  }, [myMails, dispatch]);

  const mails = myMails
    ? Object.keys(myMails).map((key) => {
        const message = myMails[key];
        const isRead = message.read;

        return (
          <ListGroupItem
            key={key}
            style={{ cursor: 'pointer' }}
            onClick={() => handleMsgClick({ ...message, id: key })}
          >
            {!isRead && (
              <div
                style={{
                  display: "inline-block",
                  width: "10px",
                  height: "10px",
                  borderRadius: "25px",
                  backgroundColor: "blue",
                  marginRight: "12px",
                }}
              />
            )}
            {message.from} - {message.subject} - {message.message}
            <Button
              variant="danger"
              size="sm"
              style={{ marginLeft: '10px' }}
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(key);
              }}
            >
              Delete
            </Button>
          </ListGroupItem>
        );
      })
    : null;

  return (
    <React.Fragment>
      <Container fluid>
        <Row style={{ marginTop: "100px" }}>
          <Col>
            <ListGroup className="mt-5">
              <h4>My Inbox</h4>
              <h6>Number of unread mails: {unReadMails}</h6>
              {mails}
            </ListGroup>
            {selectedMsg && (
              <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                  <Modal.Title>{selectedMsg.subject}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Card.Subtitle className="mb-2 text-muted">{selectedMsg.from}</Card.Subtitle>
                  <Card.Text>{selectedMsg.message}</Card.Text>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="primary" onClick={handleCloseModal}>Close</Button>
                </Modal.Footer>
              </Modal>
            )}
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default InboxViewPage;
