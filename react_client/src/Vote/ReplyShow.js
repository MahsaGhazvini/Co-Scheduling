import React, { Component } from 'react';
import {withRouter} from 'react-router';

class ReplyShow extends Component {
    constructor(props){
        super();
        this.state = {
            reply: props.reply
        };
    }

    render() {
        return (
            <div className="reply-box">
                <div className="sage-color">
                    کاربر:
                    {this.state.reply.owner}
                </div>
                {this.state.reply.content}
            </div>)
    }
}

export default withRouter(ReplyShow);
