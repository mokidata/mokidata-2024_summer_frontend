import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundVideo from "../assets/background_video.mp4"; // 파일 경로 import

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="homepage">
      <video autoPlay loop muted playsInline>
        <source src={backgroundVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="logo-div-home" id="home">
        <svg className="logo-img"></svg>
        <p>모키 데이터 센터에</p>
        <p>오신 걸 환영합니다.</p>
      </div>
      <div className="decision-div">
        <button
          className="decision-div-button"
          onClick={() => navigate("/login")}
        >
          {"📈"} 실시간 매출 분석 데이터 조회
          <p>*점주님 전용</p>
        </button>
        <button
          className="decision-div-button"
          onClick={() => navigate("/PONO")}
        >
          {"💬"} 포인트 이용 내역 조회
        </button>
      </div>
    </div>
  );
};

export default Home;
