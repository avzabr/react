import React from 'react';
import ReactDom from 'react-dom';

class Button extends React.Component {

    state = {counter: 0};

    render() {
        return (
            <button onClick={this.handleClick}>{this.state.counter}</button>
        )
    }

    handleClick = (e) => {
        e.preventDefault();
        this.setState((prevState) => ({
            counter: prevState.counter + 1
        }))

    }

}

ReactDom.render(<Button label="Test"/>, document.getElementById('root'));