import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../Store/AuthReducer";
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';

const LoginPage = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(state => state.authentication.isLoggedIn);

    const loginFormSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBm0SpVesBtUme9MAJjXDeTVu162E8klZA`, {
                method: 'POST',
                body: JSON.stringify({
                    email: email,
                    password: password,
                    returnSecureToken: true
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if(response.ok) {
                    setEmail('');
                    setPassword('');
                    return response.json();
                } else {
                    throw new Error(response.json().error.message)
                }
            }).then(data => {
                const mail = data.email.replace(/[.@]/g, '');
                const token = data.idToken;
                dispatch(authActions.addLoginDetails({mail: mail, token: token}));
                dispatch(authActions.setLogin(true));
            })
        } catch(error) {
            console.log(error);
        }
    }

    if (isLoggedIn) {
        <Redirect to="/welcome"/>
    }

    return <React.Fragment>
        <Form onSubmit={loginFormSubmitHandler} className="border p-4">
            <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Enter email"
                    required
                />
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                    required
                />
            </Form.Group>

            <Button variant="primary" type="submit">Login</Button>
        </Form>
    </React.Fragment>
}

export default LoginPage;