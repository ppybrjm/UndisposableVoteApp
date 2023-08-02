import React, { Component } from 'react';
import { Cookies } from "react-cookie";
import './Vote.css';


export class Loading extends Component {
    render () { return <h1>Loading Backend ...</h1> }
}

export class NoVote extends Component {
    render () { return <h1>Game in Progress ...</h1>}
}
export class VotingPage extends Component {
    render () { return <h1>Vote in Progress ...</h1>}
}