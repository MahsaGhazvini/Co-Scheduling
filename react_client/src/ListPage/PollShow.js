import React, { Component } from 'react';
import {withRouter} from 'react-router';

class PollShow extends Component {

    render() {
        return (
            //this.props.poll.title
            <div className="col-lg-6">
                <div className="box1">
                    <div className={"card h-100 poll-box"}>
                        <div className="card-body line">
                            <a href={'/'+this.props.server+'/'+this.props.poll.id} className="card-body line">{this.props.poll.title}</a>
                        </div>
                        <hr/>
                        <div className="card-body line">
                            <span className="card-text">{this.props.poll.description}</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(PollShow);
