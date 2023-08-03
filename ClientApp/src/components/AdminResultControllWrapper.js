import React, { Component } from 'react';
import { Loading } from "./VotingPage";
import { VoteSetting } from './VoteSetting';
import { AdminVoteControll } from './AdminVoteController';

import './VoteSetting.css';

export class AdminResultControllWrapper extends Component {
    constructor(props) {
        super(props);
   
        this.state = {
            currentActiveShow: false,
            currentActivePoll: false,
            currentActiveShowID: 0,
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

        let controllComponent;
        if (loading) { controllComponent = <Loading />}
        else {controllComponent = <AdminVoteControll activeShowId={activeShowId} activeShow={activeShow} activePoll={activePoll} rerenderParentCallback={this.rerenderParentCallback}/>}

        let resultComponent;
        if (activeShow && activePoll) {resultComponent = <VoteSetting />}
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