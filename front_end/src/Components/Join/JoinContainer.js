import React, { Component } from 'react';
import JoinPresenter from './JoinPresenter'
import APIManager from '../../APIManagers'

let am = new APIManager();

class JoinContainer extends Component {

    state = {
        userId: "",
        userPassword: "",
        userName: ""
    }

    changehandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    _join = () => {
        am.url = "http://localhost:4000/users/join"
        am.data = { userId: this.state.userId, userPassword: this.state.userPassword, userName: this.state.userName, userManagement: 0 }

        am.post((data) => {
            console.log(data)
            this.props.history.push('/login')
        })
    }

    render() {
        return (
            <div>
                <JoinPresenter {...this.state} join={this._join} changehandler={this.changehandler}></JoinPresenter>
            </div>
        );
    }
}

export default JoinContainer;