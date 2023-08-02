import React, { Component } from 'react';
import { Chart } from "react-google-charts";
import './VoteSetting.css';

export const data = [
    ["○ / △", "Count"],
    ["○", 1],
    ["Neither", 1],
    ["△", 1],
];

export const options = {
    legend: 'none',
    backgroundColor: { fill:'transparent' },
    colors: ['#0D6EFD',  '#FF9900', '#A569BD']
};


export class VoteSetting extends Component {
  static displayName = VoteSetting.name;

  constructor(props) {
    super(props);
    this.state = { pole_open: false, A_Vote: 0, B_Vote: 0 };
  }

  percent(for_A) {
    const total = this.state.A_Vote + this.state.B_Vote;
    if (total === 0) {
      return "No Votes Yet"
    }
    const numerator = (for_A) ? this.state.A_Vote : this.state.B_Vote;
    return ((numerator/total).toFixed(2) * 100).toString() + "%";
  }

  render() {
    return (
      <div>
        <h2>Results</h2>

        <Chart
          chartType="PieChart"
          data={data}
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

