import React, { Component } from 'react';
import DefaultNavbar from '../Common/DefaultNavbar';
import TitleComponent from '../Common/TitleComponent';
import * as Network from "../Common/RequestMaker";
import InformationBox from "../Common/InformationBox";
import Footer from "../Common/Footer";

class HomePage extends Component {
    constructor(props){
        super(props);

        this.getValue = this.getValue.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.getVisibleElements = this.getVisibleElements.bind(this);
    }

    getValue(idName){
        var node = document.getElementById(idName);
        return node.value;
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

    submitForm(event){
        let data = new URLSearchParams();
        const members_email = this.getVisibleElements("addMail").map(mail=> {return {"email": mail}});
        const options_title = this.getVisibleElements("addOption").map(option => {return {"title": option}});
        data.append("creator", JSON.stringify({email: localStorage.getItem("email")}));
        data.append("title", this.getValue("title"));
        data.append("description", this.getValue("description"));
        data.append("members", JSON.stringify(members_email));
        data.append("options", JSON.stringify(options_title));
        Network.PostRequest('http://localhost:3000/createPoll', data).then((res)=>{
            console.log(res);
            this.props.history.push({pathname: '/listPage'});
        });
    }

    render() {
        return (
            <div>
                <InformationBox title='' description='' server={"editPoll"}/>
                <div className="container">
                    <input type="submit" value={"ثبت نظرسنجی"} onClick={this.submitForm} className="submit add-poll-submit"/>
                </div>

                <Footer/>
            </div>
        );
    }
}

export default HomePage;


