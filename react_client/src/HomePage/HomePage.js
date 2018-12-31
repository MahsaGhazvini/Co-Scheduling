import React, { Component } from 'react';
import DefaultNavbar from '../Common/DefaultNavbar';
import TitleComponent from '../Common/TitleComponent';
import './../Styles/common.css';
import './../Styles/login.css';
import Footer from "../Common/Footer";

class HomePage extends Component {
    constructor(props){
        super(props);

        this.state = {
            email: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.sendInfo = this.sendInfo.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    sendInfo(event){
        localStorage.setItem("email", this.state.email);
        this.props.history.push({pathname: '/listPage'});
    }
    render() {
        return (
            <div>
                <DefaultNavbar/>
                <TitleComponent title="ورود"/>
                <div className = "content-container container">
                    <div className = "login container">
                        <div className = "login-box">
                            <div className = "email-input">
                                <input id="email" name="email" className="email input-box" type="text" value={this.state.email} onChange={this.handleChange} placeholder="email"/>
                            </div>
                            <div><input type="submit" onClick={this.sendInfo} value="ورود" className="submit"/></div>
                        </div>
                    </div>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default HomePage;

