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
            formId: -1,
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
            if(res !== undefined){
                this.setState({options: res.options});
                this.setState({active: res.active});
                this.setState({description: res.description});
                this.setState({title: res.title});
                this.setState({formId: res.id});
            }
        });
    }

    render() {
        return (
            <div className="body-more-info">
                <DefaultNavbar/>
                <TitleComponent title='جزئیات جلسه'/>
                <div className="container description">
                    <div className="col-md-12">
                        <div className="" style={{display: (this.state.formId === -1)? 'none': 'flex'}}>

                            <div className = "col-md-6">عنوان</div> <div>{this.state.title}</div>
                            <div className = "col-md-6">توضیحات</div> <div>{this.state.description}</div>
                        </div>
                        <OptionsList options={this.state.options} formId={this.state.formId} isActive={this.state.active}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Vote;
