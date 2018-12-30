import React, { Component } from 'react';
import logo from '../assets/logo.png';
import './../Styles/header.css';

class LogoContainer extends Component {
    render() {
        return (
            <div className="logo-container">
                <a href="/"><img src={logo} alt="LOGO" className="logo"/></a>
                <span className="logo-text">سیستم مدیریت جلسات (سمج)</span>
            </div>
        );
    }
}

class DefaultNavbar extends Component {

    render() {
        return (
            <div className="navbar def-nav" id="header">
                <div className="default">
                    <LogoContainer/>
                </div>
            </div>
        );
    }
}

export default DefaultNavbar;
