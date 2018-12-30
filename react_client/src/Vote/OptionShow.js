import React, { Component } from 'react';
import {withRouter} from 'react-router';
import * as Network from './../Common/RequestMaker';

class OptionShow extends Component {
    constructor(props){
        super();
        console.log(props.option);
        this.state = {
            ourVote: props.option.ourChoice
        };
        // radio.value(props.option.ourChoice);
        this.handleRadioChange = this.handleRadioChange.bind(this);
    }

    handleRadioChange(event){
        this.setState({outVote: event.target.value});
        const email = localStorage.getItem("email");
        const URL = '/vote/'+this.props.formId+'/'+this.props.option.id+'/'+event.target.value;
        let data = new URLSearchParams();
        data.append('email', email);
        Network.PostRequest(URL, data).then((res)=>{
            console.log('------',res);
        });
    }

    render() {
        return (
            <div className="col-lg-6 col-md-6">
                <div className="box1">
                    <div className={"card h-100 poll-box"}>
                        <div className="card-body row">
                            <div className="card-body line">{this.props.option.description}</div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="col-md-6 float-right">
                                    <input id={"notVoted"+this.props.option.id} type="radio" name={"ourVote"+this.props.option.id} value="notVoted" onChange={this.handleRadioChange} className="input"/><span className="white-color radio-box">بدون نظر</span>
                                </div>
                                <div className="col-md-6 float-left">
                                    <input id={"maybe"+this.props.option.id} type="radio" name={"ourVote"+this.props.option.id} value="maybe" onChange={this.handleRadioChange}  className="input"/><span className="white-color radio-box">شاید بتوانم</span>
                                </div>
                                <div className="col-md-6 float-left">
                                <input id={"agree"+this.props.option.id} type="radio" name={"ourVote"+this.props.option.id} value="agree" onChange={this.handleRadioChange}  className="input"/><span className="white-color radio-box">می‌توانم</span>
                                </div>
                                <div className="col-md-6 float-left">
                                    <input id={"disagree"+this.props.option.id} type="radio" name={"ourVote"+this.props.option.id} value="disagree" onChange={this.handleRadioChange}  className="input"/><span className="white-color radio-box">نمی‌توانم</span>
                                </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(OptionShow);
