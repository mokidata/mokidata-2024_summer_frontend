import { useState } from "react";
import InputName from "../../component/admin/InputName";
import InputPeriod from "../../component/admin/InputPeriod";
import MenuSet from "../../component/admin/MenuSet";
import { formatDate } from "../../component/common/DateConverter";

function AdminIndex(){

    const [nameModal,setNameModal] = useState(false)
    const [periodModal,setPeriodModal] = useState(false)
    const [menuModal,setMenuModal] = useState(false)
    const [storeName, setStoreName] = useState("매장명 입력")
    const [period,setPeriod] = useState({"start" : "","end":""});
    const [menuList,setMenuList] = useState(['아이스 아메리카노','아이스 스윗솔티 라떼','아이스 바닐라라떼','아이스티(ONLY ICE)','아이스 카페라떼'])
    const openNameModal = () => {
        setNameModal(true)
    }
    const openPeriodModal = () => {
        setPeriodModal(true)
    }
    const openMenuModal = () => {
        setMenuModal(true)
    }
    useState(()=>{
        const today = new Date()
        const formatToday = formatDate(today)
        setPeriod({"start" : formatToday, "end" : formatToday })
    })
    return(
        <div className="admin-page" >
            <InputName openModal={openNameModal} storeName={storeName}></InputName>
            <InputPeriod openModal={openPeriodModal} startDate={period.start} endDate={period.end} ></InputPeriod>
            <MenuSet menuList={menuList}></MenuSet>
        </div>
    );
        
}

export default AdminIndex;