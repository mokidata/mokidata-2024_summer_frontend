import { useState } from "react";
import Button from "../../component/common/Button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { mokiApi } from "../../app/api/loginApi";

function AdminLogin(){
    const navigate = useNavigate()
    const [inputValue, setInputValue] = useState({ id: "", pswd: "" });
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInputValue({ ...inputValue, [name]: value });
    };

    const handleLoginSuccess = (name) => {
        navigate("./main",{state:{"name":name}})
        console.log("")
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
            if(response.status == 200){
                const name = response.data.name
                handleLoginSuccess(name);
            }
            else{
                console.log("login error!")
            }
            
        } catch (error) {
            console.error(error);
            // setPassed(false); // 로그인 실패 시 상태 업데이트
        }
        
    };
    return(
        <div className="login-page">
            <div className="input-div">
                <div className="login-desc" id='id'>
                    <p>아이디</p>
                </div>
                <div className="login-input" id='id'>
                    <input
                        className="admin-input-img"
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
            <div className="button-div" id="admin-login" onClick={(event) => {
                handleLogin(event, inputValue); 
            
            }}>
                <Button color="blue" txt="로그인"/>
            </div>

        </div>
    )
}

export default AdminLogin;