import React, { Component } from 'react';

export class AdminVoteControll extends Component {
    constructor(props) {
        super(props);

        this.OpenShow = this.OpenShow.bind(this);
        this.CloseShow = this.CloseShow.bind(this);
        this.OpenPole = this.OpenPole.bind(this);
        this.ClosePole = this.ClosePole.bind(this);
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
    OpenPole() {        this.APIPost('api/OpenNewVote', JSON.stringify({"voteOpen": true, "show_id": this.props.activeShowId}))    }
    ClosePole() {       this.APIPost('api/CloseVote', null)     }
        
    render () {
        let OpenShowButton = <td><button className="btn btn-primary btn-closePole" onClick={this.OpenShow}>Open Show</button></td>
        let CloseShowButton = <td><button className="btn btn-primary btn-closePole" onClick={this.CloseShow}>Close Show</button></td>
        let OpenChoiceButton = <td><button className="btn btn-primary btn-closePole" onClick={this.OpenPole}>Open Choice</button></td>
        let closeChoiceButton = <td><button className="btn btn-primary btn-closePole" onClick={this.ClosePole}>Close Choice</button></td>

        let buttons;
        if (this.props.activeShow === false) { buttons = <tr> {OpenShowButton} </tr>}
        else if (this.props.activePole === false) { buttons = <tr> {CloseShowButton} {OpenChoiceButton} </tr>}
        else { buttons = <tr> {closeChoiceButton} </tr> }

        return (
            <div className="button-container">                
                <table><tbody>{buttons}</tbody></table>
            </div>
        )
    }
}