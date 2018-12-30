import React, { Component } from 'react';
import * as Network from '../Common/RequestMaker';
import DefaultNavbar from '../Common/DefaultNavbar';
import TitleComponent from '../Common/TitleComponent';

import ManageOptionList from './ManageOptionList';
import './../Styles/common.css';

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
        return (
            <div id="managePolls-view">
                <DefaultNavbar/>
                <TitleComponent title='مدیریت جلسه'/>
                <div className="container content-container">
                        <div className="card h-100 poll-box" style={{marginBottom:"50px",display: (this.state.formId === -1)? 'none': 'flex'}}>

                            <div className = "poll-title">
                                <span className="col-md-6" style={{float:"right"}}>
                                    عنوان
                                </span>
                                <span className="col-md-6" >{this.state.title}</span>
                            </div>

                            <hr/>
                            <div className = "poll-info">
                                <span className="col-md-6" style={{float:"right"}}>
                                توضیحات
                                </span>
                                <span className="col-md-6" >{this.state.description}</span>
                            </div>
                        </div>
                        <ManageOptionList options={this.state.options} formId={this.state.formId} isActive={this.state.active}/>
                </div>
            </div>
        );
    }
}

export default ManagePolls;
