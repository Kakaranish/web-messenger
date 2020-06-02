import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import JoinPage from './pages/JoinPage';
import ChatPage from './pages/Chat/ChatPage';
import MainLayout from './MainLayout';

const App = (props) => {
    return (
        <MainLayout>
            <BrowserRouter>
                <Switch>
                    <Route exact path='/' component={JoinPage} />
                    <Route path='/chat' component={ChatPage} />
                </Switch>
            </BrowserRouter>
        </MainLayout>
    );
};

export default App;