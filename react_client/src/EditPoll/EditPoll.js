import React, { Component } from 'react';
import * as Network from '../Common/RequestMaker';
import DefaultNavbar from '../Common/DefaultNavbar';
import TitleComponent from '../Common/TitleComponent';

// import ManageOptionList from './ManageOptionList';
import './../Styles/common.css';
import AddPoll from '../AddPoll/AddPoll';
import PollShow from "../ListPage/PollShow";
import PollList from "../ListPage/PollList";

class ManagePolls extends Component {
    constructor(){
        super();

        this.state = {
            formId: -1,
            options: [],
            active: false,
            description: '',
            title: ''
        }
    }

    componentWillMount(){
        const email = localStorage.getItem("email");
        const link = '/managePolls/'+this.props.match.params.pollId+'?email='+email;
        Network.GetRequest(link).then((res)=>{
            if(res !== undefined){
                this.setState(
                    {
                        options: Object.keys(res.options).map(o=>{
                            return {
                                id: o,
                                data: res.options[o]
                            };

                        })
                    });
                this.setState({active: res.active});
                this.setState({description: res.description});
                this.setState({title: res.title});
                this.setState({formId: res.id});
            }
        });
    }

    render() {
        if(this.state.title)
        return (
            <AddPoll title={this.state.title} description={this.state.description} options={this.state.options} server={"editPoll"}/>
            // <AddPoll pollsInfo={this.state.activatePollsInfo} message={"برای ورود به صفحه‌ی هر نظرسنجی فعال روی آن کلیک کنید"} server={'vote'}/>
            // {/*<div id="managePolls-view">*/}
            //     {/*<DefaultNavbar/>*/}
            //     {/*<TitleComponent title='مدیریت جلسه'/>*/}
            //     {/*/!*<div className="container content-container">*!/*/}
            //         {/*/!*<div className="card h-100 poll-box" style={{marginBottom:"50px",display: (this.state.formId === -1)? 'none': 'flex'}}>*!/*/}
            //
            //             {/*/!*<div className = "poll-title">*!/*/}
            //                     {/*/!*<span className="col-md-6" style={{float:"right"}}>*!/*/}
            //                         {/*/!*عنوان*!/*/}
            //                     {/*/!*</span>*!/*/}
            //                 {/*/!*<span className="col-md-6" >{this.state.title}</span>*!/*/}
            //             {/*/!*</div>*!/*/}
            //
            //             {/*/!*<hr/>*!/*/}
            //             {/*/!*<div className = "poll-info">*!/*/}
            //                     {/*/!*<span className="col-md-6" style={{float:"right"}}>*!/*/}
            //                     {/*/!*توضیحات*!/*/}
            //                     {/*/!*</span>*!/*/}
            //                 {/*/!*<span className="col-md-6" >{this.state.description}</span>*!/*/}
            //             {/*/!*</div>*!/*/}
            //         {/*/!*</div>*!/*/}
            //         {/*/!*<ManageOptionList options={this.state.options} formId={this.state.formId} isActive={this.state.active}/>*!/*/}
            //         {/*/!*<a id="editLink" href={'/editPoll/'+this.state.formId} className="card-body line">ویرایش</a>*!/*/}
            //     {/*/!*</div>*!/*/}
            // {/*</div>*/}
        );
        else return (<div/>)
    }
}

export default ManagePolls;
