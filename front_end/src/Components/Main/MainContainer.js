import React, { Component } from 'react';
import APIManager from '../../APIManagers';
import MainPresenter from './MainPresenter'

let am = new APIManager()

class MainContainer extends Component {

    state = {
        bookData: [],
        modalIsOpen: false,

        page: 1,
        modalBook: []
    }

    componentDidMount = () => {
        this._selectBook();
    }

    _selectBook = () => {
        am.url = "http://localhost:4000/books/getMainBook"
        am.params = {}

        am.get((data) => {
            if (data.msg === 200) {
                this.setState({
                    page: 1,
                    bookData: data.result
                })
            }
            else {
                alert("오류! 다시 시도해주세요. ")
            }
        })
    }

    _updateBookData = () => {
        this.props.history.push({ pathname: '/bookUpdate', state: { bookId: this.state.modalBook.tb_book_id } })
    }

    _deleteBook = () => {
        if (window.confirm("삭제하시겠습니까? ")) {
            am.url = "http://localhost:4000/books/deleteBook"
            am.data = { bookId: this.state.modalBook.tb_book_id }

            am.post((data) => {
                if (data.msg === 200) {
                    alert("삭제되었습니다. ")
                    this._closeModal()
                    this._selectBook()
                }
                else if (data.msg === 202) {
                    alert("대출 상태의 책 입니다. ")
                }
                else {
                    alert("오류! 다시 시도해주세요. ")
                }
            })
        }
    }

    _borrow = () => {
        am.url = "http://localhost:4000/books/borrowBook"
        am.data = { userId: this.props.userId, bookId: this.state.modalBook.tb_book_id }

        am.post((data) => {
            if (data.msg === 200) {
                alert("대출되었습니다. ")
                this._modalBookData(this.state.modalBook.tb_book_id)
            }
            else {
                alert("오류! 다시 시도해주세요. ")
            }
        })
    }

    _return = () => {
        am.url = `http://localhost:4000/books/borrowUser/${this.state.modalBook.tb_book_id}`

        am.get((data) => {
            if (data.msg === 200) {
                if (data.result[0].tb_user_id === this.props.userId) {
                    am.url = "http://localhost:4000/books/returnBook"
                    am.data = { borrowId: data.result[0].tb_borrow_id, bookId: this.state.modalBook.tb_book_id }

                    am.post((data) => {
                        if (data.msg === 200) {
                            alert("반납되었습니다. ")
                            this._modalBookData(this.state.modalBook.tb_book_id)
                        }
                        else {
                            alert("오류! 다시 시도해주세요. ")
                        }
                    })
                }
                else {
                    alert("대출한 책이 아닙니다. ")
                }
            }
            else {
                alert("오류! 다시 시도해주세요. ")
            }
        })
    }

    _openModal = (bookId) => {
        console.log(bookId)
        this._modalBookData(bookId)

        this.setState({
            modalIsOpen: true
        })
    }

    _closeModal = () => {
        this.setState({
            modalIsOpen: false
        })
    }

    _modalBookData = (bookId) => {
        am.url = `http://localhost:4000/books/getBook/${bookId}`

        am.get((data) => {
            if (data.msg === 200) {
                this.setState({
                    modalBook: data.result[0]
                })
            }
            else {
                alert("오류! 다시 시도해주세요. ")
            }
        })
    }

    _clickPrevious = () => {
        var previousId = this.state.bookData[0].tb_book_id
        console.log(previousId)

        am.url = "http://localhost:4000/books/getMainBook"
        am.params = { previousId: previousId }

        am.get((data) => {
            if (data.msg === 200) {
                if (data.result.length === 0) {
                    alert("첫 번째 페이지 입니다. ")
                }
                else {
                    this.setState({
                        page: this.state.page - 1,
                        bookData: data.result
                    })
                }
            }
            else {
                alert("오류! 다시 시도해주세요. ")
            }
        })
    }

    _clickNext = () => {
        var nextId = this.state.bookData[this.state.bookData.length - 1].tb_book_id
        console.log(nextId)

        am.url = "http://localhost:4000/books/getMainBook"
        am.params = { nextId: nextId }

        am.get((data) => {
            if (data.msg === 200) {
                if (data.result.length === 0) {
                    alert("마지막 페이지 입니다. ")
                }
                else {
                    this.setState({
                        page: this.state.page + 1,
                        bookData: data.result
                    })
                }
            }
            else {
                alert("오류! 다시 시도해주세요. ")
            }
        })
    }

    render() {
        return (
            <div>
                <MainPresenter
                    {...this.props}
                    {...this.state}
                    openModal={this._openModal}
                    closeModal={this._closeModal}
                    updateBookData={this._updateBookData}
                    deleteBook={this._deleteBook}
                    borrow={this._borrow}
                    return={this._return}
                    clickPrevious={this._clickPrevious}
                    clickNext={this._clickNext}></MainPresenter>
            </div>
        );
    }
}

export default MainContainer;