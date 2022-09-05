import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { getAccessToken } from './state/middleware/authMiddleware';
import ChatRoom from './pages/ChatRoom';
import AuthPage from './pages/AuthPage';

const App = () => {
    const token = getAccessToken()

    console.log(token)

    return (
        <Switch>
            {!token && (
                <Route path='/auth'>
                    <AuthPage />
                </Route>
            )}
            {!token && (
                <Route path='/'>
                    <Redirect to="/auth" />
                </Route>
            )}
            <Route path="/" exact>
                <ChatRoom />
            </Route>
        </Switch>
    );
};

export default App;

