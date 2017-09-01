import React from 'react';
import ReactDom from 'react-dom';

const Button = function (props) {
    return (
        <button>{props.label}</button>
    )
};

ReactDom.render(<Button label="Test"/>, document.getElementById('root'));