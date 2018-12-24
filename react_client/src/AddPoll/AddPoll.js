import React, { Component } from 'react';
import DefaultNavbar from '../Common/DefaultNavbar';
import TitleComponent from '../Common/TitleComponent';
// import * as Network from "../Common/RequestMaker";

//const request = require('request');

class HomePage extends Component {
    constructor(props){
        super(props);

        this.state = {
            title: '',
            description: '',
            members: [],
            options: [],
            members_email: [],
            options_title: [],
            email: '',
            option: ''
        };
        this.submitAddMail = this.submitAddMail.bind(this);
        this.submitAddOption = this.submitAddOption.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }

    submitAddMail(event) {
        this.state.members.push(this.state.email);
        this.state.members_email.push({'email': this.state.email});
        this.setState({email: ''});
    }

    submitAddOption(event){
        this.state.options.push(this.state.option);
        this.state.options_title.push({'title': this.state.option});
        this.setState({option: ''});
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    submitForm(event){
        let data = {};
        data['creator'] = JSON.stringify({email: localStorage.getItem("email")});
        data['title']= this.state.title;
        data['description']= this.state.description;
        data['members']= JSON.stringify(this.state.members_email);
        data['options']= JSON.stringify(this.state.options_title);
        console.log(JSON.stringify(data, null, 2));
        // Network.PostRequest('/createPoll', JSON.stringify(data)).then((res)=>{
        //     console.log(res);
        // });
    }

    render() {
        return (
            <div className="body-add-poll">
                <DefaultNavbar/>
                <TitleComponent title="اضافه کردن نظرسنجی جدید"/>

                <div className="container description">
                    <div className="row input-box">
                        <input type="text" id="title" onChange={this.handleChange} className="input-tag" name="title" placeholder="عنوان"/>
                    </div>
                    <div className="row input-box">
                        <input type="text" id="description" onChange={this.handleChange} className="input-tag" name="description" placeholder="توضیحات"/>
                    </div>

                    <div className="row input-box">
                        <div className="col-md-6 input">
                            <input type="text" id="email" className="input-tag" name="email" onChange={this.handleChange} value={this.state.email} placeholder="ایمیل بعدی را وارد کنید."/>
                            <input type="submit" value="اضافه کردن ایمیل" onClick={this.submitAddMail} className="submit add-poll-submit"/>
                        </div>
                        <div className="col-md-6 input">
                            <input id="members" type="text" className="input-tag" name="members" value={this.state.members} placeholder="اعضا"/>
                        </div>
                    </div>

                    <div className="row input-box">
                        <div className="col-md-6 input">
                            <input type="text" id="option" className="input-tag" name="option" onChange={this.handleChange} value={this.state.option} placeholder="گزینه بعدی را وارد کنید."/>
                            <input type="submit" value="اضافه کردن گزینه" onClick={this.submitAddOption} className="submit add-poll-submit"/>
                        </div>
                        <div className="col-md-6 input">
                            <input id="options" type="text" className="input-tag" name="options" value={this.state.options} placeholder="گزینه‌ها"/>
                        </div>
                    </div>


                    <div className="row">
                        <div className="col-md-4">
                            <input type="submit" value="ثبت نظرسنجی" onClick={this.submitForm} className="submit add-poll-submit"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomePage;


