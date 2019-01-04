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
                <div style={{display: (this.state.reply.replyTo) ? 'block':'none'}}>
                    <div className="row" style={{color:"rgb(137, 154, 99)", "font-size": "12px"}}>
                        <FontAwesomeIcon style={{cursor: "pointer","margin-right": "50px", "margin-left": "30px"}}
                                         icon="reply"
                        />
                        <div id="reply-show">
                            {(this.state.reply.replyTo)? this.props.replyTo: ""}
                        </div>
                    </div>
                </div>
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
