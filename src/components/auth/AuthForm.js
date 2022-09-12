import React from 'react'
import GoogleButton from 'react-google-button'

const AuthForm = () => {
    return (
        <div>
            <GoogleButton
                onClick={() => { window.location.replace("http://localhost:8082/oauth/login/google"); }}
            />
        </div>
    )
}

export default AuthForm
