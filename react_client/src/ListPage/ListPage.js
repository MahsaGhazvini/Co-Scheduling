import React, { Component } from 'react';
import * as Network from './../Common/RequestMaker';

import DefaultNavbar from '../Common/DefaultNavbar';
import TitleComponent from '../Common/TitleComponent';
import PollList from './PollList';
import './../Styles/common.css';
import './../Styles/login.css';
import './../Styles/listStyle.css';
// http://localhost:3000/vote?email=aa@gmail.com
class ListPage extends Component {
    constructor(){
        super()

        this.state = {pollsInfo:[]}
    }

    componentWillMount(){
        const email = localStorage.getItem("email");
        const searchLink = '/vote?email=' + email;
        Network.GetRequest(searchLink).then((res)=>{
            this.setState({pollsInfo: res});
        });
    }


    render() {
        return (
            <div className="body-search">
                <DefaultNavbar/>
                <TitleComponent title='لیست جلسات'/>
                <div className="content">
                    <PollList pollsInfo={this.state.pollsInfo}/>
                </div>
            </div>
        );
    }
}

export default ListPage;
