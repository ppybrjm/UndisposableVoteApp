import React, { Component } from 'react';
import { Loading, NoVote, VotingPage } from "./VotingPage";
import './Vote.css';

export class VoteWrapper extends Component {
  static displayName = "Vote";

  constructor(props) {
    super(props);

    this.state = { 
      currentActivePole: false,
      currentActivePoleId: 0,
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
    const response = await fetch('api/Vote/getActivePole');
    const data = await response.json();
    const isActivePole = data["value"]["open"];
    const mostRecentPole = data["value"]["most_recent_pole_id"];
    this.setState({ 
      currentActivePole: isActivePole, 
      currentActivePoleId: mostRecentPole,
      loading: false 
    });
  }

  render() {
    const loading = (this.state.loading);
    const activePole = (this.state.currentActivePole);
    const activePoleId = (this.state.currentActivePoleId);

    let voteComponent;
    if (loading) { voteComponent = <Loading />}
    else if(activePole) { voteComponent = <VotingPage activePoleId={activePoleId} />}
    else {voteComponent = <NoVote />}

    return (
      <div className="votePage page">
        <p className='hidden' aria-live="polite">state = {JSON.stringify(this.state, null, 2)}</p>
        { voteComponent }
      </div>
    );
  }
}

