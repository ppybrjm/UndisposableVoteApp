import React, { Component } from 'react';
import { Cookies } from "react-cookie";
import princessPlum from '../assets/princessPlum.gif';
import twinkle from '../assets/Twinkle-1.png';
import triangle from '../assets/Triangle.png';
import circle from '../assets/Circle.png';
import pinkArrow from '../assets/pink-arrow.png';
import blueArrow from '../assets/blue-arrow.png';


import './Vote.css';


export class Loading extends Component {
    render () { 
        return (
            <div className="notShow">
                <div class="content-container">
                    <img src={twinkle} class="twinkle twinkle-top" alt="Twinkle" />
                    <img  src={twinkle} class="twinkle twinkle-bottom" alt="Twinkle" />
                    <h1>Loading game...</h1>
                    <img src={princessPlum} alt="princess" className="princessPlum" />
                </div>
            </div>
        )
    }
}

export class ShowNotStarted extends Component {
    render () { 
        return (
        <div className="notShow">
             <div class="content-container">
                <img src={twinkle} class="twinkle twinkle-top" alt="Twinkle" />
                <img  src={twinkle} class="twinkle twinkle-bottom" alt="Twinkle" />
                <h1>The Game has not yet begun...</h1>
                <img src={princessPlum} alt="princess" className="princessPlum" />
                <a href="https://www.unrestrictedview.co.uk/save-the-princess-2/?fbclid=PAZXh0bgNhZW0CMTEAAaYE9vhjkzPK5XftUCtU5jxX5Q0QUDVdh_-HsKenYiaKE9DVy9CZ1relSyo_aem_m4QtvqQMJxYAKU08NBCI5g" target="_self" rel="noopener noreferrer">
                <button className="btn btn-primary btn-Buy">Buy Tickets</button></a>
            </div>
        </div>
        )
    }

}
export class NoVote extends Component {
    render () { 
        return (
            <div className="notShow">
                <div class="content-container">
                    <img src={twinkle} class="twinkle twinkle-top" alt="Twinkle" />
                    <img  src={twinkle} class="twinkle twinkle-bottom" alt="Twinkle"/>
                    <h1>Game in progress...</h1>
                    <img src={princessPlum} alt="princess" className="princessPlumActive" />
                </div>
            </div>
        )
    }
    
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
        //<p className='hidden' aria-live="polite">Current Vote: <strong>{this.state.CurrentVote}</strong>, User_ID = {this.getUserId()}, user_Vote = {this.state.userVote}</p>       

        return (
          <div>
             <img src={twinkle} class="twinkle twinkle-top" alt="Twinkle" />
             <img  src={twinkle} class="twinkle twinkle-bottom" alt="Twinkle"/>
            <h1>What Should Princess Plum Do?</h1>
            <table><tbody>
              <tr className="triangle-selectors">
                <td><img class="arrow arrow-bob" src={pinkArrow} alt="pink arrow" /></td>
                <td><img class="arrow arrow-bob" src={blueArrow} alt="blue arrow" /></td>
              </tr>
              <tr>
                <td><button className="btn-vote btn-A" value="A" onClick={this.setVote}><img src={triangle} alt="triangle" /></button></td>
                <td><button className="btn-vote btn-B" value="B" onClick={this.setVote}><img src={circle} alt="circle" /></button></td>
              </tr>
            </tbody></table>
          </div>
        );
    }
}






