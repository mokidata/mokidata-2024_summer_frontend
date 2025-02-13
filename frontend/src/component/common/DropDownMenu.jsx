import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearStore } from "../../store/salesApiSlice";
import { useState } from "react";
import { mokiApi } from "../../services/loginApi";
function DropDownMenu(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logout = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("name");
    try {
      const response = mokiApi.delete("/api/auth/logout");
    } catch (error) {
      console.error(error);
    }

    dispatch(clearStore());
    navigate("/");
  };
  const [lang, setLang] = useState("ko");

  const changeLang = (lang) => {
    setLang(lang);
    props.changeLanguage(lang);
  };

  return (
    <div className="side-nav">
      <div className="side-nav__top">
        <div className="side-nav__close" onClick={() => props.open()}>
          창 닫기
        </div>
        <div className="side-nav__title" onClick={() => logout()}>
          {props.t("logout")}
        </div>
      </div>
      <div className="side-nav__bottom-name">
        {sessionStorage.getItem("name")}
      </div>
      <div style={{ marginTop: "10vw", fontWeight: "bold" }}>[바로가기]</div>
      <div className="side-nav__list">
        {props.sideList.map((element, index) => (
          <div
            className="side-nav__content"
            onClick={() => {
              props.open();
              props.onclickFunction(index);
            }}
          >
            {index + 1}. {element}
          </div>
        ))}
      </div>
      <div className="side-nav__bottom">
        <div className="side-nav__bottom-language__div">
          <div
            className="side-nav__bottom-language"
            onClick={() => changeLang("ko")}
            style={{
              backgroundColor: lang === "ko" ? "#E96B76" : "transparent",
              color: lang === "ko" ? "white" : "black",
            }}
          >
            한국어
          </div>
          <div
            className="side-nav__bottom-language"
            onClick={() => changeLang("en")}
            style={{
              backgroundColor: lang === "en" ? "#E96B76" : "transparent",
              color: lang === "en" ? "white" : "black",
            }}
          >
            English
          </div>
        </div>
      </div>
    </div>
  );
}

export default DropDownMenu;
