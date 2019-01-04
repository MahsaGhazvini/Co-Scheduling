import React, { Component } from 'react';
import {withRouter} from 'react-router';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class ReplyShow extends Component {
    constructor(props){
        super();
        this.state = {
            reply: props.reply
        };
        this.handleReply = this.handleReply.bind(this);
    }

    handleReply(){
        this.props.onReply(this.state.reply);
    }

    render() {
        return (
            <div className="reply-box">
                <div className="sage-color">
                    کاربر:
                    {this.state.reply.owner}
                </div>
                {this.state.reply.content}
                <div onClick={this.handleReply} className="float-left text-left">
                    <FontAwesomeIcon style={{color:"rgb(137, 154, 99)",cursor: "pointer"}}
                                     icon="reply"
                    />
                </div>
            </div>)
    }
}

export default withRouter(ReplyShow);
