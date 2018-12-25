import React, { Component } from 'react';
import * as Network from './../Common/RequestMaker';

import DefaultNavbar from '../Common/DefaultNavbar';
import TitleComponent from '../Common/TitleComponent';
import PollList from './PollList';
import './../Styles/common.css';
import './../Styles/login.css';
import './../Styles/listStyle.css';

class ListPage extends Component {
    constructor(){
        super()

        this.state = {
            activatePollsInfo:[],
            deactivatePollsInfo: [],
            manageActivatePollsInfo: [],
            manageDeactivatePollsInfo: []
        }
    }

     getPolls(microServiceName, email, active, stateName) {
        const searchLink = '/' + microServiceName + '?email=' + email + '&active=' + active;
        Network.GetRequest(searchLink).then((res)=>{
            this.setState({[stateName] : res});
        });
    }

    componentWillMount(){
        const email = localStorage.getItem("email");
        this.getPolls('vote',email,1,'activatePollsInfo');
        this.getPolls('vote',email,0,'deactivatePollsInfo');
        this.getPolls('managePolls',email,1,'manageActivatePollsInfo');
        this.getPolls('managePolls',email,0,'manageDeactivatePollsInfo');
    }


    render() {
        return (
            <div className="list-page">
                <DefaultNavbar/>
                <TitleComponent title='لیست جلسات'/>
                <div className="content">
                    <PollList pollsInfo={this.state.activatePollsInfo} message={"برای ورود به صفحه‌ی هر نظرسنجی فعال روی آن کلیک کنید"} server={'vote'}/>
                    <PollList pollsInfo={this.state.deactivatePollsInfo} message={"...نظرسنجی‌های غیرفعال..."} server={'vote'}/>
                    <PollList pollsInfo={this.state.manageActivatePollsInfo} message={"برای ورود به صفحه‌ی مدیریت هر نظرسنجی فعال روی آن کلیک کنید"} server={'managePolls'}/>
                    <PollList pollsInfo={this.state.manageDeactivatePollsInfo} message={"...مدیریت نظرسنجی‌های غیرفعال..."} server={'managePolls'}/>
                    <div className="container col-md-6 col-md-offset-3 add-poll"><a href="/addPoll">ایجاد نظرسنجی جدید</a></div>
                </div>
            </div>
        );
    }
}

export default ListPage;
