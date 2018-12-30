import React, { Component } from 'react';
import PollShow from './PollShow';

class PollList extends Component {

    render() {
        let pollsInfo = this.props.pollsInfo;
        const items = [];
        for(let i=0;i<pollsInfo.length;i++){
            items.push(
                <PollShow poll={pollsInfo[i]} server={this.props.server}/>
            )
        }
        return (
            <div className="more-info container">
                <span className="title" style={{display: (this.props.pollsInfo.length === 0)? 'none': 'flex'}}>{this.props.message}</span>
                <div className="row">
                    {items}
                </div>
            </div>
        );
    }
}

export default PollList;
