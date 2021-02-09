import React, { Component } from 'react';
import APIManager from '../../APIManagers';
import MyInfoPresenter from './MyInfoPresenter'

let am = new APIManager()

class MyInfoContainer extends Component {
    state = {
        userId: "",
        userPassword: "",
        userName: "",

        bookData: [],
    }

    componentDidMount = () => {
        this._selectBorrowBook()
    }

    _selectBorrowBook = () => {
        am.url = `http://localhost:4000/users/getUser/${this.props.userId}`

        am.get((data) => {
            if (data.msg === 200) {
                this.setState({
                    userId: data.result[0].tb_user_id,
                    userPassword: data.result[0].tb_user_password,
                    userName: data.result[0].tb_user_name,
                })
            }
            else {
                alert("오류! 다시 시도해주세요. ")
            }
        })

        am.url = `http://localhost:4000/books/getBorrowBook/${this.props.userId}`

        am.get((data) => {
            if (data.msg === 200) {
                for (var i = 0; i < data.result.length; i++) {
                    am.url = `http://localhost:4000/books/getBook/${data.result[i].tb_book_id}`

                    am.get((data) => {
                        if (data.msg === 200) {
                            this.setState({
                                bookData: this.state.bookData.concat(data.result[0])
                            })
                        }
                        else {
                            alert("오류! 다시 시도해주세요. ")
                        }
                    })
                }
            }
            else {
                alert("오류! 다시 시도해주세요. ")
            }
        })
    }

    _return = (bookId) => {
        am.url = `http://localhost:4000/books/borrowUser/${bookId}`

        am.get((data) => {
            if (data.msg === 200) {
                am.url = "http://localhost:4000/books/returnBook"
                am.data = { borrowId: data.result[0].tb_borrow_id, bookId: bookId }

                am.post((data) => {
                    if (data.msg === 200) {
                        alert("반납되었습니다. ")
                        this.setState({
                            bookData: []
                        })
                        this._selectBorrowBook()
                    }
                    else {
                        alert("오류! 다시 시도해주세요. ")
                    }
                })
            }
            else {
                alert("오류! 다시 시도해주세요. ")
            }
        })
    }

    render() {
        return (
            <div>
                <MyInfoPresenter
                    {...this.props}
                    {...this.state}
                    return={this._return}></MyInfoPresenter>
            </div>
        );
    }
}

export default MyInfoContainer;