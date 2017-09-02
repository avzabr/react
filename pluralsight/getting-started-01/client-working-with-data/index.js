import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';


const Card = (props) => {
    return (
        <div style={{margin: '1em'}}>
            <img width={75} src={props.avatarUrl}/>
            <div style={{display: 'inline-block', marginLeft: 10, verticalAlign: 'top'}}>
                <div style={{fontSize: '1.25em', fontWeight: 'bold'}}>{props.name}</div>
                <div>{props.company}</div>
            </div>
        </div>
    )
};

const CardList = (props) => {
    return (
        <div>
            {props.cards.map(card => <Card key={card.name} {...card}/>)}
        </div>
    )
};

class Form extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        // console.log(this.usernameInput.value)
        console.log(this.state.username);
        axios.get(`https://api.github.com/users/${this.state.username}`).then((resp) => {
            console.log(resp)
        })

    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    //ref={(input) => this.usernameInput = input}
                    onChange={(e) => this.setState({username: e.target.value})}
                    type="text"
                    placeholder="Github username"/>
                <button type="submit">Add card</button>
            </form>
        )
    }
}

class App extends React.Component {

    state = {
        cards: [
            {
                name: "Aliaksandr Zabrodski",
                avatarUrl: "https://avatars1.githubusercontent.com/u/17640566?v=4",
                company: "IAC Apps"
            }
        ]
    };

    render() {
        return (
            <div>
                <Form/>
                <CardList cards={this.state.cards}/>
            </div>
        )
    }
}


ReactDom.render(<App/>, document.getElementById('root'));