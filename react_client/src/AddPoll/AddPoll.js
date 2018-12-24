import React, { Component } from 'react';
import DefaultNavbar from '../Common/DefaultNavbar';
import TitleComponent from '../Common/TitleComponent';

class HomePage extends Component {

    render() {
        return (
            <div>
                <DefaultNavbar/>
                <TitleComponent title="اضافه کردن نظرسنجی جدید"/>
            </div>
        );
    }
}

export default HomePage;


