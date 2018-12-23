import React, { Component } from 'react';
import DefaultNavbar from '../Common/DefaultNavbar';
import TitleComponent from '../Common/TitleComponent';
import './../Styles/common.css';

class HomePage extends Component {

    render() {
        return (
            <div>
                <DefaultNavbar/>
                <TitleComponent title="ورود"/>
            </div>
        );
    }
}

export default HomePage;


