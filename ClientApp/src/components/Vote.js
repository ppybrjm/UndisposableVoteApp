import React, { Component } from 'react';
import './Vote.css';

export class Vote extends Component {
  static displayName = Vote.name;

  constructor(props) {
    super(props);
    this.state = { CurrentVote: "NO" };
    this.setVote = this.setVote.bind(this);    
  }

  setVote(button_clicked) {
    const vote_for = button_clicked.target.value
    this.setState({
        CurrentVote: vote_for
    });
  }

  render() {
    return (
      <div className="votePage">
        <h1>Trigger a Choice</h1>

        <p aria-live="polite">Current Vote: <strong>{this.state.CurrentVote}</strong></p>

        <table>
          <tr class="triangle-selectors">
            <td><div className={'triangle-down triange-A-select ' + (this.state.CurrentVote !== "A" ? "hide" : "")} ></div></td>
            <td><div className={'triangle-down triange-B-select ' + (this.state.CurrentVote !== "B" ? "hide" : "")}></div></td>
          </tr>
          <tr>
            <td><button className="btn btn-primary btn-A" value="A" onClick={this.setVote}>△</button></td>
            <td><button className="btn btn-primary btn-B" value="B" onClick={this.setVote}>○</button></td>
          </tr>
        </table>
      </div>
    );
  }
}

