import React, { Component } from 'react';
import APIManager from '../../APIManagers';
import BookUpdatePresenter from './BookUpdatePresenter'

let am = new APIManager()

class BookUpdateContainer extends Component {

    state = {
        bookName: "",
        bookAuthor: "",

        bookImage: "",
        imageViewURL: ""
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
                imageViewURL: data[0].tb_book_image,
            })
        })
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

    _bookUpdate = () => {

        if (this.state.bookName === "") {
            alert("책 이름을 입력하세요. ")
        }
        else if (this.state.bookAuthor === "") {
            alert("작가를 입력하세요. ")
        }
        else if (this.state.imageViewURL === "") {
            alert("책 이미지를 입력하세요. ")
        }
        else {
            //book update
            am.url = "http://localhost:4000/books/updateBook"
            am.data = { bookId: this.props.location.state.bookId, bookName: this.state.bookName, bookAuthor: this.state.bookAuthor }

            am.post((data) => {
                console.log(data)
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
    }

    _cancel = () => {
        this.props.history.goBack()
    }

    render() {
        return (
            <div>
                <BookUpdatePresenter
                    {...this.props}
                    {...this.state}
                    changehandler={this.changehandler}
                    inputFile={this._inputFile}
                    bookUpdate={this._bookUpdate}
                    cancel={this._cancel}></BookUpdatePresenter>
            </div>
        );
    }
}

export default BookUpdateContainer;