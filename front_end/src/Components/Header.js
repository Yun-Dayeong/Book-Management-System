import React, { useState } from 'react';
import { Link } from 'react-router-dom'

const Header = (props) => {
    const [inputs, setInputs] = useState({
        searchName: ""
    });

    const { searchName } = inputs;

    const changehandler = (e) => {
        const { value, name } = e.target;
        setInputs({
            ...inputs,
            [name]: value
        });
    };

    return (
        <ul>
            <li><Link to='/'>메인</Link></li>
            <input name="searchName" placeholder="책 이름을 검색하세요. " onChange={changehandler} value={searchName}></input>
            <Link to={`/bookSearch/${searchName}`}><button>검색</button></Link>
            {
                props.userManagement === 0 ?
                    <div>
                        <li onClick={props.logout}>로그아웃</li>
                        <li><Link to='/myInfo'>내 정보</Link></li>
                    </div>
                    :
                    props.userManagement === 1 ?
                        <div>
                            <li onClick={props.logout}>로그아웃</li>
                            <li><Link to='/bookRegister'>책 등록</Link></li>
                        </div>
                        :
                        <div>
                            <li><Link to='/login'>로그인</Link></li>
                            <li><Link to='/join'>회원가입</Link></li>
                        </div>
            }
        </ul>
    );
};

export default Header;