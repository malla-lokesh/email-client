import React, { useRef } from "react";
import { Form, FormGroup, Row, Button } from "react-bootstrap";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { useSelector } from "react-redux";

const WelcomePage = () => {

    const email = useRef(null);
    const subject = useRef(null);
    const message = useRef(null);
    const myEmail = useSelector(state => state.authentication.email);

    const composeMailHandler = async (event) => {
        event.preventDefault();

        const mailDetails = {
            mailId: email.current.value,
            subject: subject.current.value,
            message: message.current.getEditor().getText().trim().replace(/(<([^>]+)>)/gi, "")
        }

        try {
            await fetch(`https://mail-storage-6683c-default-rtdb.firebaseio.com/${myEmail}.json`, {
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
    }

    return <React.Fragment>
        <Row md="auto">
            <Form 
                className="border p-4"
                style={{
                    position: 'fixed',
                    bottom: 10,
                    right: 10,
                    height: '450px'
                }}
                onSubmit={composeMailHandler}
            >
                <h5>Compose</h5>
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
}

export default WelcomePage;