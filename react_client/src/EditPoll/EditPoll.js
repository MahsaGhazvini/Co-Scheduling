import React, { Component } from 'react';
import * as Network from '../Common/RequestMaker';

import './../Styles/common.css';
import InformationBox from '../Common/InformationBox';


class ManagePolls extends Component {
    constructor(){
        super();

        this.state = {
            formId: -1,
            options: [],
            active: false,
            description: '',
            title: ''
        }
        this.submitForm = this.submitForm.bind(this);
        this.getChangeElement = this.getChangeElement.bind(this);
        this.getValue = this.getValue.bind(this);
    }

    getChangeElement(inputName, oldOrNew, display){
        var arr = [];
        var myNodelist = document.getElementsByClassName(inputName+" "+oldOrNew);
        var i;
        for (i = 0; i < myNodelist.length; i++) {
            var div = myNodelist[i];
            if(div.style.display === display || (display === 'block' && div.style.display !== 'none'))
                arr.push(div.childNodes[0].nodeValue);
        }
        return arr;
    }

    getValue(idName){
        var node = document.getElementById(idName);
        return node.value;
    }

    submitForm(event){
        const deleted = this.getChangeElement("addOption","old","none");
        const added = this.getChangeElement("addOption","new","block");
        console.log(this.state.title, this.state.description, "-> ",deleted, added);
        let data = new URLSearchParams();
        data.append("formId",this.state.formId);
        data.append("title", this.getValue("title"));
        data.append("description", this.getValue("description"));
        data.append("deletedOptions", JSON.stringify(deleted));
        data.append("addedOptions", JSON.stringify(added));
        data.append("editorMail", localStorage.getItem("email"));
        Network.PostRequest('http://localhost:3000/editPoll', data).then((res)=>{
            console.log(res);
            this.props.history.push({pathname: '/listPage'});
        });
    }

    componentWillMount(){
        const email = localStorage.getItem("email");
        const link = '/managePolls/'+this.props.match.params.pollId+'?email='+email;
        Network.GetRequest(link).then((res)=>{
            if(res !== undefined){
                this.setState(
                    {
                        options: Object.keys(res.options).map(o=>{
                            return {
                                id: o,
                                data: res.options[o]
                            };

                        })
                    });
                this.setState({active: res.active});
                this.setState({description: res.description});
                this.setState({title: res.title});
                this.setState({formId: res.id});
            }
        });
    }

    render() {
        if(this.state.title)
        return (
            <div>
                <InformationBox title={this.state.title} description={this.state.description} options={this.state.options} server={"editPoll"}/>
                <div className="container">
                    <input type="submit" value={"اعمال ویرایش"} onClick={this.submitForm} className="submit add-poll-submit"/>
                </div>
            </div>
        );
        else return (<div/>)
    }
}

export default ManagePolls;
