import React, { Component } from 'react';

export class AdminVoteControll extends Component {
    constructor(props) {
        super(props);

        this.OpenShow = this.OpenShow.bind(this);
        this.CloseShow = this.CloseShow.bind(this);
        this.OpenPoll = this.OpenPoll.bind(this);
        this.ClosePoll = this.ClosePoll.bind(this);
    }

    APIPost(api_path, JSON_body) {
        this.props.rerenderParentCallback();

        fetch(api_path, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON_body
        })
    }

    OpenShow() {        this.APIPost('api/StartTheShow', JSON.stringify({"showStart": true}))    }
    CloseShow() {       this.APIPost('api/EndTheShow', null)    }
    OpenPoll() {        this.APIPost('api/OpenNewVote', JSON.stringify({"voteOpen": true, "show_id": this.props.activeShowId}))    }
    ClosePoll() {       this.APIPost('api/CloseVote', null)     }
        
    render () {
        let OpenShowButton = <td><button className="btn btn-primary btn-closePoll" onClick={this.OpenShow}>Open Show</button></td>
        let CloseShowButton = <td><button className="btn btn-primary btn-closePoll" onClick={this.CloseShow}>Close Show</button></td>
        let OpenChoiceButton = <td><button className="btn btn-primary btn-closePoll" onClick={this.OpenPoll}>Open Choice</button></td>
        let CloseChoiceButton = <td><button className="btn btn-primary btn-closePoll" onClick={this.ClosePoll}>Close Choice</button></td>

        let buttons;
        if (this.props.activeShow === false) { buttons = <tr> {OpenShowButton} </tr>}
        else if (this.props.activePoll === false) { buttons = <tr> {CloseShowButton} {OpenChoiceButton} </tr>}
        else { buttons = <tr> {CloseChoiceButton} </tr> }

        return (
            <div className="button-container">                
                <table><tbody>{buttons}</tbody></table>
            </div>
        )
    }
}