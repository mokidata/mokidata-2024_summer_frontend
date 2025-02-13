import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ToastMessage from "../../component/common/Toast";
import ReactModal from "react-modal";
import SelectStore from "../../component/point/SelectStore";
import { getData } from "../../services/loginApi";
import { mokiApi } from "../../services/loginApi";

const PONO = () => {
  const [inputValue, setInputValue] = useState("");
  const [isInput, setIsInput] = useState(false);
  const [toast, setToast] = useState(false);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [storeList, setStoreList] = useState({ data: [] });
  const [userId, setUserId] = useState();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value.trim());
    setIsInput(event.target.value.trim() !== "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // 페이지 리로딩 방지

    const phoneRegex = /^[0-9]{10,11}$/;
    if (!phoneRegex.test(inputValue)) {
      setToast(true);
      return;
    }

    try {
      const response = await mokiApi.get(`/api/point?phone_num=${inputValue}`);
      if (response.data !== undefined) {
        setUserId(inputValue.slice(-4));
        setStoreList(response.data);
        openModal();
      } else {
        setToast(true);
      }
    } catch (error) {
      console.log(error);
      setToast(true);
    }
  };
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
    <div className="PONO_input_page">
      <div className="logo_title">
        <img src="/assets/moki_logo(2024).png" style={{ width: "13vw" }} />
        <h2 style={{ fontSize: "6vw", marginTop: "3vh" }}>
          포인트 이용내역 조회
        </h2>
      </div>
      <form className="PONO_input" onSubmit={handleSubmit}>
        <div>
          <p>휴대폰 번호 입력</p>
        </div>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button
          type="submit"
          className={isInput ? "active" : ""}
          disabled={!isInput}
          style={{ fontSize: "3.5vw" }}
        >
          조회하기
        </button>
      </form>
      {toast && (
        <ToastMessage
          setToast={setToast}
          text="입력한 휴대폰의 검색결과가 존재하지 않습니다."
        />
      )}
      <ReactModal
        ariaHideApp={false}
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={{
          content: {
            width: "75vw",
            height: "75vh",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          },
          overlay: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <SelectStore storelist={storeList.data} phone_num={inputValue} />
        <div className="modal_footer">
          <button onClick={closeModal} style={{ fontSize: "4.5vw" }}>
            닫기
          </button>
        </div>
      </ReactModal>
    </div>
  );
};

export default PONO;
