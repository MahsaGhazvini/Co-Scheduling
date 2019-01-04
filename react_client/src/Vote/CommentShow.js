import React, { Component } from 'react';
import {withRouter} from 'react-router';
import ReplyShow from './ReplyShow';
import * as Network from "../Common/RequestMaker";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class CommentShow extends Component {
    constructor(props){
        super();
        this.state = {
            comment: props.comment,
            replyBox: false,
            addReply : false,
            replyMessage: "",
            replies: [],
            replyTo: null
        };
        this.showReplyBox = this.showReplyBox.bind(this);
        this.showAddReplyBox = this.showAddReplyBox.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addNewReply = this.addNewReply.bind(this);
        this.setReply = this.setReply.bind(this);
        this.undoReply = this.undoReply.bind(this);
    }

    async componentWillMount(){
        const email = localStorage.getItem("email");
        const link = '/comment/getReplies?email='+email+'&commentId='+this.state.comment.commentId;
        await Network.GetRequest(link).then(res=>{
            this.setState({replies:res})
        });
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

    undoReply(){
        this.setState({replyTo: null})
    }

    addNewReply(even){
        let data = new URLSearchParams();
        data.append("owner", localStorage.getItem("email"));
        data.append("content", this.state.replyMessage);
        data.append("commentId", this.state.comment.commentId);
        if(this.state.replyTo)
            data.append("replyTo",this.state.replyTo.id);
        Network.PostRequest('http://localhost:3000/comment/addReply', data).then((res)=>{
            console.log(res);
        });
        this.setState({replyMessage: ""});
        this.setState({replyTo: null});
        this.componentWillMount();
    }

    setReply(reply){
        console.log("set Reply",reply.id);
        this.setState({replyTo: reply});
    }

    render() {
        const reply_items = [];
        for(let i=0;i<this.state.replies.length;i++){
            reply_items.push(
                <ReplyShow reply={this.state.replies[i]} onReply={(reply)=>this.setReply(reply)}/>
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
                <button className="sage-button" style={{margin:"10px", display: this.state.replies.length ? 'inline' : 'none'}} onClick={this.showReplyBox}>پاسخ ها</button>


                <div style={{display: this.state.replyBox ? 'block' : 'none' }}>
                    {reply_items}
                </div>

                <div className="col-md-12" style={{display: this.state.addReply ? 'block' : 'none' }}>
                    <div style={{display: (this.state.replyTo) ? 'block':'none'}}>
                        <div className="row" style={{color:"rgb(137, 154, 99)", "font-size": "12px"}}>
                            <button onClick={this.undoReply} className="sage-button" style={{"margin-right":"20px"}} >&times;</button>
                            <FontAwesomeIcon style={{cursor: "pointer","margin-right": "50px", "margin-left": "30px"}}
                                             icon="reply"
                            />
                            {(this.state.replyTo)? this.state.replyTo.owner : ""}
                        </div>
                        <div id="reply-text">
                            {(this.state.replyTo)? this.state.replyTo.content: ""}
                        </div>
                    </div>
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
