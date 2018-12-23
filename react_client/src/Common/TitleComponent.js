import React, { Component } from 'react';
import './../Styles/titleComponent.css';

class TitleComponent extends Component {
    render() {
        return (
            <div className="title-comp">
                <h4 className="text-title">{this.props.title}</h4>
            </div>
        );
    }
}

export default TitleComponent;
