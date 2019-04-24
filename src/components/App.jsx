import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader';

import AppRouter from './AppRouter.jsx';

const App = () => (
    <div>
        <AppRouter />
    </div>
);
export default hot(module)(App);
