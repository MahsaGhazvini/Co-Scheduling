import React from 'react'
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom'

import HomePage from './HomePage/HomePage';
import ListPage from './ListPage/ListPage';
import AddPoll from './AddPoll/AddPoll';
import Vote from './Vote/Vote';
import ManagePolls from './ManagePolls/ManagePolls';


import { library } from './../../node_modules/@fortawesome/fontawesome-svg-core';
import { faEnvelope, faKey, faEdit, faPen } from './../../node_modules/@fortawesome/free-solid-svg-icons';
library.add(faEnvelope, faKey, faEdit, faPen);

const App = () =>
    <Router>
        <div>
            <Route exact path="/" component={HomePage}/>
            <Route exact path="/listPage" component={ListPage}/>
            <Route exact path="/addPoll" component={AddPoll}/>
            <Route exact path="/vote/:pollId" component={Vote}/>
            <Route exact path="/managePolls/:pollId" component={ManagePolls}/>
        </div>
    </Router>

export default App