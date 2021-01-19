import React, { Component } from 'react';
import APIManager from '../../APIManagers';
import BookRegisterPresenter from './BookRegisterPresenter'

let am = new APIManager()

class BookRegisterContainer extends Component {

    state = {
        bookName: "",
        bookAuthor: "",
        bookImage: "https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2F20130206_139%2Fapp4857_1360157994292NfIeo_PNG%2F%25B8%25B6%25BD%25C3%25B8%25E1%25B7%25CE_%25C0%25CC%25BE%25DF%25B1%25E22.png&type=a340"
    }

    changehandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    _imageSetting = () => {

    }

    _bookRegister = () => {

        //image register



        //book register
        am.url = "http://192.168.0.2:4000/books/insertBook"
        am.data = { bookName: this.state.bookName, bookAuthor: this.state.bookAuthor, bookImage: this.state.bookImage }

        am.post((data) => {
            console.log(data)
            this.props.history.push('/')
        })
    }

    render() {
        return (
            <div>
                <BookRegisterPresenter {...this.props} {...this.state} changehandler={this.changehandler} imageSetting={this._imageSetting} bookRegister={this._bookRegister}></BookRegisterPresenter>
            </div>
        );
    }
}

export default BookRegisterContainer;