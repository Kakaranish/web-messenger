import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import MainPage from './pages/MainPage';

const App = (props) => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component={MainPage} />
            </Switch>
        </BrowserRouter>
    );
};

export default App;