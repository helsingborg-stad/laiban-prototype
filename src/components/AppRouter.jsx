import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function Start() {
    return <h2>Start Route</h2>;
}

function Route1() {
    return <h2>Route 1</h2>;
}

function Route2() {
    return <h2>Route 2</h2>;
}

function AppRouter() {
    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Start</Link>
                    </li>
                    <li>
                        <Link to="/route-1">Route 1</Link>
                    </li>
                    <li>
                        <Link to="/route-2">Route 2</Link>
                    </li>
                </ul>
            </nav>

            <Route path="/" exact component={Start} />
            <Route path="/route-1/" component={Route1} />
            <Route path="/route-2/" component={Route2} />
        </div>
    );
}

export default AppRouter;
