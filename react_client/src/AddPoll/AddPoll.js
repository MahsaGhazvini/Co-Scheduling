import React, { Component } from 'react';
import DefaultNavbar from '../Common/DefaultNavbar';
import TitleComponent from '../Common/TitleComponent';
import * as Network from "../Common/RequestMaker";
import Footer from "../Common/Footer";

//const request = require('request');

class HomePage extends Component {
    constructor(props){
        super(props);

        this.state = {
            title: '',
            description: '',
            members: '',
            options: '',
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
        this.setState({members: this.state.members + ',' + this.state.email});
        this.state.members_email.push({'email': this.state.email});
        this.setState({email: ''});
    }

    submitAddOption(event){
        this.setState({options: this.state.options + ',' + this.state.option});
        this.state.options_title.push({'title': this.state.option});
        this.setState({option: ''});
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    submitForm(event){
        let data = new URLSearchParams();
        data.append("creator", JSON.stringify({email: localStorage.getItem("email")}));
        data.append("title", this.state.title);
        data.append("description", this.state.description);
        data.append("members", JSON.stringify(this.state.members_email));
        data.append("options", JSON.stringify(this.state.options_title));
        Network.PostRequest('http://localhost:3000/createPoll', data).then((res)=>{
            console.log(res);
            this.props.history.push({pathname: '/listPage'});
        });
    }

    render() {
        return (
            <div className="body-add-poll">
                <DefaultNavbar/>
                <TitleComponent title="اضافه کردن نظرسنجی جدید"/>

                <div className="container description">
                    <div className="row">
                    <div className="input-box col-md-6">
                        <input type="text" id="title" onChange={this.handleChange} className="input-tag input-radius" name="title" placeholder="عنوان"/>
                    </div>
                    <div className="input-box margin-bottom col-md-6">
                        <input type="text" id="description" onChange={this.handleChange} className="input-tag input-radius" name="description" placeholder="توضیحات"/>
                    </div>
                    </div>


                <div className=" row margin-bottom">
                    <div className="input-box col-md-6">
                        <div className=" input">
                            <input type="text" id="email" className="input-tag input-radius col-md-7 " name="email" onChange={this.handleChange} value={this.state.email} placeholder="ایمیل بعدی را وارد کنید."/>
                            <input type="submit" value="اضافه کردن ایمیل" onClick={this.submitAddMail} className="col-md-4 submit add-poll-submit"/>
                        </div>
                        <div className=" input">
                            <input id="members" type="text" className="input-tag input-radius input-block" name="members" value={this.state.members} placeholder="اعضا"/>
                        </div>
                    </div>

                    <div className=" input-box col-md-6">
                        <div className=" input">
                            <input type="text" id="option" className="input-tag input-radius col-md-7" name="option" onChange={this.handleChange} value={this.state.option} placeholder="گزینه بعدی را وارد کنید."/>
                            <input type="submit" value="اضافه کردن گزینه" onClick={this.submitAddOption} className="col-md-4 submit add-poll-submit"/>
                        </div>
                        <div className=" input">
                            <input id="options" type="text" className="input-tag input-radius input-block" name="options" value={this.state.options} placeholder="گزینه‌ها"/>
                        </div>
                    </div>

                </div>
                        <div className="">
                            <input type="submit" value="ثبت نظرسنجی" onClick={this.submitForm} className="submit add-poll-submit"/>
                        </div>
                </div>
            </div>
        );
    }
}

export default HomePage;


