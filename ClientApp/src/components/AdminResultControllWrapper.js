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
            currentActivePole: false,
            currentActiveShowId: 0,
            loading: true
        };
    }

    componentDidMount() {
        this.getPole()
    }

    async getPole() {
        const response = await fetch('api/getActivePole');
        const data = await response.json();
        const isActiveShow = data["value"]["openShow"]
        const isActivePole = data["value"]["openVote"];
        const active_show_id = data["value"]["active_show_id"];
        this.setState({ 
          currentActiveShow: isActiveShow,
          currentActivePole: isActivePole, 
          currentActiveShowId: active_show_id,
          loading: false 
        });
    }

    render () { 
        const loading = (this.state.loading);
        const activeShow = (this.state.currentActiveShow);
        const activePole = (this.state.currentActivePole);
        const ActiveShowId = (this.state.currentActiveShowId);

        let controllComponent;
        if (loading) { controllComponent = <Loading />}
        else {controllComponent = <AdminVoteControll activeShowId={ActiveShowId} activeShow={activeShow} activePole={activePole}/>}

        let resultComponent;
        if (activeShow && activePole) {resultComponent = <VoteSetting />}
        else {resultComponent = <br />}

        return (
            <div>
                <p className='hidden' aria-live="polite">state = {JSON.stringify(this.state, null, 2)}</p>
                { resultComponent }
                { controllComponent }
            </div>
        )
    }
}