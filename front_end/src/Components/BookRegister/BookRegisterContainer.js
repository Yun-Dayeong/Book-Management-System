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
            //book register
            am.url = "http://localhost:4000/books/insertBook"
            am.data = { bookName: this.state.bookName, bookAuthor: this.state.bookAuthor }

            am.post((data) => {
                if (data.msg === 200) {
                    //image register
                    var formData = new FormData();
                    formData.append("bookId", data.result.insertId)
                    formData.append("file", this.state.bookImage)
                    am.url = "http://localhost:4000/books/insertBookImage";
                    am.data = formData;

                    am.post((data) => {
                        if (data.msg === 200) {
                            alert("등록되었습니다. ")
                            this.props.history.goBack();
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