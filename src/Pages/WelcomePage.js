import React from "react";
import { Row } from "react-bootstrap";
import ComposeMail from "./ComposeMail";
import InboxViewPage from "./InboxViewPage";

const WelcomePage = () => {
    return <React.Fragment>
        <Row md="auto">
            <ComposeMail/>
            <InboxViewPage/>
        </Row>
    </React.Fragment>
}

export default WelcomePage;