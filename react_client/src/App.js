import React from 'react'
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'

import HomePage from './HomePage/HomePage';
import ListPage from './ListPage/ListPage';
import AddPoll from './AddPoll/AddPoll';
import Vote from './Vote/Vote';

const App = () =>
    <Router>
        <div>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/listPage" component={ListPage}/>
            <Route exact path="/addPoll" component={AddPoll}/>
            <Route exact path="/vote/:pollId" component={Vote}/>
        </div>
    </Router>

export default App