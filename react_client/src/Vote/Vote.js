import React, { Component } from 'react';
import * as Network from '../Common/RequestMaker';
import DefaultNavbar from '../Common/DefaultNavbar';
import TitleComponent from '../Common/TitleComponent';
import './../Styles/common.css';
import OptionsList from './OptionsList';
class Vote extends Component {
    constructor(){
        super()

        this.state = {
            formId: 0,
            options: [],
            active: false,
            description: '',
            title: ''
        }
    }

    componentWillMount(){
        const email = localStorage.getItem("email");
        const link = '/vote/'+this.props.match.params.pollId+'?email='+email;
        Network.GetRequest(link).then((res)=>{
            this.setState({options: res.options});
            this.setState({active: res.active});
            this.setState({description: res.description});
            this.setState({title: res.title});
            this.setState({formId: res.id});
        });
    }

    render() {
        return (
            <div className="body-more-info">
                <DefaultNavbar/>
                <TitleComponent title='جزئیات جلسه'/>
                <div className="container">
                    <div className="row col-md-12">
                        <div className="col-md-6">
                            <span className = "tex-title">عنوان</span> <span>{this.state.title}</span>
                            <span className = "tex-title">توضیحات</span> <span>{this.state.description}</span>
                        </div>
                        <OptionsList options={this.state.options} formId={this.state.formId}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Vote;
