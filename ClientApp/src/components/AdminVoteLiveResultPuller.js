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
            dot_num: 0,
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
        const next_dot_num = ((this.state.dot_num+1)% 4);
        this.setState({dot_num: next_dot_num});

        const response = await fetch('api/getPollInfo');
        const data = await response.json();
        this.setState({ 
            A_Vote: data["value"]["aVoteCount"],
            B_Vote: data["value"]["bVoteCount"],
            loading: false
        });
    }

    render() {
        const dotNum = this.state.dot_num;
        const loading = this.state.loading;
        const voteA = this.state.A_Vote;
        const voteB = this.state.B_Vote;
        const dotStr = '.'.repeat(dotNum);
        return (
            <AdminVoteResultDisplay pullData={false} A_Vote={voteA} B_Vote={voteB} loading={loading} ongoing={true} dotStr={dotStr}/>
        );
    }
}

