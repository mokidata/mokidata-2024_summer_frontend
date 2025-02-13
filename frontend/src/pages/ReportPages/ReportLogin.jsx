import React, { useState, useEffect } from "react";
import Button from "../../component/common/Button";
import Header from "../../component/common/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { mokiApi } from "../../services/loginApi";
import { totalThunks } from "../../store/salesApiSlice";
import axios from "axios";
import { formatDate } from "../../functions/DateConverter";
import ToastMessage from "../../component/common/Toast";
import { BASE_URL } from "../../component/Url";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState({ id: "", pswd: "" });
  const [toast, setToast] = useState(false);
  const [autoLogin, setAutoLogin] = useState(false);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInputValue({ ...inputValue, [name]: value });
  };
  const fetchData = () => {
    console.log("dispatch!");
    dispatch(totalThunks(formatDate(new Date())));
  };

  const handleLoginSuccess = () => {
    fetchData();
    console.log("");
    navigate("../daily");
  };
  const handleLogin = async (event, inputValue) => {
    delete axios.defaults.headers.common["Authorization"];
    try {
      const response = await mokiApi.post("/api/auth/login", {
        id: inputValue.id,
        password: inputValue.pswd,
        remember_me: autoLogin,
      });
      sessionStorage.setItem("accessToken", response.data.token);
      sessionStorage.setItem("name", response.data.name);
      mokiApi.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
      console.log(mokiApi.defaults.headers.common);
      console.log(response);
      if (response.status == 200) {
        handleLoginSuccess();
      } else {
        console.log("login error!");
      }
    } catch (error) {
      console.error(error);
      setToast(true);
    }
  };

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const refreshResponse = await axios.post(
          `${BASE_URL}api/auth/refresh`,
          {},
          { withCredentials: true }
        );
        if (refreshResponse.status === 200) {
          const refreshData = refreshResponse.data;
          sessionStorage.setItem("accessToken", refreshData.token);
          sessionStorage.setItem("name", refreshData.name);
          mokiApi.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${refreshData.token}`;
          handleLoginSuccess();
        }
      } catch (error) {
        console.error("Failed to refresh token:", error);
      }
    };

    refreshToken();
  }, []);
  let scrollPos = 0;

  // 키보드가 나타날 때
  window.addEventListener("focusin", () => {
    scrollPos = window.scrollY; // 현재 스크롤 위치 저장
  });

  // 키보드가 사라질 때
  window.addEventListener("focusout", () => {
    window.scrollTo(0, scrollPos); // 저장한 위치로 스크롤 복원
  });

  return (
    <div className="login-page">
      <div className="logo-div">
        <img src="/assets/moki_logo(2024).png" style={{ width: "13vw" }} />
        <h2 style={{ fontSize: "6vw", margin: "3vh" }}>
          실시간 매출 분석 데이터
        </h2>
      </div>
      <div className="input-div">
        <div className="login-desc" id="id">
          <p style={{ marginTop: "5vw", fontSize: "3.3vw" }}>
            아이디(사업자번호)
          </p>
        </div>
        <div className="login-input" id="id" style={{ marginBottom: "4vw" }}>
          <input
            className="login-input-img"
            name="id"
            value={inputValue.id}
            onChange={handleInputChange}
          />
        </div>
        <div className="login-desc" id="pswd">
          <p style={{ marginTop: "5vw", fontSize: "3.3vw" }}>비밀번호</p>
        </div>
        <div className="login-input" style={{ marginBottom: "3vw" }}>
          <input
            className="login-input-img"
            name="pswd"
            value={inputValue.pswd}
            type="password"
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="auto_login">
        <label style={{ fontSize: "3.5vw" }}>
          <input
            type="checkbox"
            checked={autoLogin}
            onChange={(e) => setAutoLogin(e.target.checked)}
            style={{ width: "3.5vw", height: "3.5vw" }}
          ></input>
          &nbsp;자동 로그인
        </label>
      </div>
      <div
        className="button-div"
        id="login"
        onClick={(event) => {
          if (inputValue.id && inputValue.pswd) {
            handleLogin(event, inputValue); // 값이 있을 때만 함수 호출
          }
        }}
      >
        <button
          className={
            inputValue.id.trim() && inputValue.pswd.trim() ? "active" : ""
          }
          disabled={!(inputValue.id.trim() && inputValue.pswd.trim())}
          style={{ fontSize: "4vw", height: "10vw" }}
        >
          로그인
        </button>
      </div>

      {toast && (
        <ToastMessage
          setToast={setToast}
          text="아이디 또는 비밀번호가 일치하지 않습니다."
        />
      )}
    </div>
  );
}

export default Login;
