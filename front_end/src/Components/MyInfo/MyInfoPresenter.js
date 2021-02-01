import React from 'react';

const MyInfoPresenter = (props) => {
    return (
        <div className="flex justify-center mt-16">
            <div>
                <div className="font-sans text-lg font-extrabold text-black mx-8 my-2">내 정보</div>
                <div className="mx-8">
                    <div className="mb-1">
                        <span className="font-sans text-base font-bold text-black">ID : </span>
                        <span className="font-sans text-sm font-normal text-black">
                            {props.userId}</span>
                    </div>
                    <div className="mb-1">
                        <span className="font-sans text-base font-bold text-black">Name : </span>
                        <span className="font-sans text-sm font-normal text-black">
                            {props.userName}</span>
                    </div>
                </div>

                <div className="font-sans text-lg font-extrabold text-black mx-8 mt-8 mb-2">대출한 책</div>
                <div className="grid grid-cols-5 mx-7">
                    {props.bookData.map((book, index) => (
                        <div className="justify-center my-3 mx-1" key={book.tb_book_id}>
                            <img className="bg-gray-200 w-40 h-56 border border-gray-200" src={book.tb_book_image} alt="bookImage" width={120} height={200} />
                            <div className="font-sans text-sm font-bold text-center mt-1 truncate">{book.tb_book_name}</div>
                            <div className="font-sans text-xs font-medium text-center -mt-0.5 truncate">{book.tb_book_author}</div>
                            <button
                                className="border border-gray-500 rounded-sm bg-gray-500 font-sans text-xs font-medium text-center text-white truncate w-full"
                                onClick={() => props.return(book.tb_book_id)}>Return</button>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
};

export default MyInfoPresenter;