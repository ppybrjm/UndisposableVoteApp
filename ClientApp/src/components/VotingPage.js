import React, { Component } from 'react';
import { Cookies } from "react-cookie";
import './Vote.css';


export class Loading extends Component {
    render () { return <h1>Loading Backend ...</h1> }
}

export class ShowNotStarted extends Component {
    render () { return <h1>The Game has not yet begun ...</h1>}

}
export class NoVote extends Component {
    render () { return <h1>Game in Progress ...</h1>}
}

const userCookies = new Cookies();


export class VotingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            CurrentVote: "NO", 
            userID: userCookies.get('userID') || "NOT SET",
            userVote: "NOT SET"
        };
        this.setVote = this.setVote.bind(this);
    }

    getUserId() {
        if (this.state.userID === "NOT SET") {
            const newUserId = this.makeId(12);
            this.setState({
                userID: newUserId,
            });
          userCookies.set('userID', newUserId);
        }
        return this.state.userID;
    }
    
    makeId(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }

    setVote(button_clicked) {
        const vote_for = button_clicked.target.value
        const userVote = JSON.stringify({
            "voterId": this.props.activePollId,
            "userId" :this.state.userID,
            "vote": vote_for
        });
        this.setState({
            CurrentVote: vote_for,
            userVote: userVote
        });
        fetch('api/Vote', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: userVote
        })
    }
        
    render () { 
        return (
          <div>
            <h1>What Should Princess Plum Do?</h1>

            <p className='hidden' aria-live="polite">Current Vote: <strong>{this.state.CurrentVote}</strong>, User_ID = {this.getUserId()}, user_Vote = {this.state.userVote}</p>       

            <table><tbody>
              <tr className="triangle-selectors">
                <td><div className={'triangle-down triange-A-select ' + (this.state.CurrentVote !== "A" ? "hide" : "")}></div></td>
                <td><div className={'triangle-down triange-B-select ' + (this.state.CurrentVote !== "B" ? "hide" : "")}></div></td>
              </tr>
              <tr>
                <td><button className="btn-vote btn-A" value="A" onClick={this.setVote}>△</button></td>
                <td><button className="btn-vote btn-B" value="B" onClick={this.setVote}>○</button></td>
              </tr>
            </tbody></table>
          </div>
        );
    }
}






