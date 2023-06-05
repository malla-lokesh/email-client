import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../Store/AuthReducer";

const Header = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.authentication.isLoggedIn);

    return <React.Fragment>
        <Row className="mt-4 mb-4">
            <Col className={`${!isLoggedIn ? 'text-center' : 'd-flex justify-content-start'}`}>
                <h1>Mail Box</h1>
            </Col>
            {isLoggedIn && <Col className="d-flex justify-content-end align-items-center">
                <Button onClick={() => dispatch(authActions.setLogout(false))}>Logout</Button>
            </Col>}
        </Row>
    </React.Fragment>
}

export default Header;