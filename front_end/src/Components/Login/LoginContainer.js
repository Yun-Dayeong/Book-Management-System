import React, { Component } from 'react';
import LoginPresenter from './LoginPresenter'
import APIManager from '../../APIManagers'

let am = new APIManager();

class LoginContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: "",
            userPassword: ""
        }
    }

    changehandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    login = () => {
        am.url = "http://localhost:4000/users/login"
        am.data = { userId: this.state.userId, userPassword: this.state.userPassword }

        am.post((data) => {
            this.props.session(data[0])
            this.props.history.push('/')
        })
    }

    render() {
        return (
            <div>
                <LoginPresenter {...this.props} {...this.state} changehandler={this.changehandler} login={this.login}></LoginPresenter>
            </div>
        );
    }
}

export default LoginContainer;