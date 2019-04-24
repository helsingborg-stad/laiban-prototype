/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto';
import { HashRouter, withRouter } from 'react-router-dom';
import App from './components/App.jsx';

class Application {
    constructor() {
        this.init();
    }

    init = async () => {
        const element = document.createElement('div');
        element.setAttribute('id', 'app');
        document.body.appendChild(element);
        ReactDOM.render(
            <HashRouter>
                <App />
            </HashRouter>,
            document.getElementById('app')
        );
    };
}

new Application();
