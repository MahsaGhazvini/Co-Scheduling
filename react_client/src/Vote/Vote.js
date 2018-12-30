import React, { Component } from 'react';
import * as Network from '../Common/RequestMaker';
import DefaultNavbar from '../Common/DefaultNavbar';
import TitleComponent from '../Common/TitleComponent';
import './../Styles/common.css';
import OptionsList from './OptionsList';
class Vote extends Component {
    constructor(){
        super()

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
        const link = '/vote/'+this.props.match.params.pollId+'?email='+email;
        Network.GetRequest(link).then((res)=>{
            if(res !== undefined){
                this.setState({options: res.options});
                this.setState({active: res.active});
                this.setState({description: res.description});
                this.setState({title: res.title});
                this.setState({formId: res.id});
            }
        });
    }

    render() {
        return (
            <div id="vote-view">
                <DefaultNavbar/>
                <TitleComponent title='جزئیات جلسه'/>
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
                        <OptionsList options={this.state.options} formId={this.state.formId} isActive={this.state.active}/>

                </div>
            </div>
        );
    }
}

export default Vote;
