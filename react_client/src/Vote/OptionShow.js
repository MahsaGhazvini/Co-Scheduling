import React, { Component } from 'react';
import {withRouter} from 'react-router';

class OptionShow extends Component {
    render() {
        return (
            <div className="col-lg-6">
                <div className="box1">
                    <div className={"card h-100 poll-box"}>
                        <div className="card-body line">
                            <div className="card-body line">{this.props.option.description}</div>
                        </div>
                        <hr/>
                        {/*<div className="card-body line">*/}
                            {/*<span className="card-text">{this.props.description}</span>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(OptionShow);
