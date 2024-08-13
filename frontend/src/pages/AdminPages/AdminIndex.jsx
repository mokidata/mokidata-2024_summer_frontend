import { useEffect, useState } from "react";
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
import CalendarScreen from "../../component/contents/CalendarScreen";

function AdminIndex(){
    const [initial,setInitial] = useState(false)
    const [userName,setUserName] = useState("")
    const [nameModal,setNameModal] = useState(false)
    const [periodModal,setPeriodModal] = useState(false)
    const [menuModal,setMenuModal] = useState(false)
    const [warningModal, setWarningModal] = useState(false)
    const [isAlert,setIsAlert] = useState(false)
    const [startDate,setStartDate] = useState(
        ()=>{
            const date = new Date()
            date.setMonth(date.getMonth() -2)
            return formatDate(date)
        }
    )
    const [endDate, setEndDate] = useState(formatDate(new Date()))
    const [menuList,setMenuList] = useState([])
    const [isEmpty,setIsEmpty] = useState(false)
    const [isRandomData, setIsRandomData] = useState(false)  
    const [isLoading, setIsLoading] = useState(false)
    const [alertColor,setAlertColor] = useState("green")
    const [alertMsg,setAlertMsg] = useState("alert")
    const [loadingMsg,setLoadingMsg] = useState("")
    const [reload,setReload] = useState(false)
    const location = useLocation()
    const state = location.state
    const [leftCalendar, setLeftCalendar] = useState(false)
    const [rightCalendar, setRightCalendar] = useState(false)
    const openLeftCalendar = () => {
        if (rightCalendar){
            setRightCalendar(false)
        }
        setLeftCalendar(!leftCalendar)
    }
    const openRightCalendar= () =>{
        if(leftCalendar){
            setLeftCalendar(false)
        }
        setRightCalendar(!rightCalendar)
    }

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
                console.log(data.length)
                if(data.length === 0){
                    setIsEmpty(true)
                    setIsRandomData(false)
                }
                else{
                    setIsEmpty(false)
                    setIsRandomData(true)
                }

            }
        ).catch(
            (error) => {console.log(error)}
        )
        setMenuList(data)
        setIsLoading(false)
    }
    const postRandom = async () =>{
        console.log("post random")
        setLoadingMsg("데이터 생성 중")
        setIsLoading(true) //로딩 페이지 띄우기

        let formData = {"startDate":startDate,"endDate":endDate}
        console.log(startDate)
        console.log(endDate)
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
        // const queryString = tempArr.map(menu => `menu=${encodeURIComponent(menu)}`).join('&');

        // const response = await mokiApi.delete(`/api/menu?${queryString}`)
        const response = await mokiApi.delete(`/api/auth/init`)
        .then((response)=> {
            setUserName("")
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

    useEffect(()=>{
        console.log(state)
        if(state !== undefined){
            setUserName(state.name)
        }
        if(!reload){
            getMenuList()
        }
        const today = new Date()
        const formatToday = formatDate(today)
        console.log("re-render")
        setMenuModal(false)
        setNameModal(false)
        setPeriodModal(false)
        setWarningModal(false)
        setIsAlert(false)
        console.log(isLoading)
        
    }, [])

    useEffect(()=>{
        console.log(`reload ${reload}`)
        if(reload){
            setIsLoading(true)
        }
        else{
            getMenuList()
        }
    },[reload])


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
            {isAlert &&   <Alert color={alertColor} txt={alertMsg}></Alert>}
            </motion.div>
            {warningModal && <WarningModal openModal={openWarningModal} setLoadingMsg={setLoadingMsg} setReload={setReload} deleteMenu={deleteAllData}> </WarningModal>}
            {nameModal && <NameModal setUserName={setUserName} userName={userName} openModal={openNameModal}> </NameModal>}
            {menuModal && <MenuModal getAlert={getAlert} setReload={setReload} menuList={menuList} openModal={openMenuModal}> </MenuModal>}
            <InputName openModal={openNameModal} userName={userName}></InputName>
            <InputPeriod openModal={openPeriodModal} setStartDate={setStartDate} setEndDate={setEndDate} leftCalendar={leftCalendar} rightCalendar={rightCalendar} openLeftCalendar={openLeftCalendar} openRightCalendar={openRightCalendar} startDate={startDate} endDate={endDate}></InputPeriod>
            <div className="menu-info__div">
                <MenuSet openModal={openMenuModal} menuList={menuList}></MenuSet>
                <div className="admin-btn__div">
                    {isRandomData && <div className="remove-btn" onClick={() => {openWarningModal()}} > 데이터 초기화 </div>}
                    <div className="modal-btn__div" onClick={() => {postRandom()}}>
                        <Button txt="데이터 생성하기" color={isEmpty? "grey" :"black"} shape="rect" fontSize="12px"></Button>
                    </div>
                </div>
            </div>
            
            
        </div>
    );
        
}

export default AdminIndex;