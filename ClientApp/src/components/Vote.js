import React, { Component } from 'react';

export class Vote extends Component {
  static displayName = Vote.name;

  constructor(props) {
    super(props);
    this.state = { CurrentVote: "NO" };
    this.setVote = this.setVote.bind(this);    
  }

  setVote(button_clicked) {
    this.setState({
        CurrentVote: button_clicked.target.value
    });
  }

  render() {
    return (
      <div>
        <h1>Vote</h1>

        <p aria-live="polite">Current count: <strong>{this.state.CurrentVote}</strong></p>

        <button className="btn btn-primary" value="A" onClick={this.setVote}>Vote 1</button>
        <button className="btn btn-primary" value="B" onClick={this.setVote}>Vote 2</button>
      </div>
    );
  }
}

