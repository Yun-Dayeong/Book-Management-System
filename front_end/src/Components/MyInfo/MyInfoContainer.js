import React, { Component } from 'react';
import APIManager from '../../APIManagers';
import MyInfoPresenter from './MyInfoPresenter'

let am = new APIManager()

class MyInfoContainer extends Component {
    state = {
        userId: "",
        userPassword: "",
        userName: "",

        bookData: []
    }

    componentDidMount = () => {
        this._selectBorrowBook()
    }

    _selectBorrowBook = () => {
        am.url = `http://localhost:4000/users/getUser/${this.props.userId}`

        am.get((data) => {
            this.setState({
                userId: data[0].tb_user_id,
                userPassword: data[0].tb_user_password,
                userName: data[0].tb_user_name,
            })
        })

        am.url = `http://localhost:4000/books/getBorrowBook/${this.props.userId}`

        am.get((data) => {
            // console.log(data[0])
            for (var i = 0; i < data.length; i++) {
                am.url = `http://localhost:4000/books/getBook/${data[i].tb_book_id}`

                am.get((data) => {
                    this.setState({
                        bookData: this.state.bookData.concat(data[0])
                    })
                })
            }
        })
    }

    render() {
        return (
            <div>
                <MyInfoPresenter {...this.props} {...this.state}></MyInfoPresenter>
            </div>
        );
    }
}

export default MyInfoContainer;