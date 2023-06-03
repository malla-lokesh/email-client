import React from "react";
import './mailBoxHeader.css';
import SignUpPage from "../Pages/SignUpPage";
import { Col, Container, Row } from "react-bootstrap";

const Header = () => {
    return <React.Fragment>
        <Container>
            <Row>
                <Col md="auto">
                    <h1>Mail Box</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4>Sign up</h4>
                </Col>
                <Col>
                    <SignUpPage/>
                </Col>
            </Row>
        </Container>
    </React.Fragment>
}

export default Header;