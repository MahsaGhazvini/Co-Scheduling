import React, { Component } from 'react';
import logo from '../assets/logo.png';
import './../Styles/common.css';
/*
import {FontAwesomeIcon} from './../../node_modules/@fortawesome/react-fontawesome';
*/

class Footer extends Component {

    render() {
        return (
            <footer className="container-fluid " >
                <div className="row ">
                    <div className="col-md-6">
                      <span className="sage-color">
                                درباره سمج
                      </span>
                        <div>
                            سامانه مدیریت جلسات
                        </div>
                    </div>
                    <div className="col-md-6 text-left">
                        تمامی حقوق این وبسایت متعلق به گروه نایوکو می باشد.
                    </div>
                </div>
            </footer>

        );
    }
}

export default Footer;