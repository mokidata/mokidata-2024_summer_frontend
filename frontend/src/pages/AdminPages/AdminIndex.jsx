import { useState } from "react";
import InputName from "../../component/admin/InputName";
import InputPeriod from "../../component/admin/InputPeriod";
import MenuSet from "../../component/admin/MenuSet";
import { formatDate } from "../../component/common/DateConverter";
import NameModal from "../../component/admin/NameModal";
import MenuModal from "../../component/admin/MenuModal";
import { useLocation } from "react-router-dom";
import { mokiApi } from "../../app/api/loginApi";
import Button from "../../component/common/Button";
import Loading from "../../component/admin/Loading";

function AdminIndex(){
    const [nameModal,setNameModal] = useState(false)
    const [periodModal,setPeriodModal] = useState(false)
    const [menuModal,setMenuModal] = useState(false)
    const [storeName, setStoreName] = useState("매장명 입력")
    const [period,setPeriod] = useState({"startDate" : "","endDate":""});
    const [menuList,setMenuList] = useState([])
    const [isEmpty,setIsEmpty] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    // const [menuList,setMenuList] = useState([{
    //     "name": "아이스 아메리카노",
    //     "img": "string",
    //     "price": 1000
    //   },{
    //     "name": "아이스 스윗솔티 라떼",
    //     "img": "string",
    //     "price": 2000
    //   },{
    //     "name": "아이스 바닐라라떼",
    //     "img": "string",
    //     "price": 3000
    //   }
    //   ,{
    //     "name": "아이스티(ONLY ICE)",
    //     "img": "string",
    //     "price": 4000
    //   },{
    //     "name": "아이스 카페라떼",
    //     "img": "string",
    //     "price": 5000
    //   }])
    const openNameModal = () => {
        setNameModal(!nameModal)
    }
    const openPeriodModal = () => {
        setPeriodModal(!periodModal)
    }

    const openMenuModal = () => {
        setMenuModal(!menuModal)
    }
    const getMenuList = async () =>{
        console.log("getMenuList")
        let data = []
        const response = await mokiApi.get("/api/menu/list")
        if (response.status == 200){
            data = response.data
        }
        setMenuList(data)
    }
    const postRandom = async () =>{
        let formData = {"startDate":period.startDate,"endDate":period.endDate}
        const response = await mokiApi.post(`/api/menu/random`,formData).then(
            (response)=>{
                console.log(response)
                setIsLoading(false)
            }
        ).catch(
            (error) => {console.log(error)}
        )
    }
    const postAction = () =>{
        console.log("postAction")
        setIsLoading(true)
        postRandom()
    }
    
    useState(()=>{
        if(menuList.length !== 0){
            setIsEmpty(true)
        }
        else{
            setIsEmpty(false)
        }
        setMenuModal(false)
        setNameModal(false)
        setPeriodModal(false)
        getMenuList()

    },[])
    

    useState(()=>{
        getMenuList()
        const today = new Date()
        const formatToday = formatDate(today)
        setPeriod({"startDate" : "2024-06-25", "endDate" : formatToday })
    })

    if(isLoading){
        return(
            <Loading></Loading>
        )
    }
    return(
        <div className="admin-page" >
            {nameModal && <NameModal openModal={openNameModal}> </NameModal>}
            {menuModal && <MenuModal menuList={menuList} openModal={openMenuModal}> </MenuModal>}
            <InputName openModal={openNameModal} storeName={storeName}></InputName>
            <InputPeriod openModal={openPeriodModal} startDate={period.startDate} endDate={period.endDate} ></InputPeriod>
            <MenuSet openModal={openMenuModal} menuList={menuList}></MenuSet>
            <div className="remove-btn"> 데이터 초기화 </div>
            <div className="modal-btn" onClick={() => {postAction()}}>
                <Button txt="데이터 생성하기" color={isEmpty? "grey" :"black"} shape="rect" ></Button>
            </div>
        </div>
    );
        
}

export default AdminIndex;