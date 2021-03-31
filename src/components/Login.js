import { Button } from '@material-ui/core';
import React from 'react';
import logo from '../assets/logo.png';
import { auth, provider } from '../firebase';


import './Login.css';

function Login() {
    const signIn = () => {
        auth.signInWithPopup(provider).then(result => 
            console.log(result)).catch(error => alert(error.message));
    };


    return (
        <div className="login">
            <div className="login_container">
                <img
                src={logo}
                alt="Cheka"
                />
                <div className="login_text">
                    <h1>Sign in to Cheka</h1>
                </div>

                <Button onClick={signIn} variant="contained" color="primary" >Sign In With Google</Button>
            </div>
        </div>
    )
}

export default Login
