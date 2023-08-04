import React, { Component } from 'react';
import { Cookies } from "react-cookie";
import { AdminResultControllWrapper } from './AdminResultControllWrapper';
import './Admin.css';


const adminCookies = new Cookies();

export class AdminLoginWrapper extends Component {
    constructor(props) {
        super(props);

        const password = adminCookies.get('password') || "100";
    
        this.state = {
            password: password,
            verified: false
        };
    }

    componentDidMount() {
        this.checkPassword(this.state.password)
      }


    handleChange(event) {
        const entered_value = event.target.value;
        this.setState({password: entered_value});
        if (isNaN(entered_value)) {
            this.setState({verified: false});
            return;
        }
        this.checkPassword(entered_value);
    }

    checkPassword(num) {
        if (this.ModCheck(num,2,0) && this.ModCheck(num,3,1) && this.ModCheck(num,4,0) 
         && this.ModCheck(num,5,0) && this.ModCheck(num,6,4) && this.ModCheck(num,7,5)
         && this.ModCheck(num,8,0) && this.ModCheck(num,9,4) && this.ModCheck(num,47,0))
        {
            this.setState({verified: true});
            adminCookies.set('password', num);
        } else { this.setState({verified: false}); }
    }

    ModCheck(num, modulo, expected) {
        return (num % modulo === expected);
    }

    render () { 
        const password = this.state.password;

        let VoteSettingComponent = <br />;
        if (this.state.verified) {VoteSettingComponent = <AdminResultControllWrapper password={password} />}

        return (
            <div className="voteSettingPage page">
                <div className='loginCred'>
                    <input 
                        id="password" name="password"
                        type="password" maxLength="7"
                        onChange={this.handleChange.bind(this)} value={password} 
                    />
                </div>
                
                {VoteSettingComponent}
            </div>
        )
    };

}