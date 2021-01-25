import React, { Component } from 'react';
import APIManager from '../../APIManagers';
import BookUpdatePresenter from './BookUpdatePresenter'

let am = new APIManager()

class BookUpdateContainer extends Component {

    state = {
        bookName: "",
        bookAuthor: "",
        bookImage: "",
    }

    componentDidMount = () => {
        this._selectBook()
    }

    _selectBook = () => {
        am.url = `http://localhost:4000/books/getBook/${this.props.location.state.bookId}`

        am.get((data) => {
            console.log(data[0])
            this.setState({
                bookName: data[0].tb_book_name,
                bookAuthor: data[0].tb_book_author,
                bookImage: data[0].tb_book_image,
            })
        })
    }

    changehandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    _imageSetting = () => {

    }

    _bookUpdate = () => {

        //image register



        //book update
        am.url = "http://localhost:4000/books/updateBook"
        am.data = { bookId: this.props.location.state.bookId, bookName: this.state.bookName, bookAuthor: this.state.bookAuthor, bookImage: this.state.bookImage }

        am.post((data) => {
            console.log(data)
            this.props.history.push('/')
        })
    }

    render() {
        return (
            <div>
                <BookUpdatePresenter {...this.props} {...this.state} changehandler={this.changehandler} imageSetting={this._imageSetting} bookUpdate={this._bookUpdate}></BookUpdatePresenter>
            </div>
        );
    }
}

export default BookUpdateContainer;