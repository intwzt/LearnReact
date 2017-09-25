import React from 'react'

class FilterBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleAllStatusChange = this.handleAllStatusChange.bind(this);
        this.handleActiveStatusChange = this.handleActiveStatusChange.bind(this);
        this.handleCompleteStatusChange = this.handleCompleteStatusChange.bind(this);
    }

    handleAllStatusChange() {
        this.props.filterHandler('ALL');
    }

    handleActiveStatusChange() {
        this.props.filterHandler('Active');
    }

    handleCompleteStatusChange() {
        this.props.filterHandler('Complete');
    }


    render() {
        const {filterState, NumOfItems} = this.props;
        const {All, Active, Complete} = makeState(filterState);
        return (
            <p>
                {NumOfItems} items left
                ALL
                <input type='checkbox' checked={All} onChange={this.handleAllStatusChange}/>
                Active
                <input type='checkbox' checked={Active} onChange={this.handleActiveStatusChange}/>
                Complete
                <input type='checkbox' checked={Complete} onChange={this.handleCompleteStatusChange}/>
            </p>
        )
    }

}

function makeState(state) {
    if (state === 'ALL'){
        return {All: true, Active: false, Complete: false};
    }
    if (state === 'Active'){
        return {All: false, Active: true, Complete: false};
    }
    if (state === 'Complete'){
        return {All: false, Active: false, Complete: true};
    }
}

export default FilterBar;