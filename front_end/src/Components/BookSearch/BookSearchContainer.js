import React, { Component } from 'react';
import APIManager from '../../APIManagers';
import BookSearchPresenter from './BookSearchPresenter';

let am = new APIManager();

class BookSearchContainer extends Component {
    state = {
        bookData: [],
        searchName: null,
        modalIsOpen: false,
        page: 1,

        modalBook: []
    }

    componentDidMount = () => {
        this.setState({
            searchName: this.props.match.params.searchName
        })
        this._selectBook();
    }

    //검색어가 바뀌었을 때
    componentDidUpdate = () => {
        if (this.state.searchName !== this.props.match.params.searchName) {
            this.setState({
                searchName: this.props.match.params.searchName
            })
            this._selectBook();
        }
    }

    _selectBook = () => {
        am.url = "http://localhost:4000/books/getAllBook"

        am.get((data) => {
            data = data.filter(book => {
                return book.tb_book_name.includes(this.state.searchName)
            })
            this.setState({
                bookData: data
            })
        })
    }

    _updateBookData = () => {
        this.props.history.push({ pathname: '/bookUpdate', state: { bookId: this.state.modalBook.tb_book_id } })
    }

    _deleteBook = () => {
        am.url = "http://localhost:4000/books/deleteBook"
        am.data = { bookId: this.state.modalBook.tb_book_id }

        am.post((data) => {
            console.log(data)
            if (data === "대출됨") {
                alert("대출 상태의 책 입니다. ")
            }
            else {
                this._closeModal()
                this._selectBook()
            }
        })
    }

    _borrow = () => {
        am.url = "http://localhost:4000/books/borrowBook"
        am.data = { userId: this.props.userId, bookId: this.state.modalBook.tb_book_id }

        am.post((data) => {
            console.log(data)
            this._selectBook()
            this._modalBookData(this.state.modalBook.tb_book_id)
        })
    }

    _return = () => {
        am.url = `http://localhost:4000/books/borrowUser/${this.state.modalBook.tb_book_id}`

        am.get((data) => {
            console.log(data[0])
            if (data[0].tb_user_id === this.props.userId) {
                am.url = "http://localhost:4000/books/returnBook"
                am.data = { borrowId: data[0].tb_borrow_id, bookId: this.state.modalBook.tb_book_id }

                am.post((data) => {
                    this._selectBook()
                    this._modalBookData(this.state.modalBook.tb_book_id)
                })
            }
            else {
                alert("대출한 책이 아닙니다. ")
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
            console.log(data[0])
            this.setState({
                modalBook: data[0]
            })
        })
    }

    render() {
        return (
            <div>
                <BookSearchPresenter
                    {...this.props}
                    {...this.state}
                    openModal={this._openModal}
                    closeModal={this._closeModal}
                    updateBookData={this._updateBookData}
                    deleteBook={this._deleteBook}
                    borrow={this._borrow}
                    return={this._return}></BookSearchPresenter>
            </div>
        );
    }
}

export default BookSearchContainer;