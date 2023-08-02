import React, { Component } from 'react';

export class AdminVoteControll extends Component {
    constructor(props) {
        super(props);

        // this.toggleShow = this.toggleShow.bind(this);
        // this.toggleVote = this.toggleVote.bind(this);

        this.OpenShow = this.OpenShow.bind(this);
        this.CloseShow = this.CloseShow.bind(this);
        this.OpenPole = this.OpenPole.bind(this);
        this.ClosePole = this.ClosePole.bind(this);
    }

    // toggleShow() {
    //     if (this.props.currentActiveShow) {

    //     }
    // }

    // toggleVote() {
    //     if (this.props.currentActivePole) {}


    // }

    APIPost(api_path, JSON_body) {
        fetch(api_path, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON_body
        })
    }

    OpenShow() {        this.APIPost('api/StartTheShow', JSON.stringify({"showStart": true}))    }
    CloseShow() {       this.APIPost('api/EndTheShow', null)    }
    OpenPole() {        this.APIPost('api/OpenNewVote', JSON.stringify({"voteOpen": true, "show_id": this.props.activeShowId}))    }
    ClosePole() {       this.APIPost('api/CloseVote', null)     }
        
    render () {

        // const showText = (this.props.currentActiveShow) ? "Close Show" : "Open Show"
        // const displayPole = this.props.currentActiveShow;
        // const poleText = (this.props.currentActivePole) ? "Close Choice" : "Open Choice"
        // const enableShow = !(this.props.currentActivePole);
        // <td><button className="btn btn-primary btn-closePole" onClick={this.toggleShow} enabled={enableShow}>{showText}</button></td>
        // <td><button className="btn btn-primary btn-closePole" onClick={this.toggleVote} display={displayPole}>{poleText}</button></td>
       
        return (
            <div className="button-container">                
                <table><tbody>
                    <tr>
                        <td><button className="btn btn-primary btn-closePole" onClick={this.OpenShow}>Open Show</button></td>
                        <td><button className="btn btn-primary btn-closePole" onClick={this.CloseShow}>Close Show</button></td>
                        <td><button className="btn btn-primary btn-closePole" onClick={this.OpenPole}>Open Choice</button></td>
                        <td><button className="btn btn-primary btn-closePole" onClick={this.ClosePole}>Close Choice</button></td>
                    </tr>
                </tbody></table>
            </div>
        )
    }
}