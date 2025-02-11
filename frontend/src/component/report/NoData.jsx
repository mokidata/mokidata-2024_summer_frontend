const NoData = () => {
  return (
    <div className="no_data">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="/assets/info.svg"
          style={{ marginBottom: "2vw", width: "10vw" }}
        ></img>
        <p>비교할 데이터가</p>
        <p>존재하지 않습니다.</p>
      </div>
    </div>
  );
};

export default NoData;
