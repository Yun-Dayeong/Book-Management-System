import React from 'react';

const MyInfoPresenter = (props) => {
    return (
        <div>
            <div>내 정보</div>
            <div>{props.userId}</div>
            <div>{props.userName}</div><br />

            <div>대출한 책</div>
            {props.bookData.map((book, index) => (
                <div key={book.tb_book_id}>
                    <img src={book.tb_book_image} alt="bookImage" width={120} height={200} />
                    <div>{book.tb_book_name}</div>
                    <div>{book.tb_book_author}</div>
                    <div>{book.tb_book_state}</div>
                </div>
            ))}
        </div>
    );
};

export default MyInfoPresenter;