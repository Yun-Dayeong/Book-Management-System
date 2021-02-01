import React from 'react';

const BookUpdatePresenter = (props) => {
    return (
        <div className="flex justify-center items-center mt-16">
            <div>
                <div className="font-sans text-xl text-center font-bold text-black mx-8 my-4">Book Edit</div>
                <input
                    className="border-solid border border-gray-500 rounded-sm placeholder-gray-500 font-sans font-normal text-sm px-2 py-1.5 w-72 my-1"
                    type="text" placeholder="책 이름을 입력하시오. " name="bookName" onChange={props.changehandler} value={props.bookName} /><br />
                <input
                    className="border-solid border border-gray-500 rounded-sm placeholder-gray-500 font-sans font-normal text-sm px-2 py-1.5 w-72 my-1"
                    type="text" placeholder="작가를 입력하시오." name="bookAuthor" onChange={props.changehandler} value={props.bookAuthor} /><br />
                <img
                    className="bg-gray-200 w-40 h-56 border border-gray-200 mt-1"
                    src={props.imageViewURL} alt="BookImage" width={120} height={200}></img><br />
                <input type="file" accept="image/*" onChange={props.inputFile} /><br />
                <div className="mt-3">
                    <button
                        className="border-solid border border-gray-500 rounded-sm bg-gray-500 font-sans font-semibold text-sm text-white px-2 py-1.5 w-36 mr-0.5"
                        onClick={props.bookUpdate}>책 수정하기</button>
                    <button
                        className="border-solid border border-gray-500 rounded-sm bg-gray-500 font-sans font-semibold text-sm text-white px-2 py-1.5 w-36 ml-0.5"
                        onClick={props.cancel}>취소</button>
                </div>
            </div>
        </div>
    );
};

export default BookUpdatePresenter;