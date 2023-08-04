import React, { Component } from 'react';
import { AdminVoteResultDisplay } from './AdminVoteResultDisplay';

// Current Copy of AdminVoteResultDisplay
export class AdminVoteLiveResultPuller extends Component {
    static displayName = AdminVoteLiveResultPuller.name;

    constructor(props) {
        super(props);
        this.state = { 
            A_Vote: 0,
            B_Vote: 0,
            loading: true,
        };
    }

    componentDidMount() {
        this.getPoll();
        this.timerId = setInterval(() => this.getPoll(), 500); //0.5 Seconds
    }

    componentWillUnmount() {
        clearInterval(this.timerId);
    }

    async getPoll() {


        const response = await fetch('api/getPollInfo');
        const data = await response.json();
        this.setState({ 
            A_Vote: data["value"]["aVoteCount"],
            B_Vote: data["value"]["bVoteCount"],
            loading: false
        });
    }

    render() {
        const loading = this.state.loading;
        const voteA = this.state.A_Vote;
        const voteB = this.state.B_Vote;
        return (
            <AdminVoteResultDisplay pullData={false} A_Vote={voteA} B_Vote={voteB} loading={loading} ongoing={true} />
        );
    }
}

