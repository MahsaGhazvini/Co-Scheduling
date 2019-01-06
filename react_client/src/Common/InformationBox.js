import React, { Component } from 'react';
import DefaultNavbar from '../Common/DefaultNavbar';
import TitleComponent from '../Common/TitleComponent';

class InformationBox extends Component {
    constructor(props){
        super(props);

        this.state = {
            title: this.props.title,
            description: this.props.description,
            members_email: [],
            options_title: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.newItem = this.newItem.bind(this);
        this.addMail = this.addMail.bind(this);
        this.addOption = this.addOption.bind(this);
    }

    componentDidMount(){
        if(this.props.options){
            var i;
            for(i=0;i<this.props.options.length;i++){
                var option = this.props.options[i];
                var event;
                this.newItem(event,"addOption",option.data.description, "old");
            }
        }
    }

    newItem(event,inputName, inputValue, newOrOld){
        var li = document.createElement("li");
        li.className = inputName+" "+newOrOld;
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
        this.newItem(event,"addMail", inputValue, "new");
    }

    addOption(event){
        var inputValue = document.getElementById("addOption").value;
        this.newItem(event,"addOption",inputValue, "new");
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    render() {
        return (
            <div className="body-add-poll">
                <DefaultNavbar/>
                <TitleComponent title={(this.state.server === "editPoll")? "ویرایش نظرسنجی" :"اضافه کردن نظرسنجی جدید"}/>

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

                        <div className="input-box col-md-6" style={{"display":(this.props.title)?"none":"block"}}>
                            <div id="myDIV" className="header">
                                <input type="text" id="addMail" placeholder="ایمیل بعدی را وارد کنید..."/>
                                <span onClick={this.addMail} className="addBtn">Add</span>
                            </div>

                            <ul id="myUL-addMail"> </ul>
                        </div>


                    </div>
                </div>
            </div>
        );
    }
}

export default InformationBox;


