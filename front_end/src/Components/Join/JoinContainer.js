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
        if (this.state.userId === "") {
            alert("아이디를 입력하세요. ")
        }
        else if (this.state.userPassword === "") {
            alert("비밀번호를 입력하세요. ")
        }
        else if (this.state.userName === "") {
            alert("이름을 입력하세요. ")
        }
        else {
            am.url = "http://localhost:4000/users/join"
            am.data = { userId: this.state.userId, userPassword: this.state.userPassword, userName: this.state.userName, userManagement: 0 }

            am.post((data) => {
                console.log(data)
                this.props.history.push('/login')
            })
        }
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