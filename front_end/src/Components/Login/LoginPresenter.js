import React from 'react';

const LoginPresenter = (props) => {
    return (
        <div>
            <input type="text" placeholder="아이디를 입력하시오. " name="userId" onChange={props.changehandler} value={props.userId} /><br />
            <input type="text" placeholder="비밀번호를 입력하시오." name="userPassword" onChange={props.changehandler} value={props.userPassword} /><br />
            <button onClick={props.login}>로그인</button>
        </div>
    );
};

export default LoginPresenter;