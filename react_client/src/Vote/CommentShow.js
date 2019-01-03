import React, { Component } from 'react';
import {withRouter} from 'react-router';
import ReplyShow from './ReplyShow';

class CommentShow extends Component {
    constructor(props){
        super();
        this.state = {
            comment: props.comment,
            replyBox: false,
            addReply : false
        };
        this.showReplyBox = this.showReplyBox.bind(this);
        this.showAddReplyBox = this.showAddReplyBox.bind(this);
    }

    componentWillMount(){
        console.log("*****",this.state.comment);
    }

    showReplyBox(){
        this.setState({replyBox : true});
    }

    showAddReplyBox(){
        this.setState({addReply : true});
    }


    render() {
        const reply_items = [];
        for(let i=0;i<this.state.comment.replies.length;i++){
            reply_items.push(
                <ReplyShow reply={this.state.comment.replies[i]}/>
            )
        }
        return (
            <div className="comment-box">
                <div style={{"padding-right":"10px"}}>
                    کاربر:
                    <span className="sage-color f12">{this.state.comment.owner}</span>
                </div>
                <div className="col-md-12 comment-text-box">
                    {this.state.comment.content}
                </div>
                <button className="sage-button" style={{margin:"10px"}} onClick={this.showAddReplyBox}>افزودن نظر</button>
                <button className="sage-button" style={{margin:"10px"}} onClick={this.showReplyBox}>پاسخ ها</button>

                <div style={{display: this.state.replyBox ? 'block' : 'none' }}>
                    {reply_items}
                </div>


                <form style={{display: this.state.addReply ? 'block' : 'none' }} className="text-area">
                    <textarea name="message" rows="4" cols="60" placeholder="پاسخ به نظر ..."></textarea>
                </form>
            </div>
        );
    }
}

export default withRouter(CommentShow);
