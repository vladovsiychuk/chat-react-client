import React, {useEffect} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {getAccessToken} from './state/middleware/authMiddleware';
import ChatRoom from './pages/Chat';
import AuthPage from './pages/AuthPage';
import PropTypes from 'prop-types';
import {connect, useSelector} from 'react-redux';
import {createCurrentUser, loadCurrentUser} from './state/users/actions';

const App = ({loadCurrentUser, createCurrentUser}) => {
    const token = getAccessToken()
    const {currentUserIsFound} = useSelector(state => state.users.async)
    const {isLoading} = useSelector(state => state.users.async)

    useEffect(() => {
        if (isLoading !== true) {
            if (!!token && currentUserIsFound == null) {
                loadCurrentUser()
            }

            if (currentUserIsFound != null && !currentUserIsFound) {
                createCurrentUser()
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUserIsFound, isLoading]);

    return (
        <Switch>
            {!token && (
                <Route path='/auth'>
                    <AuthPage/>
                </Route>
            )}
            {!token && (
                <Route path='/'>
                    <Redirect to="/auth"/>
                </Route>
            )}
            {!!currentUserIsFound && (
                <Route path="/" exact>
                    <ChatRoom/>
                </Route>
            )}
        </Switch>
    );
};

App.propTypes = {
    loadCurrentUser: PropTypes.func.isRequired,
    createCurrentUser: PropTypes.func.isRequired
};

const mapDispatchToProps = {
    loadCurrentUser: loadCurrentUser,
    createCurrentUser: createCurrentUser,
};

export default connect(null, mapDispatchToProps)(App);

