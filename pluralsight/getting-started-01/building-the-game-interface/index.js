import React from 'react';
import ReactDom from 'react-dom';

require("font-awesome-webpack");
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as _ from 'lodash';
import './main.css';


const possibleCombinationSum = function (arr, n) {
    if (arr.indexOf(n) >= 0) {
        return true;
    }
    if (arr[0] > n) {
        return false;
    }
    if (arr[arr.length - 1] > n) {
        arr.pop();
        return possibleCombinationSum(arr, n);
    }
    const listSize = arr.length, combinationsCount = (1 << listSize);
    for (let i = 1; i < combinationsCount; i++) {
        let combinationSum = 0;
        for (let j = 0; j < listSize; j++) {
            if (i & (1 << j)) {
                combinationSum += arr[j];
            }
        }
        if (n === combinationSum) {
            return true;
        }
    }
    return false;
};


const Stars = (props) => {

    return (
        <div className="col-xs-5 stars">
            {_.range(props.numberOfStars).map((star, index) => {
                return <i key={index} className="fa fa-star star"/>
            })}
        </div>
    )
};


const Button = (props) => {

    let btn;

    switch (props.answer) {
        case 'correct':
            btn = <button className="btn btn-success" onClick={() => props.acceptAnswer()}>
                <i className="fa fa-check"/></button>;
            break;
        case 'fail':
            btn = <button className="btn btn-danger" onClick={() => props.checkAnswer()}>
                <i className="fa fa-close"/></button>;
            break;
        default:
            btn = <button className="btn" disabled={props.selectedNumbers.length === 0}
                          onClick={() => props.checkAnswer()}>=</button>;

    }

    return (
        <div className="col-xs-2 btn-wrp">
            {btn}
            <br/>
            <br/>
            <button className="btn btn-sm btn-reset btn-warning" onClick={() => props.redraw()}
                    disabled={props.redraws === 0}><i
                className="fa fa-refresh"/> {props.redraws}</button>
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
        <div className="row numbers">
            <div className="card text-center" style={{marginTop: '50px'}}>
                {Numbers.numbers.map((number, index) => {
                    return <button key={index} className={'btn number ' + numberClassName(number, props)} onClick={() =>
                        props.selectNumber(number)}>{number}</button>
                })}
            </div>
        </div>
    )
};

Numbers.numbers = _.range(1, 10);

const Answer = (props) => {

    return (
        <div className="col-xs-5">
            {props.selectedNumbers.map((number, index) => {
                return <button key={index} className="btn number" onClick={() => {
                    props.unSelectNumber(number);
                }}>{number}</button>
            })}

        </div>
    )
};

const DoneFrame = (props) => {
    return (
        <div className="row">
            <div className="col-xs-12 text-center">
                <h3>{props.doneStatus}</h3>
                <button className="btn btn-default" onClick={() => props.restartGame()}> Restart Game</button>
            </div>
        </div>
    )
};

class Game extends React.Component {

    static initialState = () => {
        return {
            selectedNumbers: [],
            usedNumbers: [],
            numberOfStars: Game.randomStars(),
            answer: null,
            redraws: 5,
            doneStatus: null,
        }
    };

    static randomStars = () => {
        return _.random(9) + 1
    };

    state = Game.initialState();

    updateDoneStatus = () => {
        const notUsedNumbers = _.range(1, 10).filter((n) => {
            return (this.state.usedNumbers.indexOf(n) === -1)
        });


        if (this.state.usedNumbers.length === 9) {
            this.setState({
                doneStatus: 'Won!'
            })
        } else if (this.state.redraws === 0 && !possibleCombinationSum(notUsedNumbers, this.state.numberOfStars)) {
            this.setState({
                doneStatus: 'Game lost!'
            })
        }
    };

    selectNumber = (number) => {
        if (this.state.answer) {
            return;
        }
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

    unSelectNumber = (selectedNumber) => {
        this.setState((prevState) => {
            return {
                selectedNumbers: prevState.selectedNumbers.filter((number) => {
                        return number !== selectedNumber
                    },
                ),
                answer: null
            }
        })
    };

    checkAnswer = () => {
        const answer = this.state.selectedNumbers.reduce((sum, value) => {
            return sum + value;
        }, 0);

        if (this.state.answer === 'correct') {
            this.setState((prevState) => {
                return {
                    usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
                    selectedNumbers: [],
                    answer: null,
                    numberOfStars: _.random(1, 9)
                };
            });
            this.updateDoneStatus();
        } else if (this.state.answer === 'fail') {
            this.setState({
                answer: null,
                selectedNumbers: []
            });
        } else {
            this.setState({
                answer: answer === this.state.numberOfStars ? 'correct' : 'fail'
            });
        }
    };

    redraw = () => {
        this.setState((prevState) => {
            return {
                redraws: prevState.redraws - 1,
                numberOfStars: Game.randomStars()
            }
        });
    };

    restartGame = () => {
        this.setState(Game.initialState());
    };

    acceptAnswer = () => {
        this.setState(prevState => ({
            usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
            selectedNumbers: [],
            answer: null,
            numberOfStars: Game.randomStars(),
        }), this.updateDoneStatus);
    };

    render() {
        const {selectedNumbers, usedNumbers, numberOfStars, doneStatus} = this.state;
        return (
            <div>
                <h3>Play Nine</h3>
                <hr/>
                <div className="row guess">
                    <Stars numberOfStars={numberOfStars}/>
                    <Button selectedNumbers={selectedNumbers} answer={this.state.answer}
                            redraws={this.state.redraws}
                            checkAnswer={this.checkAnswer}
                            redraw={this.redraw}
                            acceptAnswer={this.acceptAnswer}
                    />
                    <Answer selectedNumbers={selectedNumbers} unSelectNumber={this.unSelectNumber}/>
                </div>
                <br/>
                {this.state.doneStatus ?
                    <DoneFrame doneStatus={doneStatus} restartGame={this.restartGame}/> :
                    <Numbers selectedNumbers={selectedNumbers} usedNumbers={usedNumbers}
                             selectNumber={this.selectNumber}/>
                }
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