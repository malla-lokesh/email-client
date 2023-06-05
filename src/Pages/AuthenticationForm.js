import React, { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../Store/AuthReducer";

const AuthenticationForm = () => {
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [wrongPassword, setWrongPassword] = useState(false);
    const [emptyPassword, setEmptyPassword] = useState(false);
    const dispatch = useDispatch();
    const isLoginForm = useSelector(state => state.authentication.isLoginForm);

    const signUpFormSubmitHandler = async (event) =>{
        event.preventDefault();

        if(password.trim() === '') {
            setEmptyPassword(true);
            setEmail('');
            setPassword('');
            return;
        }

        if (isLoginForm) {
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
                    if (response.ok) {
                        setEmail('');
                        setPassword('');
                        return response.json();
                    } else {
                        throw new Error('Logging in Failed!');
                    }
                }).then(data => {
                    const mail = data.email.replace(/[.@]/g, '');
                    const token = data.idToken;
                    dispatch(authActions.addLoginDetails({mail: mail, token: token, login: true}));
                })
            } catch (error) {
                console.log(error);
            }
        } else {
            if(password !== confirmPassword) {
                setWrongPassword(true);
                setPassword('');
                setConfirmPassword('');
                return;
            }
            try {
                await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBm0SpVesBtUme9MAJjXDeTVu162E8klZA`, {
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
                    if (response.ok) {
                        setEmail('');
                        setPassword('');
                        setConfirmPassword('');
                        return response.json();
                    } else {
                        throw new Error('Signup failed!')
                    }
                }).then(() => {
                    console.log('Account created successfully.');
                })
            } catch(error) {
                console.log(error);
            }
        }
    }

    return <React.Fragment>
        <Form onSubmit={signUpFormSubmitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Enter email"
                    required/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password"
                    onFocus={() => {setWrongPassword(false); 
                                    setEmptyPassword(false)}}
                    minLength={8}
                    required
                    />
                <Form.Text className="text-danger">
                    {emptyPassword && "Password should not be empty."}
                </Form.Text>
            </Form.Group>

            {!isLoginForm && <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                    type="password" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    placeholder="Confirm Password"
                    onFocus={() => setWrongPassword(false)}
                    required/>
                <Form.Text className="text-danger">
                    {wrongPassword && "Password's didn't match. Please try again"}
                </Form.Text>
            </Form.Group>}

            <Button variant="dark" type="submit">
                {isLoginForm ? 'Login' : 'Sign in'}
            </Button>
        </Form>
    </React.Fragment>
}

export default AuthenticationForm;