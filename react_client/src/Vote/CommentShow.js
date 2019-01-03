import React, { Component } from 'react';
import {withRouter} from 'react-router';
import ReplyShow from './ReplyShow';
import * as Network from "../Common/RequestMaker";

class CommentShow extends Component {
    constructor(props){
        super();
        this.state = {
            comment: props.comment,
            replyBox: false,
            addReply : false,
            replyMessage: "",
            reply_items: []
        };
        this.showReplyBox = this.showReplyBox.bind(this);
        this.showAddReplyBox = this.showAddReplyBox.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addNewReply = this.addNewReply.bind(this);
    }

    showReplyBox(){
        this.setState({replyBox : !this.state.replyBox});
    }

    showAddReplyBox(){
        this.setState({addReply : !this.state.addReply});
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    addNewReply(even){
        let data = new URLSearchParams();
        data.append("owner", localStorage.getItem("email"));
        data.append("content", this.state.replyMessage);
        data.append("commentId", this.state.comment.commentId);
        Network.PostRequest('http://localhost:3000/comment/addReply', data).then((res)=>{
            console.log(res);
        });
        this.setState({replyMessage: ""});
    }

    render() {
        for(let i=0;i<this.state.comment.replies.length;i++){
            this.state.reply_items.push(
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
                <button className="sage-button" style={{margin:"10px"}} onClick={this.showAddReplyBox}>افزودن پاسخ</button>
                <button className="sage-button" style={{margin:"10px", display: this.state.comment.replies.length ? 'inline' : 'none'}} onClick={this.showReplyBox}>پاسخ ها</button>


                <div style={{display: this.state.replyBox ? 'block' : 'none' }}>
                    {this.state.reply_items}
                </div>

                <div className="col-md-12" style={{display: this.state.addReply ? 'block' : 'none' }}>
                    <div className="row">
                        <form className="text-area">
                            <textarea name="replyMessage" rows="4" cols="60" placeholder="پاسخ به نظر ..." onChange={this.handleChange} value={this.state.replyMessage}></textarea>
                        </form>
                        <button className="sage-button" id="reply-button" onClick={this.addNewReply}>افزودن پاسخ</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(CommentShow);
