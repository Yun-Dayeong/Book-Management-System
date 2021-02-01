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
        <div className="container flex max-w-full max-h-full justify-between items-center border-b border-gray-400 bg-white px-4 h-14 inset-0">
            <div>
                <span className="mx-4 my-4 font-sans font-bold text-xl"><Link to='/'>Main</Link></span>
                <span className="mx-4 my-4">
                    <input className="border-solid border border-blue-600 rounded-l-sm placeholder-gray-400 font-sans font-normal text-sm px-2 py-1 w-64" name="searchName" placeholder="책 이름을 검색하세요. " onChange={changehandler} value={searchName}></input>
                    <Link to={`/bookSearch/${searchName}`}><button className="border-solid border border-blue-600 rounded-r-sm bg-blue-600 font-sans font-normal text-sm text-white px-2 py-1">Search</button></Link>
                </span>
            </div>
            {
                props.userManagement === 0 ?
                    <div className="">
                        <span className="mx-4 my-4 font-sans font-light text-xs text-black">{props.userName}님</span>
                        <span className="mx-4 my-4 font-sans font-medium text-base text-gray-400"><Link to='/myInfo'>My Info</Link></span>
                        <span className="mx-4 my-4 font-sans font-medium text-base text-gray-400" onClick={props.logout}><Link to='/'>Logout</Link></span>
                    </div>
                    :
                    props.userManagement === 1 ?
                        <div className="">
                            <span className="mx-4 my-4 font-sans font-light text-xs text-black">{props.userName} 관리자님</span>
                            <span className="mx-4 my-4 font-sans font-medium text-base text-gray-400"><Link to='/bookRegister'>Book Register</Link></span>
                            <span className="mx-4 my-4 font-sans font-medium text-base text-gray-400" onClick={props.logout}><Link to='/'>Logout</Link></span>
                        </div>
                        :
                        <div className="">
                            <span className="mx-4 my-4 font-sans font-medium text-base text-gray-400"><Link to='/login'>Login</Link></span>
                            <span className="mx-4 my-4 font-sans font-medium text-base text-gray-400"><Link to='/join'>Join</Link></span>
                        </div>
            }
        </div>
    );
};

export default Header;