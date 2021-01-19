import React from 'react';

const JoinPresenter = (props) => {
    console.log(props)
    return (
        <div>
            <input type="text" placeholder="아이디를 입력하시오. " name="userId" onChange={props.changehandler} value={props.userId} /><br />
            <input type="text" placeholder="비밀번호를 입력하시오." name="userPassword" onChange={props.changehandler} value={props.userPassword} /><br />
            <input type="text" placeholder="이름을 입력하시오." name="userName" onChange={props.changehandler} value={props.userName} /><br />
            <button onClick={props.join}>회원가입</button>
        </div>
    );
};

export default JoinPresenter;