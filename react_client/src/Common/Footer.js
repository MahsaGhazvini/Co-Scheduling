import React, { Component } from 'react';
import logo from '../assets/logo.png';
import './../Styles/common.css';

class Footer extends Component {

    render() {
        return (
            <footer className="col-md-12 col-xs-12" >
            <div className="">
            <div className="">
            ما را در شبکه های اجتماعی دنبال کنید
        </div>
            <a href="#insta"><i className="fa fa-instagram fa-2x "></i></a>
            <a href="#fb"><i className="fa fa-facebook-square fa-2x "></i></a>
            <a href="#telegram"><i className="fa fa-telegram fa-2x"></i></a>

            </div>
            </footer>

    );
    }
}

export default Footer;
