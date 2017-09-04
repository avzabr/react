import React from 'react';
import ReactDom from 'react-dom';

require("font-awesome-webpack");
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as _ from 'lodash';
import './main.css';


const Stars = (props) => {

    return (
        <div className="col-xs-5 stars">
            {_.range(props.numberOfStars).map((star, index) => {
                return <i key={index} className="fa fa-star star"></i>
            })}
        </div>
    )
};


const Button = (props) => {
    return (
        <div className="col-xs-2 btn-wrp">
            <button className="btn" disabled={props.selectedNumbers.length === 0}>=</button>
        </div>
    )
};

const Numbers = (props) => {

    const numberClassName = (number, props) => {
        if (props.selectedNumbers.indexOf(number) !== -1) {
            return 'selected'
        }
        if (props.usedNumbers.indexOf(number) !== -1) {
            return 'used'
        }
        return '';
    };

    return (
        <div className="card text-center" style={{marginTop: '50px'}}>
            {Numbers.numbers.map((number, index) => {
                return <button key={index} className={'btn number ' + numberClassName(number, props)} onClick={() =>
                    props.onBtnClick(number)}>{number}</button>
            })}

        </div>
    )
};

Numbers.numbers = _.range(1, 10);

const Answer = (props) => {

    return (
        <div className="col-xs-5">
            {props.selectedNumbers.map((number, index) => {
                return <button key={index} className="btn number" onClick={() => {
                    props.onBtnClick(number);
                }}>{number}</button>
            })}

        </div>
    )
};

class Game extends React.Component {

    state = {
        selectedNumbers: [],
        usedNumbers: [],
        numberOfStars: _.random(9) + 1,
    };

    onNumberSelect = (number) => {
        if (this.state.usedNumbers.indexOf(number) !== -1 ||
            this.state.selectedNumbers.indexOf(number) !== -1) {
            return;
        }
        this.setState((prevState) => {
            return {
                selectedNumbers: prevState.selectedNumbers.concat(number)
            }
        })
    };

    onNumberUnSelect = (selectedNumber) => {
        this.setState((prevState) => {
            return {
                selectedNumbers: prevState.selectedNumbers.filter((number) => {
                        return number !== selectedNumber
                    }
                )
            }
        })
    };

    render() {
        const {selectedNumbers, usedNumbers, numberOfStars} = this.state;
        return (
            <div>
                <h3>Play Nine</h3>
                <hr/>
                <div className="row guess">
                    <Stars numberOfStars={numberOfStars}/>
                    <Button selectedNumbers={selectedNumbers}/>
                    <Answer selectedNumbers={selectedNumbers} onBtnClick={this.onNumberUnSelect}/>
                </div>
                <br/>
                <div className="row numbers">
                    <Numbers selectedNumbers={selectedNumbers} usedNumbers={usedNumbers}
                             onBtnClick={this.onNumberSelect}/>
                </div>
            </div>
        )

    }

}


class App extends React.Component {

    render() {
        return (
            <div className="container">
                <Game/>
            </div>
        )
    }
}


ReactDom.render(
    <App/>
    , document.getElementById('root'));