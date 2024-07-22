import React, { useState } from "react";
import Button from "../../component/common/Button";
import Header from "../../component/common/Header";
function Login(){
    const [passed,setPassed] = useState(true);
    console.log("log")
    return (
        <div className="login-page">
            <Header page="login"></Header>
            <div className="logo-div">
                <svg className="logo-img"></svg>
            </div>
            <div className="input-div">
                <div className="login-desc" id='id'>
                    <p>아이디</p>

                </div>
                <div className="login-input" id='id'>
                    <input className="login-input-img" id="id"/> 

                </div>
                <div className="login-desc" id='pswd'>
                    <p>비밀번호</p>
                </div>
                <div className="login-input">
                    <input className="login-input-img" id="pswd"/>
                </div>
                
            </div>
            <div className="button-div">
                <Button color="black" txt="로그인" ></Button>
            </div>
            <div className="login-msg">
                {passed === true ? "" : "아이디 또는 비밀번호를 잘못 입력했습니다."}
                
            </div>
            

        </div>

    );
}

export default Login;