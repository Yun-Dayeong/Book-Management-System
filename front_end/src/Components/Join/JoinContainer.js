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
                if (data.msg === 200) {
                    alert("회원가입 되었습니다. ")
                    this.props.history.push('/login')
                }
                else if (data.msg === 202) {
                    alert("이미 존재하는 아이디 입니다. ")
                }
                else {
                    alert("오류! 페이지 새로고침 후 다시 시도해주세요. ")
                }
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