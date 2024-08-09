import React, { useState } from "react";
import Button from "../../component/common/Button";
import Header from "../../component/common/Header";
import { useDispatch, useSelector } from "react-redux";
import {useNavigate} from "react-router-dom"
import { mokiApi } from "../../app/api/loginApi";
import { totalThunks } from "../../services/salesApiSlice";
import axios from "axios";
import { formatDate } from "../../component/common/DateConverter";

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [inputValue, setInputValue] = useState({ id: "", pswd: "" });
    const [passed, setPassed] = useState(true);
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputValue({ ...inputValue, [name]: value });
    };
    const fetchData = () => {
        console.log("dispatch!")
        dispatch(totalThunks(formatDate(new Date())));
    }
   
    const handleLoginSuccess = () => {
        fetchData();
        console.log("")
        navigate("weekly");
    };
    const handleLogin = async (event,inputValue) => {
        
        
        try {
            const response = await mokiApi.post("/api/auth/login", {
                id: inputValue.id,
                password: inputValue.pswd
            });
            sessionStorage.setItem("accessToken",response.data.token)
            mokiApi.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
            console.log(mokiApi.defaults.headers.common);
            console.log(response);
            if(response.status == 200){
                handleLoginSuccess();
            }
            else{
                console.log("login error!")
            }
            
        } catch (error) {
            console.error(error);
            // setPassed(false); // 로그인 실패 시 상태 업데이트
        }
    };
    


    return (
        <div className="login-page">
            <Header page="login" />
            <div className="logo-div">
                <svg className="logo-img"></svg>
            </div>
            <div className="input-div">
                <div className="login-desc" id='id'>
                    <p>아이디</p>
                </div>
                <div className="login-input" id='id'>
                    <input
                        className="login-input-img"
                        name="id"
                        value={inputValue.id}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="login-desc" id='pswd'>
                    <p>비밀번호</p>
                </div>
                <div className="login-input">
                    <input
                        className="login-input-img"
                        name="pswd"
                        value={inputValue.pswd}
                        type="password"
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className="button-div" id="login" onClick={(event) => {
                handleLogin(event, inputValue); // 함수 참조로 호출
            
            }}>
                <Button color="black" txt="로그인" shape="rect"/>
            </div>
            <div className="login-msg">
                {passed ? "" : "아이디 또는 비밀번호를 잘못 입력했습니다."}
            </div>
        </div>
    );
}

export default Login;