import React, { useState } from "react";
import { Button, Col, Nav, Offcanvas, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../Store/AuthReducer";
import './Header.css';
import { uiActions } from "../Store/UIReducer";

const Header = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.authentication.isLoggedIn);
    const [showMenu, setShowMenu] = useState(false);

    const handleShow = () => setShowMenu(true);
    const handleClose = () => setShowMenu(false);

    return <React.Fragment>
        <Row className={`pt-3 pb-3 ${isLoggedIn && 'mb-4 bg-dark text-white'}`}
            style={{ position: 'fixed', width: "100%" , zIndex: 100 }}>
            <Col className={`${!isLoggedIn ? 'text-center' : 'd-flex justify-content-start align-items-center'}`}>
                <Button variant="none" className="menu-icon" onClick={handleShow}>
                    <span className="bar"></span>
                    <span className="bar"></span>
                    <span className="bar"></span>
                </Button>
                <Offcanvas show={showMenu} onHide={handleClose}>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Menu</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Button 
                            className="mb-3"
                            variant="danger"
                            onClick={() => {dispatch(uiActions.setComposeMail(true))}}
                        >Compose</Button>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <Nav.Link action>Inbox</Nav.Link>
                            <Nav.Link action>Sent mail</Nav.Link>
                            <Nav.Link action>Draft</Nav.Link>
                            <Nav.Link action>Bin</Nav.Link>
                            <Nav.Link action>Spam</Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                </Offcanvas>
                <h1 style={{marginLeft: '50px'}}>Mail Box</h1>
            </Col>
            {isLoggedIn && <Col className={`${!isLoggedIn ? 'text-center' : 'd-flex justify-content-end align-items-center'}`}>
                {isLoggedIn && 
                    <Button variant="outline-light" onClick={() => dispatch(authActions.setLogout(false))}>
                        Logout
                </Button>}
            </Col>}
        </Row>
    </React.Fragment>
}

export default Header;