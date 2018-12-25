import React, { Component } from 'react';

import ManageOptionShow from './ManageOptionShow';
import ResultOptionShow from './../Vote/ResultOptionShow';

class ManageOptionList extends Component {

    render() {
        let options = this.props.options;
        const items = [];
        if (this.props.isActive === true){
            for(let i=0;i<options.length;i++){
                items.push(
                    <ManageOptionShow option={options[i]} formId={this.props.formId}/>
                )
            }
        }
        else{
            for(let i=0;i<options.length;i++){
                items.push(
                    <ResultOptionShow option={options[i].data}/>
                )
            }
        }
        return (
            <div className="more-info">
                <div className="row">
                    {items}
                </div>
            </div>
        );
    }
}

export default ManageOptionList;
