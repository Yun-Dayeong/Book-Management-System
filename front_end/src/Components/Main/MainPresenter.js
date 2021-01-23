import React from 'react';
import Modal from 'react-modal'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
Modal.setAppElement('body')

const MainPresenter = (props) => {
    return (
        <div>
            {props.bookData.map((book, index) => (
                <div key={book.tb_book_id} onClick={() => props.openModal(book.tb_book_id)}>
                    <img src={book.tb_book_image} alt="BookImage" width={120} height={200} />
                    <div>{book.tb_book_name}</div>
                    <div>{book.tb_book_author}</div>
                    <div>{book.tb_book_state}</div>
                </div>
            ))}
            <Modal
                isOpen={props.modalIsOpen}
                onRequestClose={props.closeModal}
                style={customStyles}
                contentLabel="Book Detail">
                <div>책 정보</div>
                <img src={props.modalBook.tb_book_image} alt="BookImage" width={120} height={200} />
                <div>제목 : {props.modalBook.tb_book_name}</div>
                <div>작가 : {props.modalBook.tb_book_author}</div>
                <div>대출 상태 : {props.modalBook.tb_book_state}</div>
                {props.userManagement === 1 ?
                    <div>
                        <button onClick={props.updateBookData}>수정</button>
                        <button onClick={props.deleteBook}>삭제</button>
                    </div>
                    :
                    props.userManagement === 0 ?
                        props.modalBook.tb_book_state === 0 ?
                            <div>
                                <button onClick={props.borrow}>대출</button>
                            </div>
                            :
                            <div>
                                <button onClick={props.return}>반납</button>
                            </div>
                        :
                        <div></div>

                }
                <button onClick={props.closeModal}>close</button>
            </Modal>
        </div>
    );
};

export default MainPresenter;