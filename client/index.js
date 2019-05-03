/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import '@babel/polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import 'typeface-roboto';
import { HashRouter, MemoryRouter } from 'react-router-dom';
import App from './components/App.jsx';

import './assets/sass/styles.scss';

class Bootstrap {
    constructor() {
        this.init();
    }

    init = () => {
        const element = document.createElement('div');
        element.setAttribute('id', 'app');
        document.body.appendChild(element);
        ReactDOM.render(
            <MemoryRouter>
                <App />
            </MemoryRouter>,
            document.getElementById('app')
        );
    };
}

new Bootstrap();
