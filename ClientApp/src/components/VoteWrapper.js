import React, { Component } from 'react';
import { Loading, ShowNotStarted, NoVote, VotingPage } from "./VotingPage";
import './Vote.css';

export class VoteWrapper extends Component {
  static displayName = "Vote";

  constructor(props) {
    super(props);

    this.state = { 
      currentActiveShow: false,
      currentActivePole: false,
      currentActivePoleId: 0,
      loading: true
    };
  }

  componentDidMount() {
    this.getPole()
    this.timerId = setInterval(() => this.getPole(), 2000); //2 Seconds
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  async getPole() {
    const response = await fetch('api/getActivePole');
    const data = await response.json();
    const isActiveShow = data["value"]["openShow"]
    const isActivePole = data["value"]["openVote"];
    const mostRecentPole = data["value"]["most_recent_pole_id"];
    this.setState({ 
      currentActiveShow: isActiveShow,
      currentActivePole: isActivePole, 
      currentActivePoleId: mostRecentPole,
      loading: false 
    });
  }

  render() {
    const loading = (this.state.loading);
    const activeShow = (this.state.currentActiveShow);
    const activePole = (this.state.currentActivePole);
    const activePoleId = (this.state.currentActivePoleId);

    let voteComponent;
    if (loading) { voteComponent = <Loading />}
    else if (!activeShow) { voteComponent = <ShowNotStarted /> }
    else if (!activePole) { voteComponent = <NoVote />}
    else {voteComponent = <VotingPage activePoleId={activePoleId} />}

    return (
      <div className="votePage page">
        <p className='hidden' aria-live="polite">state = {JSON.stringify(this.state, null, 2)}</p>
        { voteComponent }
      </div>
    );
  }
}

