import React, { Component } from 'react';
import {withRouter} from 'react-router';
import * as Network from './../Common/RequestMaker';

/*import {FontAwesomeIcon} from './../../node_modules/@fortawesome/react-fontawesome';*/
//import Popup from './../../node_modules/reactjs-popup';
import {FontAwesomeIcon} from './../../node_modules/@fortawesome/react-fontawesome';

import Modal from './../../node_modules/react-modal';

const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        height                : '400px',
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
            addReply : false
        };
        // radio.value(props.option.ourChoice);
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.showReplyBox = this.showReplyBox.bind(this);
        this.showAddReplyBox = this.showAddReplyBox.bind(this);
    }

    async componentWillMount(){
        const email = localStorage.getItem("email");
        const link = '/comment/getComments?email='+email+'&optionId='+this.state.optionId;
        let simpleComments=[]
        await Network.GetRequest(link).then(async (res)=>{
            simpleComments = res;
        });
        const comments_promise = Promise.all(simpleComments.map(async comment=>{
            const link2 = '/comment/getReplies?email='+email+'&commentId='+comment.id;
            let res_req;
            await Network.GetRequest(link2).then(res2=>{
                res_req = res2;
            });
            return {
                commentId: comment.id,
                owner: comment.owner,
                content: comment.content,
                replies: res_req
            }
        }));
        comments_promise.then(comments=>{
            this.setState({comments: comments});
            console.log(this.state.comments);
        })
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

    showReplyBox(){
        this.setState({replyBox : true});
    }

    showAddReplyBox(){
        this.setState({addReply : true});
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
                                <div className="col-md-12">
                                    <div className="col-md-6 float-right">
                                    <input id={"notVoted"+this.props.option.id} type="radio"
                                           name={"ourVote"+this.props.option.id} value="notVoted"
                                           onChange={this.handleRadioChange} className="input"/>
                                        <span className="white-color radio-box">بدون نظر</span>
                                    </div>
                                    <div className="col-md-6 float-left">
                                        <div onClick={this.openModal} className="float-left text-left">
                                        <FontAwesomeIcon style={{color:"rgb(137, 154, 99)",cursor: "pointer"}}
                                            icon="comments"
                                        />
                                        </div>
                                       {/* <button onClick={this.openModal} className="sage-button btn float-left">نظرات</button>*/}
                                        <Modal
                                            isOpen={this.state.modalIsOpen}
                                            onAfterOpen={this.afterOpenModal}
                                            onRequestClose={this.closeModal}
                                            style={customStyles}
                                            contentLabel="Example Modal"
                                        >
                                            <div className="col-md-12" style={{"margin-bottom":"25px"}}>

                                                <button onClick={this.closeModal} className="float-left sage-button" >&times;</button>
                                                <h2 ref={subtitle => this.subtitle = subtitle}>نظرات</h2>


                                            </div>
                                            <div className="comment-box">
                                            <div style={{"padding-right":"10px"}}>
                                            کاربر:
                                            <span className="sage-color f12">aa@gmail.com</span>
                                            </div>
                                            <div className="col-md-12 comment-text-box">

                                                سلام. بسیار عالی هستش من گوشی آیفون ۷پلاس رو تقریبا شش بار شارژ میکنم. اندازه بسیار مناسب و قسنگی داره. تنها ایرادش اینه که خودش دیر شارژ میشه حدودا ۸ ساعت طول میکشه سارژش از صفر به ۱۰۰ برسه که به نظر من میشه باهاش کنار اومد میشه شب بزنی به شارژ و صبح ورش داری. من این مدل رو پیشنهاد میکنم.
                                                سلام. بسیار عالی هستش من گوشی آیفون ۷پلاس رو تقریبا شش بار شارژ میکنم. اندازه بسیار مناسب و قسنگی داره. تنها ایرادش اینه که خودش دیر شارژ میشه حدودا ۸ ساعت طول میکشه سارژش از صفر به ۱۰۰ برسه که به نظر من میشه باهاش کنار اومد میشه شب بزنی به شارژ و صبح ورش داری. من این مدل رو پیشنهاد میکنم.
                                                سلام. بسیار عالی هستش من گوشی آیفون ۷پلاس رو تقریبا شش بار شارژ میکنم. اندازه بسیار مناسب و قسنگی داره. تنها ایرادش اینه که خودش دیر شارژ میشه حدودا ۸ ساعت طول میکشه سارژش از صفر به ۱۰۰ برسه که به نظر من میشه باهاش کنار اومد میشه شب بزنی به شارژ و صبح ورش داری. من این مدل رو پیشنهاد میکنم.
                                            </div>
                                                <button className="sage-button" style={{margin:"10px"}} onClick={this.showAddReplyBox}>افزودن نظر</button>
                                                <button className="sage-button" style={{margin:"10px"}} onClick={this.showReplyBox}>پاسخ ها</button>

                                                <div className="reply-box" style={{display: this.state.replyBox ? 'block' : 'none' }}>
                                                    <div className="sage-color">
                                                    کاربر:
                                                    sss@gmail.com
                                                    </div>
                                                    دوستان عزیز، شتاب‌زده عمل نکردم و پس از دو ماه استفاده نظر خودم را اعلام می‌کنم. این پاوربانک علی‌رغم زیبایی و سبکی متأسفانه ضعیف است. زمانی‌که گوشی را با آن شارژ می‌کنم، زودتر از حالت معمول شارژ خالی می‌کند.این پاور پس از یک زمان شارژ طولانی بازدهی خوبی هم ندارد.
                                                </div>

                                                <form style={{display: this.state.addReply ? 'block' : 'none' }} className="text-area">
                                                    <textarea name="message" rows="4" cols="60" placeholder="پاسخ به نظر ..."></textarea>
                                                </form>
                                            </div>
                                            <div className="col-md-12 comment-box">
                                                سلام. بسیار عالی هستش من گوشی آیفون ۷پلاس رو تقریبا شش بار شارژ میکنم. اندازه بسیار مناسب و قسنگی داره. تنها ایرادش اینه که خودش دیر شارژ میشه حدودا ۸ ساعت طول میکشه سارژش از صفر به ۱۰۰ برسه که به نظر من میشه باهاش کنار اومد میشه شب بزنی به شارژ و صبح ورش داری. من این مدل رو پیشنهاد میکنم.

                                            </div>
                                        </Modal>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="col-md-6 float-right">
                                        <input id={"maybe"+this.props.option.id} type="radio"
                                               name={"ourVote"+this.props.option.id} value="maybe"
                                               onChange={this.handleRadioChange}  className="input"/>
                                        <span className="white-color radio-box">شاید بتوانم</span>
                                    </div>
                                    <div className="col-md-6 float-left">
                                        <div onClick={this.openModal} className="float-left text-left">
                                            <FontAwesomeIcon style={{color:"rgb(137, 154, 99)",cursor: "pointer"}}
                                                             icon="comments"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="col-md-6 float-right">
                                        <input id={"agree"+this.props.option.id} type="radio"
                                               name={"ourVote"+this.props.option.id} value="agree"
                                               onChange={this.handleRadioChange}  className="input"/>
                                        <span className="white-color radio-box">می‌توانم</span>
                                    </div>
                                    <div className="col-md-6 float-left">
                                        <div onClick={this.openModal} className="float-left text-left">
                                            <FontAwesomeIcon style={{color:"rgb(137, 154, 99)",cursor: "pointer"}}
                                                             icon="comments"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <div className="col-md-6 float-right">
                                        <input id={"disagree"+this.props.option.id} type="radio"
                                               name={"ourVote"+this.props.option.id} value="disagree"
                                               onChange={this.handleRadioChange}  className="input"/>
                                        <span className="white-color radio-box">نمی‌توانم</span>
                                    </div>
                                    <div className="col-md-6 float-left">
                                        <div onClick={this.openModal} className="float-left text-left">
                                            <FontAwesomeIcon style={{color:"rgb(137, 154, 99)",cursor: "pointer"}}
                                                             icon="comments"
                                            />
                                        </div>
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
