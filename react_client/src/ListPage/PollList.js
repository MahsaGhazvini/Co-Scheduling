import React, { Component } from 'react';
import PollShow from './PollShow';

class PollList extends Component {
    render() {
        let pollsInfo = this.props.pollsInfo;
        const items = [];
        for(let i=0;i<pollsInfo.length;i++){
            items.push(
                <PollShow poll={pollsInfo[i]}/>
            )
        }
        return (
            <div className="more-info">
                <span className="title">برای ورود به صفحه‌ی هر نظرسنجی روی آن کلیک کنید</span>

                <div className="row">
                    {items}
                </div>
            </div>
        );
    }
}

export default PollList;
