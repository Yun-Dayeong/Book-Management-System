import React from 'react';
import Modal from 'react-modal'
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '40rem',
        height: '25rem'
    }
};
Modal.setAppElement('body')

const MainPresenter = (props) => {
    return (
        <div>
            <div className="grid grid-cols-5 mx-60 mt-8 border-b border-gray-200">
                {props.bookData.map((book, index) => (
                    <div className="justify-self-center my-3" key={book.tb_book_id} onClick={() => props.openModal(book.tb_book_id)}>
                        <img className="bg-gray-200 w-40 h-56 border border-gray-200" src={book.tb_book_image} alt="BookImage" />
                        <div className="font-sans text-sm font-bold text-center mt-1 truncate">{book.tb_book_name}</div>
                        <div className="font-sans text-xs font-medium text-center -mt-0.5 truncate">{book.tb_book_author}</div>
                    </div>
                ))}
                <Modal
                    isOpen={props.modalIsOpen}
                    onRequestClose={props.closeModal}
                    style={customStyles}
                    contentLabel="Book Detail">
                    <div className="font-sans text-lg font-bold text-black mx-8 my-4">Book Information</div>
                    <div className="flex mx-8">
                        <img className="bg-gray-200 w-40 h-56 border border-gray-200" src={props.modalBook.tb_book_image} alt="BookImage" />
                        <div className="ml-10">
                            <div className="mb-1">
                                <span className="font-sans text-base font-bold text-black">제목 : </span>
                                <span className="font-sans text-sm font-normal text-black">
                                    {props.modalBook.tb_book_name}</span><br />
                            </div>
                            <div className="mb-1">
                                <span className="font-sans text-base font-bold text-black">작가 : </span>
                                <span className="font-sans text-sm font-normal text-black">
                                    {props.modalBook.tb_book_author}</span><br />
                            </div>
                            <div className="mb-1">
                                <span className="font-sans text-base font-bold text-black">대출 상태 : </span>
                                {props.modalBook.tb_book_state === 1 ?
                                    <span className="font-sans text-sm font-medium text-red-400">
                                        대출 중</span>
                                    :
                                    <span className="font-sans text-sm font-medium text-blue-600">
                                        대출 가능</span>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center mt-8">
                        {props.userManagement === 1 ?
                            <span>
                                <button
                                    className="border-solid border border-gray-400 rounded-sm bg-gray-400 font-sans font-semibold text-sm text-white px-2 py-1 mx-1"
                                    onClick={props.updateBookData}>Edit</button>
                                <button
                                    className="border-solid border border-gray-400 rounded-sm bg-gray-400 font-sans font-semibold text-sm text-white px-2 py-1 mx-1"
                                    onClick={props.deleteBook}>Delete</button>
                            </span>
                            :
                            props.userManagement === 0 ?
                                props.modalBook.tb_book_state === 0 ?
                                    <span>
                                        <button
                                            className="border-solid border border-gray-400 rounded-sm bg-gray-400 font-sans font-semibold text-sm text-white px-2 py-1 mx-1"
                                            onClick={props.borrow}>Borrow</button>
                                    </span>
                                    :
                                    <span>
                                        <button
                                            className="border-solid border border-gray-400 rounded-sm bg-gray-400 font-sans font-semibold text-sm text-white px-2 py-1 mx-1"
                                            onClick={props.return}>Return</button>
                                    </span>
                                :
                                <span></span>

                        }
                        <button
                            className="border-solid border border-gray-600 rounded-sm bg-gray-600 font-sans font-semibold text-sm text-white px-2 py-1 mx-1"
                            onClick={props.closeModal}>Close</button>
                    </div>
                </Modal>
            </div>
            <div className="flex justify-center items-center m-2">
                <span className="font-bold" onClick={props.clickPrevious}><IoIosArrowBack /></span>
                <span className="font-sans font-semibold text-sm mx-2">{props.page}</span>
                <span className="font-bold" onClick={props.clickNext}><IoIosArrowForward /></span>
            </div>
        </div>
    );
};

export default MainPresenter;