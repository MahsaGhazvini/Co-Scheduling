import React, { Component } from 'react';

import OptionShow from './OptionShow';

class OptionsList extends Component {

    render() {
        let options = this.props.options;
        const items = [];
        for(let i=0;i<options.length;i++){
            items.push(
                <OptionShow option={options[i]} formId={this.props.formId}/>
            )
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

export default OptionsList;
