import React, { Component } from 'react';
import { Loading, ShowNotStarted, NoVote, VotingPage } from "./VotingPage";
import './Vote.css';

export class VoteWrapper extends Component {
    static displayName = "Vote";

    constructor(props) {
        super(props);

        this.state = { 
            currentActiveShow: false,
            currentActivePoll: false,
            mostRecentPollID: 0,
            loading: true
        };
    }

    componentDidMount() {
        this.getPoll()
        this.timerId = setInterval(() => this.getPoll(), 2000); //2 Seconds
    }

    componentWillUnmount() {
        clearInterval(this.timerId)
    }

    async getPoll() {
        const response = await fetch('api/getPollInfo');
        const data = await response.json();
        this.setState({ 
            currentActiveShow: data["value"]["openShow"],
            currentActivePoll: data["value"]["openVote"], 
            mostRecentPollID: data["value"]["recentPollId"],
            loading: false 
        });
    }

    render() {
        const loading = (this.state.loading);
        const activeShow = (this.state.currentActiveShow);
        const activePoll = (this.state.currentActivePoll);
        const recentPollID = (this.state.mostRecentPollID);

        let voteComponent;
        if (loading) { voteComponent = <Loading />}
        else if (!activeShow) { voteComponent = <ShowNotStarted /> }
        else if (!activePoll) { voteComponent = <NoVote />}
        else {voteComponent = <VotingPage activePollId={recentPollID} />}
        // <p className='hidden' aria-live="polite">state = {JSON.stringify(this.state, null, 2)}</p>

        return (
        <div className="votePage page">
            { voteComponent }
        </div>
        );
    }
}

