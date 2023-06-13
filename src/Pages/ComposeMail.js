import React, { useRef } from "react";
import { Form, FormGroup, Row, Button, CloseButton } from "react-bootstrap";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../Store/UIReducer";

const ComposeMail = () => {
    const dispatch = useDispatch();
    const email = useRef(null);
    const subject = useRef(null);
    const message = useRef(null);
    const myEmail = useSelector(state => state.authentication.email);
    const showComposeMail = useSelector(state => state.ui.composeMail);

    const composeMailHandler = async (event) => {
        event.preventDefault();

        const toMail = email.current.value.replace(/[.@]/g, '');

        const mailDetails = {
            from: myEmail,
            mailId: email.current.value,
            subject: subject.current.value,
            message: message.current.getEditor().getText().trim().replace(/(<([^>]+)>)/gi, "")
        }

        try {
            await fetch(`https://email-client-31403-default-rtdb.firebaseio.com/${myEmail}/mySentBox.json`, {
                method: 'POST',
                body: JSON.stringify(mailDetails),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    email.current.value = '';
                    subject.current.value = '';
                    message.current.value = '';
                    return response.json();
                } else {
                    throw new Error('Sending mail failed.')
                }
            })
        } catch (error) {
            console.log(error);
        }
        try {
            fetch(`https://email-client-31403-default-rtdb.firebaseio.com/${toMail}/myInbox.json`, {
                method: 'POST',
                body: JSON.stringify(mailDetails),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Error in inbox of to Mail.')
                }
            }) 
        } catch (error) {
            console.log(error);
        }
    }

    return <React.Fragment>
        <Row md="auto">
            <Form 
                className="border p-4"
                style={{
                    position: 'fixed',
                    bottom: 10,
                    right: 350,
                    left: 350,
                    bottom: 10,
                    height: '450px',
                    zIndex: 10,
                    backgroundColor: 'whitesmoke',
                    overflowY: 'auto'
                }}
                onSubmit={composeMailHandler}
            >
                <div className="d-flex justify-content-between">
                    <h5>Compose</h5>
                </div>
                <hr/>
                <FormGroup className="mb-3">
                    <Form.Control 
                        type='email'
                        ref={email}  
                        placeholder="to" 
                        required/>
                </FormGroup>

                <FormGroup className="mb-3">
                    <Form.Control 
                        type='text'
                        ref={subject}
                        placeholder="Subject"/>
                </FormGroup>

                <FormGroup>
                    <ReactQuill
                        theme="snow"
                        ref={message}
                        placeholder="Compose email..."
                        style={{
                            height: "120px",
                            marginBottom: '10px',
                        }}
                    />
                </FormGroup>

                <Button 
                    variant="dark"
                    type="submit"
                    className="mt-5"
                >Send</Button>
            </Form>
        </Row>
    </React.Fragment>
};

export default ComposeMail;