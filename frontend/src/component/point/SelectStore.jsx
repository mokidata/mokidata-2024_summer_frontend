import { useNavigate } from "react-router-dom";

const SelectStore = ({ storelist, user_id }) => {
  const navigate = useNavigate();
  const handleClick = (storeId) => {
    console.log(storeId);
    navigate(`/Point/store_id/${storeId}/user_id/${user_id}`);
  };

  return (
    <div className="select-store-container">
      <div style={{ fontWeight: "bold", fontSize: "6vw" }}>매장 선택</div>
      {storelist.length > 0 ? (
        storelist.map((store) => (
          <div
            key={store.store_id}
            className="store-card"
            onClick={() => handleClick(store.store_id)}
          >
            <p style={{ fontSize: "4.5vw" }}>{store.store_name}</p>
          </div>
        ))
      ) : (
        <p className="no-store-message">매장 목록이 없습니다.</p>
      )}
    </div>
  );
};

export default SelectStore;
