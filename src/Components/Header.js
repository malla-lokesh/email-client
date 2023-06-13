import React, { useState } from "react";
import { Button, Col, Container, Nav, Offcanvas, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../Store/AuthReducer";
import './Header.css';
import { uiActions } from "../Store/UIReducer";
import { Link } from "react-router-dom";

const Header = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.authentication.isLoggedIn);
    const [showMenu, setShowMenu] = useState(false);

    const composeMailHandler = () => {
        dispatch(uiActions.setComposeMail(true))
    }

    const handleShow = () => setShowMenu(true);
    const handleClose = () => setShowMenu(false);

    return (
        <Container fluid>
            <Row className={`${isLoggedIn && 'mb-4 bg-dark text-white'}`} style={{ position: 'fixed', top: 0, width: "100%", zIndex: 100 }}>
                <Col className={`${!isLoggedIn ? 'mb-4 text-center' : 'pt-3 pb-3 d-flex justify-content-start align-items-center'}`}>
                    {isLoggedIn && <Col>
                        <Button variant="none" className="menu-icon" onClick={handleShow}>
                            <span className="bar"></span>
                            <span className="bar"></span>
                            <span className="bar"></span>
                        </Button>
                    </Col>}
                    <Offcanvas show={showMenu} onHide={handleClose}>
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>Menu</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Button
                                className="mb-3"
                                variant="danger"
                                as={Link}
                                to='/compose-mail'
                            >Compose</Button>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link as={Link} to="/inbox">Inbox</Nav.Link>
                                <Nav.Link as={Link} to="/sent-mail">Sent mail</Nav.Link>
                            </Nav>
                        </Offcanvas.Body>
                    </Offcanvas>
                    {isLoggedIn && <Col>
                        <h1>Mail Box</h1>
                    </Col>}
                </Col>
                {isLoggedIn && <Col className={`${!isLoggedIn ? 'text-center' : 'd-flex justify-content-end align-items-center'}`}>
                    {isLoggedIn &&
                        <Button variant="outline-light" onClick={() => dispatch(authActions.setLogout(false))}>
                            Logout
                        </Button>}
                </Col>}
            </Row>
        </Container>
    );
};

export default Header;
