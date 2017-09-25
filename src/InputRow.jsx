import React from 'react'

class InputRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit(event) {
        let newTodo = {content: this.state.value, status: 'Active', index: this.props.numOfTodo + 1};
        this.props.addNum();
        this.props.addTodo(newTodo);
        event.preventDefault();
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    render() {
        return (
            <div>
                <input type="text" value={this.state.value} onChange={this.handleChange}/>
                <button onClick={this.handleSubmit}>add</button>
            </div>
        );
    }
}

export default InputRow;