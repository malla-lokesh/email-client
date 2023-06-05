import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import AuthenticationForm from '../Pages/AuthenticationForm';
import { authActions } from "../Store/AuthReducer";

const Authentication = () => {
    const dispatch = useDispatch();
    const isLoginForm = useSelector(state => state.authentication.isLoginForm);

    return <React.Fragment>
        <Row md="auto" className="d-flex justify-content-center">
            <Col md="auto"></Col>
            <Col md="4" className="d-flex-col border p-4">
                <h6>👇Sign in (OR) Login</h6>
                <Form.Check 
                    type="switch"
                    checked={isLoginForm}
                    onChange={() => {dispatch(authActions.setIsLoginForm())}}
                />
                <hr/>
                <AuthenticationForm/>
            </Col>
            <Col md="auto"></Col>
        </Row>
    </React.Fragment>
};

export default Authentication;