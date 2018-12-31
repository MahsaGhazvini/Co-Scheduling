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
            title: (this.props.title)? this.props.title : '',
            description: (this.props.description)? this.props.description : '',
            members_email: (this.props.members_email)? this.props.members_email : [],
            options_title: (this.props.options_title)? this.props.options_title : [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.newItem = this.newItem.bind(this);
        this.addMail = this.addMail.bind(this);
        this.addOption = this.addOption.bind(this);
        this.getVisibleElements = this.getVisibleElements.bind(this);
    }

    componentDidMount(){
        if(this.props.options){
            var i;
            for(i=0;i<this.props.options.length;i++){
                var option = this.props.options[i];
                console.log("*****",i,"-->",option);
                var event;
                this.newItem(event,"addOption",option.data.description);
            }
        }
    }

    newItem(event,inputName, inputValue){
        var li = document.createElement("li");
        li.className = inputName;
        var t = document.createTextNode(inputValue);
        li.appendChild(t);
        if (inputValue === '') {
            alert("You must write something!");
        } else {
            document.getElementById("myUL-"+inputName).appendChild(li);
        }
        document.getElementById(inputName).value = "";


        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.appendChild(txt);
        li.appendChild(span);
        span.onclick = function() {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }

    addMail(event){
        var inputValue = document.getElementById("addMail").value;
        this.newItem(event,"addMail", inputValue);
    }

    addOption(event){
        var inputValue = document.getElementById("addOption").value;
        this.newItem(event,"addOption",inputValue);
    }

    getVisibleElements(inputName){
        var arr = [];
        var myNodelist = document.getElementsByClassName(inputName);
        var i;
        for (i = 0; i < myNodelist.length; i++) {
            var div = myNodelist[i];
            if(div.style.display !== "none")
                arr.push(div.childNodes[0].nodeValue);
        }
        return arr;
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    submitForm(event){
        let data = new URLSearchParams();
        this.state.members_email = this.getVisibleElements("addMail").map(mail=> {return {"email": mail}});
        this.state.options_title = this.getVisibleElements("addOption").map(option => {return {"title": option}});
        // console.log(this.state.members_email, this.state.options_title);
        data.append("creator", JSON.stringify({email: localStorage.getItem("email")}));
        data.append("title", this.state.title);
        data.append("description", this.state.description);
        data.append("members", JSON.stringify(this.state.members_email));
        data.append("options", JSON.stringify(this.state.options_title));
        //console.log(this.state.members_email);
        Network.PostRequest('http://localhost:3000/createPoll', data).then((res)=>{
            console.log(res);
            this.props.history.push({pathname: '/listPage'});
        });
    }

    render() {
        return (
            <div className="body-add-poll">
                <DefaultNavbar/>
                <TitleComponent title={(this.props.titleComponent)? this.props.titleComponent :"اضافه کردن نظرسنجی جدید"}/>

                <div className="container description">
                    <div className="row">
                    <div className="input-box col-md-6">
                        <input type="text" id="title" onChange={this.handleChange} value={this.state.title} className="input-tag input-radius" name="title" placeholder="عنوان"/>
                    </div>
                    <div className="input-box margin-bottom col-md-6">
                        <input type="text" id="description" onChange={this.handleChange} value={this.state.description} className="input-tag input-radius" name="description" placeholder="توضیحات"/>
                    </div>
                    </div>


                <div className=" row margin-bottom arrayShow">
                    <div className=" input-box col-md-6">

                        <div id="myDIV" className="header">
                            <input type="text" id="addOption" placeholder="گزینه بعدی را وارد کنید..."/>
                            <span onClick={this.addOption} className="addBtn">Add</span>
                        </div>

                        <ul id="myUL-addOption"> </ul>
                    </div>

                    <div className="input-box col-md-6">
                        <div id="myDIV" className="header">
                            <input type="text" id="addMail" placeholder="ایمیل بعدی را وارد کنید..."/>
                            <span onClick={this.addMail} className="addBtn">Add</span>
                        </div>

                        <ul id="myUL-addMail"> </ul>
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


