import React from 'react';

const BookRegisterPresenter = (props) => {
    return (
        <div>
            <input type="text" placeholder="책 이름을 입력하시오. " name="bookName" onChange={props.changehandler} value={props.bookName} /><br />
            <input type="text" placeholder="작가를 입력하시오." name="bookAuthor" onChange={props.changehandler} value={props.bookAuthor} /><br />
            <img src={props.imageViewURL} alt="BookImage" width={120} height={200}></img><br />
            <input type="file" accept="image/*" onChange={props.inputFile} /><br />
            <button onClick={props.bookRegister}>책 등록하기</button>
        </div>
    );
};

export default BookRegisterPresenter;