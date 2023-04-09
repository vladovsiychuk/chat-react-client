import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import store from './state/store';
import TestComponent from './TestComponent';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            {/*<App />*/}
            <TestComponent />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

