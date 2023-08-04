import React, { Component } from 'react';
import { Chart } from "react-google-charts";
import './VoteSetting.css';



const options = {
    legend: 'none',
    backgroundColor: { fill:'transparent' },
    colors: ['#0D6EFD',  '#FF9900', '#A569BD']
};


export class AdminVoteResultDisplay extends Component {
    static displayName = AdminVoteResultDisplay.name;

    constructor(props) {
        super(props);
        this.state = { 
            A_Vote: 0,
            B_Vote: 0,
            loaded: false,
        };
    }

    componentDidMount() {
        if (this.props.pullData) {
            this.timerId = setInterval(() => this.getPoll(), 500); //0.5 Seconds
        }
    }

    componentWillUnmount() {
        if (this.props.pullData) {
            clearInterval(this.timerId);
        }
    }

    async getPoll() {
        const response = await fetch('api/getPollInfo');
        const data = await response.json();
        this.setState({ 
            A_Vote: data["value"]["aVoteCount"],
            B_Vote: data["value"]["bVoteCount"],
            loaded: true
        });
    }

    title() {
        if (this.props.pullData) {
            if (this.state.loaded === false) return "LOADING...";
            else return "Current Results..."
        } else {
            if (this.props.A_Vote === this.props.B_Vote) return "Results IN: Draw!"
            else if (this.props.A_Vote > this.props.B_Vote) return "Results IN: △ Wins"
            else { return "Results IN: O Wins"; }
        }
    }

    getData() {
        const A = (this.props.pullData) ? this.state.A_Vote : this.props.A_Vote;
        const B = (this.props.pullData) ? this.state.B_Vote : this.props.B_Vote;
        const Neither = ((A+B) > 0) ? 0 : 1;
       
        return [
            ["○ / △", "Count"],
            ["○", B],
            ["Neither", Neither],
            ["△", A],
        ];
    }
    percent(for_A) {
        const A = (this.props.pullData) ? this.state.A_Vote : this.props.A_Vote;
        const B = (this.props.pullData) ? this.state.B_Vote : this.props.B_Vote;
        const total = A + B;
        if (total === 0)    return "No Votes Yet"
    
        const numerator = (for_A) ? A : B;
        return ((numerator/total).toFixed(2) * 100).toString() + "% (" + numerator.toString() + ")";
    }

    render() {
        return (
        <div>
            <h2>{this.title()}</h2>

            <Chart
            chartType="PieChart"
            data={this.getData()}
            options={options}
            width={"100%"}
            height={"60vh"}
            />

            <table><tbody>
            <tr>
                <td><button className="btn btn-primary btn-A" value="A">△</button><span> {this.percent(true)}</span></td>
                <td><button className="btn btn-primary btn-B" value="B">○</button><span> {this.percent(false)}</span></td>
            </tr>
            </tbody></table>
        </div>
        );
    }
}

