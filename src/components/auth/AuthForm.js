import React from 'react';
import GoogleButton from 'react-google-button';

const AuthForm = () => {
    return (
        <div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: '300px',
            }}>
                <h1>
                    Welcome to your business chat!
                </h1>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <GoogleButton
                    onClick={() => {
                        window.location.replace('http://localhost:8082/oauth/login/google');
                    }}
                />
            </div>
        </div>
    );
};

export default AuthForm;
