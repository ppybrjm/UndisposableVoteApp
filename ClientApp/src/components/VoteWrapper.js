import React, { Component } from 'react';
import { Loading, NoVote, VotingPage } from "./VotingPage";
import './Vote.css';

export class VoteWrapper extends Component {
  static displayName = "Vote";

  constructor(props) {
    super(props);

    this.state = { 
      currentActivePole: false,
      loading: true
    };
  }

  componentDidMount() {
    this.getPole()
    this.timerId = setInterval(() => this.getPole(), 10000); //10 Seconds
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  async getPole() {
    const response = await fetch('api/Vote/isActivePole');
    const data = await response.json();
    const isActivePole = data["value"];
    this.setState({ currentActivePole: isActivePole, loading: false });
  }

  render() {
    const loading = (this.state.loading);
    const activePole = (this.state.currentActivePole);

    let voteComponent;
    if (loading) { voteComponent = <Loading />}
    else if(activePole) { voteComponent = <VotingPage />}
    else {voteComponent = <NoVote />}

    return (
      <div className="votePage page">
        <p className='hidden' aria-live="polite">state = {JSON.stringify(this.state, null, 2)}</p>
        { voteComponent }
      </div>
    );
  }
}

