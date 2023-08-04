import React, { Component } from 'react';
import { Loading } from "./VotingPage";
import { AdminVoteControll } from './AdminVoteController';
import { AdminVoteLiveResultPuller } from './AdminVoteLiveResultPuller';
import { AdminVoteResultDisplay } from './AdminVoteResultDisplay';

export class AdminResultControllWrapper extends Component {
    constructor(props) {
        super(props);
   
        this.state = {
            currentActiveShow: false,
            currentActivePoll: false,
            currentActiveShowID: 0,
            recentPollID: 0,
            aVoteCount: 0,
            bVoteCount: 0,
            loading: true
        };

        this.rerenderParentCallback = this.rerenderParentCallback.bind(this);
    }

    componentDidMount() {
        this.getPoll()
    }

    async getPoll() {
        const response = await fetch('api/getPollInfo');
        const data = await response.json();
        this.setState({ 
            currentActiveShow: data["value"]["openShow"],
            currentActivePoll: data["value"]["openVote"],
            currentActiveShowID: data["value"]["activeShowId"],
            recentPollID: data["value"]["recentPollId"],
            aVoteCount: data["value"]["aVoteCount"],
            bVoteCount: data["value"]["bVoteCount"],
            loading: false 
        });
    }

    async rerenderParentCallback() {
        await this.getPoll();
        this.forceUpdate();
    }

    render () {
        const loading = (this.state.loading);
        const activeShow = (this.state.currentActiveShow);
        const activePoll = (this.state.currentActivePoll);
        const activeShowId = (this.state.currentActiveShowID);
        const previousPole = (this.state.recentPollID > 0) ? true : false;
        const voteA = (this.state.aVoteCount);
        const voteB = (this.state.bVoteCount);
        
        let controllComponent;
        if (loading) { controllComponent = <Loading />}
        else {
            controllComponent = <AdminVoteControll 
                                    activeShowId={activeShowId} 
                                    activeShow={activeShow} 
                                    activePoll={activePoll} 
                                    rerenderParentCallback={this.rerenderParentCallback}
                                />
        }

        let resultComponent;
        if (activeShow && activePoll) {resultComponent = <AdminVoteLiveResultPuller />}
        else if (activeShow && previousPole) {resultComponent = <AdminVoteResultDisplay loading={false} ongoing={false} A_Vote={voteA} B_Vote={voteB} />}
        else {resultComponent = <br />}

        //    <p className='hidden' aria-live="polite">state = {JSON.stringify(this.state, null, 2)}</p>

        return (
            <div>
                { resultComponent }
                { controllComponent }
            </div>
        )
    }
}