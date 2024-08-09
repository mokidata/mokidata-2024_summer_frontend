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
import LoadingScreen from "../../component/common/LoadingScreen";
import {motion} from "framer-motion"
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
    const [loadingMsg,setLoadingMsg] = useState("")
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
        setLoadingMsg("메뉴 정보를 가져오는 중입니다.")
        setIsLoading(true)
        let data = []
        //토큰 가져다 쓰기
        const token = sessionStorage.getItem('accessToken');
        if (token) {
            mokiApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
        const response = await mokiApi.get("/api/menu/list").then(
            (response) => {
                data = response.data
                console.log(response.status)
            }
        ).catch(
            (error) => {console.log(error)}
        )
        setMenuList(data)
        setIsLoading(false)
    }
    const postRandom = async () =>{
        setIsLoading(true) //로딩 페이지 띄우기
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

    const deleteAllData = async () => {
        setIsLoading(true)
        const tempArr = []
        for (let menu of menuList){
            tempArr.push(menu.name)
        }
        console.log(tempArr)
        const queryString = tempArr.map(menu => `menu=${encodeURIComponent(menu)}`).join('&');

        const response = await mokiApi.delete(`/api/menu?${queryString}`)
        .then((response)=> {
            console.log(response.status)
        })
        .catch((error) => {
            console.log(error)
            getAlert("red",' 메뉴 초기화 실패')
            setIsLoading(false)
        })
        const userNamePatch = await mokiApi.patch(`api/auth`,{"name":""})
        .then((response) => {
            console.log(response.status)
            setUserName("")
        })
        .catch((error) => {
            console.log(error)
            getAlert("red",' 매장명 초기화 실패')
            setIsLoading(false)
        })
        getAlert("green","초기화 완료")
    }

    useState(()=>{
        console.log("re-render")
        setMenuModal(false)
        setNameModal(false)
        setPeriodModal(false)
        setWarningModal(false)
        setIsAlert(false)
        if(menuList.length !== 0){
            setIsEmpty(true)
        }
        else{
            setIsEmpty(false)
        }
    }, [])
    useState(()=>{
        //로딩상태에 들어가면 데이터 새로 불러들여옴
        if(isLoading){
            console.log("GET")
            getMenuList()
        }
    },[isLoading])
    

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
            <LoadingScreen txt={loadingMsg}></LoadingScreen>
        )
    }
    return(
        <div className="admin-page" >
            <motion.div className="alert__div"
            initial={{opacity:0}}
            animate={{opacity: isAlert?1:0}}
            transition={{duration:0.5}}
            >
                <Alert isAlert={isAlert} color={alertColor} txt={alertMsg}></Alert>
            </motion.div>
            {warningModal && <WarningModal openModal={openWarningModal} deleteMenu={deleteAllData}> </WarningModal>}
            {nameModal && <NameModal setUserName={setUserName} userName={userName} openModal={openNameModal}> </NameModal>}
            {menuModal && <MenuModal getAlert={getAlert} setIsLoading={setIsLoading} menuList={menuList} openModal={openMenuModal}> </MenuModal>}
            <InputName openModal={openNameModal} userName={userName}></InputName>
            <InputPeriod openModal={openPeriodModal} startDate={period.startDate} endDate={period.endDate} ></InputPeriod>
            <div className="menu-info__div">
                <MenuSet openModal={openMenuModal} menuList={menuList}></MenuSet>
                <div className="admin-btn__div">
                    <div className="remove-btn" onClick={() => {openWarningModal()}} > 데이터 초기화 </div>
                    <div className="modal-btn__div" onClick={() => {postRandom()}}>
                        <Button txt="데이터 생성하기" color={isEmpty? "grey" :"black"} shape="rect" fontSize="12px"></Button>
                    </div>
                </div>
            </div>
            
            
        </div>
    );
        
}

export default AdminIndex;