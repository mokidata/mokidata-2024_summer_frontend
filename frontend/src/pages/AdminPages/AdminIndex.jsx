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
import WarningModal from "../../component/admin/WarningModal";
import Alert from "../../component/admin/Alert";

function AdminIndex(){
    const [userName,setUserName] = useState("")
    const [nameModal,setNameModal] = useState(false)
    const [periodModal,setPeriodModal] = useState(false)
    const [menuModal,setMenuModal] = useState(false)
    const [warningModal, setWarningModal] = useState(false)
    const [isAlert,setIsAlert] = useState(false)
    const [period,setPeriod] = useState({"startDate" : "","endDate":""});
    const [menuList,setMenuList] = useState([])
    const [isEmpty,setIsEmpty] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [alertColor,setAlertColor] = useState("")
    const [alertMsg,setAlertMsg] = useState("")
    const location = useLocation()
    const state = location.state
    
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
    const openWarningModal = () =>{
        setWarningModal(!warningModal)
    }


    const getAlert = (color,msg) => {
        setAlertColor(color)
        setAlertMsg(msg)
        setIsAlert(!isAlert); // Alert를 보여줌
        setTimeout(() => {
            setIsAlert(false); // 3초 후 Alert를 숨김
        }, 3000);
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
                getAlert("green","데이터 생성 완료")

            }
        ).catch(
            (error) => {
                console.log(error)
                setIsLoading(false)
                getAlert("red","데이터 생성 실패")
                
            }

        )
        
    }
    const postAction = () =>{
        console.log("postAction")
        setIsLoading(true)
        postRandom()
    }
    const deleteAllMenu = async () => {
        const tempArr = []
        for (let menu of menuList){
            tempArr.push(menu.name)
        }
        console.log(tempArr)
        const queryString = tempArr.map(menu => `menu=${encodeURIComponent(menu)}`).join('&');

        const response = await mokiApi.delete(`/api/menu?${queryString}`)
        .then((response)=> console.log(response.status))
        .catch((error) => console.log(error))
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
        setWarningModal(false)
        setIsAlert(false)
        getMenuList()

    },[])
    

    useState(()=>{
        console.log(state)
        if(state !== undefined){
            setUserName(state.name)
        }
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
            {isAlert && <Alert color={alertColor} txt={alertMsg}></Alert>}
            {warningModal && <WarningModal openModal={openWarningModal} deleteMenu={deleteAllMenu}> </WarningModal>}
            {nameModal && <NameModal setUserName={setUserName} userName={userName} openModal={openNameModal}> </NameModal>}
            {menuModal && <MenuModal getAlert={getAlert} menuList={menuList} openModal={openMenuModal}> </MenuModal>}
            <InputName openModal={openNameModal} userName={userName}></InputName>
            <InputPeriod openModal={openPeriodModal} startDate={period.startDate} endDate={period.endDate} ></InputPeriod>
            <div className="menu-info__div">
                <MenuSet openModal={openMenuModal} menuList={menuList}></MenuSet>
                <div className="admin-btn__div">
                    <div className="remove-btn" onClick={() => {getAlert()}} > 데이터 초기화 </div>
                    <div className="modal-btn__div" onClick={() => {postAction()}}>
                        <Button txt="데이터 생성하기" color={isEmpty? "grey" :"black"} shape="rect" fontSize="12px"></Button>
                    </div>
                </div>
            </div>
            
            
        </div>
    );
        
}

export default AdminIndex;