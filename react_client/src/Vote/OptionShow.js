import React, { Component } from 'react';
import {withRouter} from 'react-router';
import * as Network from './../Common/RequestMaker';

/*import {FontAwesomeIcon} from './../../node_modules/@fortawesome/react-fontawesome';*/
//import Popup from './../../node_modules/reactjs-popup';

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
        width                 : '700px'
    }
};

class OptionShow extends Component {
    constructor(props){
        super();
        console.log(props.option);
        this.state = {
            ourVote: props.option.ourChoice,
            modalIsOpen: false
        };
        // radio.value(props.option.ourChoice);
        this.handleRadioChange = this.handleRadioChange.bind(this);



        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
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
                                    <input id={"notVoted"+this.props.option.id} type="radio" name={"ourVote"+this.props.option.id} value="notVoted" onChange={this.handleRadioChange} className="input"/><span className="white-color radio-box">بدون نظر</span>
                                    {/*<Popup trigger={<button> Trigger</button>} position="right center">
                                        <div>Popup content here !!</div>
                                    </Popup>
                                    <button className="float-left" onclick={this.showCommentBox}>نظر</button>
                                    <button>نظرات</button>*/}
                                    <div>
                                        <button onClick={this.openModal}>نظرات</button>
                                        <Modal
                                            isOpen={this.state.modalIsOpen}
                                            onAfterOpen={this.afterOpenModal}
                                            onRequestClose={this.closeModal}
                                            style={customStyles}
                                            contentLabel="Example Modal"
                                        >
                                            <div className="col-md-12">

                                                <button onClick={this.closeModal} className="float-left" >&times;</button>
                                                <h2 ref={subtitle => this.subtitle = subtitle}>نظرات</h2>


                                            </div>
                                            <div className="col-md-12 comment-box">
                                                سلام. بسیار عالی هستش من گوشی آیفون ۷پلاس رو تقریبا شش بار شارژ میکنم. اندازه بسیار مناسب و قسنگی داره. تنها ایرادش اینه که خودش دیر شارژ میشه حدودا ۸ ساعت طول میکشه سارژش از صفر به ۱۰۰ برسه که به نظر من میشه باهاش کنار اومد میشه شب بزنی به شارژ و صبح ورش داری. من این مدل رو پیشنهاد میکنم.
                                                سلام. بسیار عالی هستش من گوشی آیفون ۷پلاس رو تقریبا شش بار شارژ میکنم. اندازه بسیار مناسب و قسنگی داره. تنها ایرادش اینه که خودش دیر شارژ میشه حدودا ۸ ساعت طول میکشه سارژش از صفر به ۱۰۰ برسه که به نظر من میشه باهاش کنار اومد میشه شب بزنی به شارژ و صبح ورش داری. من این مدل رو پیشنهاد میکنم.
                                                سلام. بسیار عالی هستش من گوشی آیفون ۷پلاس رو تقریبا شش بار شارژ میکنم. اندازه بسیار مناسب و قسنگی داره. تنها ایرادش اینه که خودش دیر شارژ میشه حدودا ۸ ساعت طول میکشه سارژش از صفر به ۱۰۰ برسه که به نظر من میشه باهاش کنار اومد میشه شب بزنی به شارژ و صبح ورش داری. من این مدل رو پیشنهاد میکنم.
                                            </div>
                                            <div className="col-md-12 comment-box">
                                                سلام. بسیار عالی هستش من گوشی آیفون ۷پلاس رو تقریبا شش بار شارژ میکنم. اندازه بسیار مناسب و قسنگی داره. تنها ایرادش اینه که خودش دیر شارژ میشه حدودا ۸ ساعت طول میکشه سارژش از صفر به ۱۰۰ برسه که به نظر من میشه باهاش کنار اومد میشه شب بزنی به شارژ و صبح ورش داری. من این مدل رو پیشنهاد میکنم.

                                            </div>
                                            <div className="reply-box">
                                                دوستان عزیز، شتاب‌زده عمل نکردم و پس از دو ماه استفاده نظر خودم را اعلام می‌کنم. این پاوربانک علی‌رغم زیبایی و سبکی متأسفانه ضعیف است. زمانی‌که گوشی را با آن شارژ می‌کنم، زودتر از حالت معمول شارژ خالی می‌کند.این پاور پس از یک زمان شارژ طولانی بازدهی خوبی هم ندارد.
                                            </div>
                                            <form>
                                                <input className="add-reply-box" />
                                            </form>
                                        </Modal>
                                    </div>
                                </div>
                                <div className="col-md-12">
                                    <input id={"maybe"+this.props.option.id} type="radio" name={"ourVote"+this.props.option.id} value="maybe" onChange={this.handleRadioChange}  className="input"/><span className="white-color radio-box">شاید بتوانم</span>
                                </div>
                                <div className="col-md-12">
                                    <input id={"agree"+this.props.option.id} type="radio" name={"ourVote"+this.props.option.id} value="agree" onChange={this.handleRadioChange}  className="input"/><span className="white-color radio-box">می‌توانم</span>
                                </div>
                                <div className="col-md-12">
                                    {/*<FontAwesomeIcon icon="pen"/>*/}
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
