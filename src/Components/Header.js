import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../Store/AuthReducer";

const Header = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.authentication.isLoggedIn);

    return <React.Fragment>
        <Row className={`pt-3 pb-3 ${isLoggedIn && 'mb-4 bg-dark text-white'}`}>
            <Col className={`${!isLoggedIn ? 'text-center' : 'd-flex justify-content-around align-items-center'}`}>
                <h1>Mail Box</h1>
                {isLoggedIn && 
                <Button variant="outline-light" onClick={() => dispatch(authActions.setLogout(false))}>
                    Logout
                </Button>}
            </Col>
        </Row>
    </React.Fragment>
}

export default Header;