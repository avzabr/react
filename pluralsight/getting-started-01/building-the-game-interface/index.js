import React from 'react';
import ReactDom from 'react-dom';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

require("font-awesome-webpack");


class App extends React.Component {


    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-offset-5 col-xs-3">
                        <button className="btn btn-danger" style={{width: '100px', height: '50px'}}>Test</button>
                    </div>
                    <div className="col-xs-1">
                        <p><i className="fa fa-star"></i></p>
                    </div>
                </div>
            </div>
        )
    }
}


ReactDom.render(<App/>, document.getElementById('root'));