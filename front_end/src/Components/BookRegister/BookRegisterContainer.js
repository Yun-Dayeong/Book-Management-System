import React, { Component } from 'react';
import APIManager from '../../APIManagers';
import BookRegisterPresenter from './BookRegisterPresenter'

let am = new APIManager()

class BookRegisterContainer extends Component {

    state = {
        bookName: "",
        bookAuthor: "",

        bookImage: "",
        imageViewURL: ""
    }

    changehandler = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    _inputFile = (e) => {
        let reader = new FileReader();
        let imageFile = e.target.files[0];
        console.log(imageFile)
        reader.onloadend = () => {
            this.setState({
                bookImage: imageFile,
                imageViewURL: reader.result
            })
        }
        reader.readAsDataURL(imageFile);
    }

    _bookRegister = () => {
        //book register
        am.url = "http://localhost:4000/books/insertBook"
        am.data = { bookName: this.state.bookName, bookAuthor: this.state.bookAuthor }

        am.post((data) => {
            //image register
            var formData = new FormData();
            formData.append("bookId", data.insertId)
            formData.append("file", this.state.bookImage)
            am.url = "http://localhost:4000/books/insertBookImage";
            am.data = formData;

            am.post((data) => {
                console.log(data);
                this.props.history.goBack();
            })
        })
    }

    _cancel = () => {
        this.props.history.goBack()
    }

    render() {
        return (
            <div>
                <BookRegisterPresenter
                    {...this.props}
                    {...this.state}
                    changehandler={this.changehandler}
                    bookRegister={this._bookRegister}
                    inputFile={this._inputFile}
                    cancel={this._cancel}></BookRegisterPresenter>
            </div>
        );
    }
}

export default BookRegisterContainer;