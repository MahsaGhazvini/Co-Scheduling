import React, { Component } from 'react';
import {withRouter} from 'react-router';

class ResultOptionShow extends Component {
    constructor(props){
        super();
        console.log("______",props.option);
        this.state = {
            isFinalized: props.option.isFinalized
        };
    }

    render() {
        return (
            <div className="col-lg-6 col-md-6">
                <div className="">
                    <div className={"card h-100 poll-box"} style={{"background-color": (this.state.isFinalized)? 'rgb(137, 154, 99)': 'white'}}>
                        <div className="card-body row">
                            <div className="card-body line">{this.props.option.description}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(ResultOptionShow);
