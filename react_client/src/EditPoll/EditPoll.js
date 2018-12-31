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
        );
        else return (<div/>)
    }
}

export default ManagePolls;
