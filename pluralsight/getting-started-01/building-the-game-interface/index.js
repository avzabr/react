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

    const btn = () => {
        if (props.answer === 'correct') {
            return <button className="btn btn-success" onClick={() => props.onBtnClick()}>
                <i className="fa fa-check"></i>
            </button>
        } else if (props.answer === 'fail') {
            return <button className="btn btn-danger" onClick={() => props.onBtnClick()}>
                <i className="fa fa-close"></i>
            </button>
        }

        return <button className="btn" disabled={props.selectedNumbers.length === 0}
                       onClick={() => props.onBtnClick()}>
            =</button>
    };

    return (
        <div className="col-xs-2 btn-wrp">
            {btn()}
            <br/>
            <button className="btn btn-reset btn-default" onClick={() => props.onResetClick()}
                    disabled={props.nAttempts === 0}><i
                className="fa fa-refresh"></i> {props.nAttempts}</button>
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
        answer: null,
        nAttempts: 5,
        gameState: null,
    };

    checkGameStatus = () => {
        const areCombinationsAvailable = () => {
            const notUsedNumbers = _.range(1, 9).filter((n) => {
                return (this.state.usedNumbers.indexOf(n) === -1)
            });

            const isSumGivesResult = (number) => {
                let result = false;
                notUsedNumbers.forEach((n, index) => {
                    if (n !== number && n + number === this.state.numberOfStars) {
                        result = true;
                    }
                })
            };

            notUsedNumbers.forEach((n, index) => {
                if (n === this.state.numberOfStars || isSumGivesResult(n)) {
                    return true;
                }
            });

            return false;
        };

        if (this.state.usedNumbers.length === 9) {
            this.setState({
                gameState: 'win'
            })
        } else if (this.state.nAttempts === 0 && !areCombinationsAvailable()) {
            this.setState({
                gameState: 'lose'
            })
        }
    };

    onNumberSelect = (number) => {
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

    onNumberUnSelect = (selectedNumber) => {
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

    onCheckBtnClick = () => {
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
            this.checkGameStatus();
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

    onResetBtnClick = () => {
        this.setState((prevState) => {
            return {
                nAttempts: prevState.nAttempts - 1,
                numberOfStars: _.random(1, 9)
            }
        });
        this.checkGameStatus();
    };

    render() {
        const {selectedNumbers, usedNumbers, numberOfStars} = this.state;
        return (
            <div>
                <h3>Play Nine</h3>
                <hr/>
                <div className="row guess">
                    <Stars numberOfStars={numberOfStars}/>
                    <Button selectedNumbers={selectedNumbers} answer={this.state.answer}
                            nAttempts={this.state.nAttempts}
                            onBtnClick={this.onCheckBtnClick}
                            onResetClick={this.onResetBtnClick}
                    />
                    <Answer selectedNumbers={selectedNumbers} onBtnClick={this.onNumberUnSelect}/>
                </div>
                <br/>
                <div className="row numbers">
                    <Numbers selectedNumbers={selectedNumbers} usedNumbers={usedNumbers}
                             onBtnClick={this.onNumberSelect}/>
                </div>
                <div className="row">
                    <div>
                        {this.state.gameState}
                    </div>
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