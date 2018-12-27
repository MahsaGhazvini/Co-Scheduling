import React, { Component } from 'react';
import {withRouter} from 'react-router';
import * as Network from "../Common/RequestMaker";

class ManageOptionShow extends Component {
    constructor(props){
        super();
        this.state = {
            isFinalized: props.option.data.isFinalized,
            votes: props.option.data.votes
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event){
        const email = localStorage.getItem("email");
        const URL = '/managePolls/'+this.props.formId+'/'+this.props.option.id;
        let data = new URLSearchParams();
        data.append('email', email);
        Network.PostRequest(URL, data).then((res)=>{
            console.log('------',res);
        });
    }

    render() {
        return (
            <div className="col-lg-6">
                <div className="box1">
                    <div className={"card h-100 poll-box"} style={{"background-color": (this.state.isFinalized)? 'green': 'white'}}>
                        <div className="card-body" onClick={this.handleClick}>
                            <div className="card-body line">{this.props.option.data.description}</div>
                            <hr/>
                            <div class="row"> <span>تعداد افراد موافق:</span> <span>{this.state.votes.agree}</span> </div>
                            <div className="row"><span>تعداد افراد مخالف:</span> <span>{this.state.votes.disagree}</span></div>
                            <div className="row"><span>تعداد افراد خنثی:</span> <span>{this.state.votes.maybe}</span></div>
                            <div className="row"><span>تعداد افراد رای نداده:</span> <span>{this.state.votes.notVoted}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ManageOptionShow);
