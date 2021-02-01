import React from 'react';

const JoinPresenter = (props) => {
    console.log(props)
    return (
        <div className="flex justify-center mt-16">
            <div>
                <div className="font-sans text-xl text-center font-bold text-black mx-8 my-4">Join</div>
                <input
                    className="border-solid border border-gray-500 rounded-sm placeholder-gray-500 font-sans font-normal text-sm px-2 py-1.5 w-52 my-1"
                    type="text" placeholder="아이디를 입력하시오. " name="userId" onChange={props.changehandler} value={props.userId} /><br />
                <input
                    className="border-solid border border-gray-500 rounded-sm placeholder-gray-500 font-sans font-normal text-sm px-2 py-1.5 w-52 my-1"
                    type="password" placeholder="비밀번호를 입력하시오." name="userPassword" onChange={props.changehandler} value={props.userPassword} /><br />
                <input
                    className="border-solid border border-gray-500 rounded-sm placeholder-gray-500 font-sans font-normal text-sm px-2 py-1.5 w-52 my-1"
                    type="text" placeholder="이름을 입력하시오." name="userName" onChange={props.changehandler} value={props.userName} /><br />
                <button
                    className="border-solid border border-gray-500 rounded-sm bg-gray-500 font-sans font-semibold text-sm text-white px-2 py-1.5 w-52 mt-2"
                    onClick={props.join}>Join</button>
            </div>
        </div>
    );
};

export default JoinPresenter;