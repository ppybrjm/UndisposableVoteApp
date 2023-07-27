import React, { Component } from 'react';
import { Chart } from "react-google-charts";
import './VoteSetting.css';

export const data = [
    ["A or B", "Count"],
    ["A", 1],
    ["B", 1],
    ["Neither", 1],
];

export const options = {
    legend: 'none',
    backgroundColor: { fill:'transparent' },
    colors: ['#0d6efd', '#A569BD', '#FF9900']
};


export class VoteSetting extends Component {
  static displayName = VoteSetting.name;

  constructor(props) {
    super(props);
    this.state = { A_Vote: 0, B_Vote: 0 };
  }

  

  render() {
    return (
      <div className="voteSettingPage">
        <h1>Results</h1>

        <Chart
          chartType="PieChart"
          data={data}
          options={options}
          width={"100%"}
          height={"400px"}
        />

        <table>
          <tr>
            <td><button className="btn btn-primary btn-A" value="A">△</button></td>
            <td><button className="btn btn-primary btn-B" value="B">○</button></td>
          </tr>
        </table>

        <button className="btn btn-primary btn-A" value="A" onClick={this.setVote}>△</button>

        
      </div>     
    );
  }
}

