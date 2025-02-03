import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ToastMessage from "../../component/common/Toast";
import ReactModal from "react-modal";
import SelectStore from "../../component/point/SelectStore";
import { getData } from "../../services/loginApi";

const PONO = () => {
  const [inputValue, setInputValue] = useState("");
  const [isInput, setIsInput] = useState(false);
  const [toast, setToast] = useState(false);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const endpoint = "api/user/storelist.php";
  const datatosend = {
    phone_num: inputValue,
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const user_id = "5678";
  const storelist = {
    data: [
      {
        store_id: "0101010101",
        store_name: "카페쇼1",
      },
      {
        store_id: "0202020202",
        store_name: "카페쇼2",
      },
      {
        store_id: "4341701888",
        store_name: "해머스미스커피 강남교보점",
      },
      {
        store_id: "4831902001",
        store_name: "해머스미스 무교다동점 ",
      },
      {
        store_id: "6688133551",
        store_name: "해머스미스 테스트",
      },
      {
        store_id: "8080808080",
        store_name: "매스 커피(80)",
      },
      {
        store_id: "8472001615",
        store_name: "해머스미스커피 압구정역점",
      },
    ],
  };

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

    const fetchdata = getData(endpoint, datatosend);

    // try{
    //     const response = await getData(endpoint + inputValue, {})
    //     console.log(response);
    //     if (response.success) {
    //         navigate('/Point');
    //     } else {
    //         setToast(true);
    //     }
    // } catch (error) {
    //     setToast(true);
    // }

    if (inputValue === "01012345678") {
      // navigate('/Point')
      openModal();
    } else {
      setToast(true);
    }
  };

  return (
    <div className="PONO_input_page">
      <div className="logo_title">
        <svg className="logo-img"></svg>
        <h2>포인트 이용내역 조회</h2>
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
        <SelectStore storelist={storelist.data} user_id={user_id} />
        <div className="modal_footer">
          <button onClick={closeModal}>닫기</button>
        </div>
      </ReactModal>
    </div>
  );
};

export default PONO;
