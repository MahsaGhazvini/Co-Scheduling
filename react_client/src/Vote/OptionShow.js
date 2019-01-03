import React, { Component } from 'react';
import {withRouter} from 'react-router';
import * as Network from './../Common/RequestMaker';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CommentShow from './CommentShow';

import Modal from './../../node_modules/react-modal';

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        height                : '700px',
        width                 : '75%'
    }
};

class OptionShow extends Component {
    constructor(props){
        super();
        console.log(props.option);
        this.state = {
            ourVote: props.option.ourChoice,
            optionId: props.option.id,
            comments: [],
            modalIsOpen: false,
            replyBox: false,
            addReply : false,
            newComment: ""
        };
        // radio.value(props.option.ourChoice);
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addNewComment = this.addNewComment.bind(this);
    }

    async componentWillMount(){
        const email = localStorage.getItem("email");
        const link = '/comment/getComments?email='+email+'&optionId='+this.state.optionId;
        let simpleComments=[]
        await Network.GetRequest(link).then(async (res)=>{
            simpleComments = res;
        });
        const comments_promise = Promise.all(simpleComments.map(async comment=>{
            return {
                commentId: comment.id,
                owner: comment.owner,
                content: comment.content
            }
        }));
        comments_promise.then(comments=>{
            this.setState({comments: comments});
            console.log(this.state.comments);
        })
    }

    addNewComment(event){
        let data = new URLSearchParams();
        data.append("owner", localStorage.getItem("email"));
        data.append("content", this.state.newComment);
        data.append("optionId", this.state.optionId);
        Network.PostRequest('http://localhost:3000/comment/addComment', data).then((res)=>{
            console.log(res);
        });
        this.setState({newComment: ""});
        this.componentWillMount();
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
    openModal() {
        this.setState({modalIsOpen: true});
    }

    afterOpenModal() {
        this.subtitle.style.color = 'rgb(137, 154, 99)';
    }

    closeModal() {
        this.setState({modalIsOpen: false});
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }


    render() {
        const comment_items = [];
        for(let i=0;i<this.state.comments.length;i++){
            comment_items.push(
                <CommentShow comment={this.state.comments[i]}/>
            )
        }
        return (
            <div className="col-lg-6 col-md-6">
                <div className="box1">
                    <div className={"card h-100 poll-box"}>
                        <div className="card-body row">
                            <div className="card-body line">{this.props.option.description}

                                <div className="col-md-6 float-left">
                                    <div onClick={this.openModal} className="float-left text-left">
                                        <FontAwesomeIcon style={{color:"rgb(137, 154, 99)",cursor: "pointer"}}
                                                         icon="comments"
                                        />
                                    </div>
                                    <Modal
                                        isOpen={this.state.modalIsOpen}
                                        onAfterOpen={this.afterOpenModal}
                                        onRequestClose={this.closeModal}
                                        style={customStyles}
                                        contentLabel="Example Modal"
                                    >
                                        <div className="col-md-12" style={{"margin-bottom":"25px"}}>

                                            <button onClick={this.closeModal} className="float-left sage-button" >&times;</button>
                                            <div className="row">
                                                <form className="text-area">
                                                    <textarea onChange={this.handleChange} name="newComment" value={this.state.newComment} rows="4" cols="60" placeholder="نظر جدید ..."></textarea>
                                                </form>
                                                <button className="sage-button" onClick={this.addNewComment} id="comment-button">افزودن نظر</button>
                                            </div>
                                            <h2 ref={subtitle => this.subtitle = subtitle}>نظرات</h2>
                                        </div>

                                        {comment_items}

                                    </Modal>
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="col-md-12">
                                    <div className="col-md-6 float-right">
                                    <input id={"notVoted"+this.props.option.id} type="radio"
                                           name={"ourVote"+this.props.option.id} value="notVoted"
                                           onChange={this.handleRadioChange} className="input"/>
                                        <span className="white-color radio-box">بدون نظر</span>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="col-md-6 float-right">
                                        <input id={"maybe"+this.props.option.id} type="radio"
                                               name={"ourVote"+this.props.option.id} value="maybe"
                                               onChange={this.handleRadioChange}  className="input"/>
                                        <span className="white-color radio-box">شاید بتوانم</span>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="col-md-6 float-right">
                                        <input id={"agree"+this.props.option.id} type="radio"
                                               name={"ourVote"+this.props.option.id} value="agree"
                                               onChange={this.handleRadioChange}  className="input"/>
                                        <span className="white-color radio-box">می‌توانم</span>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="col-md-6 float-right">
                                        <input id={"disagree"+this.props.option.id} type="radio"
                                               name={"ourVote"+this.props.option.id} value="disagree"
                                               onChange={this.handleRadioChange}  className="input"/>
                                        <span className="white-color radio-box">نمی‌توانم</span>
                                    </div>
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
