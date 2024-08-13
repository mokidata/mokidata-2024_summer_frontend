import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import Header from "../../component/common/Header";
import Price from "../../component/common/Price";
import Triangle from "../../component/common/Triangle";
import { useEffect, useState,useRef } from "react";
import {motion} from 'framer-motion'
import TopButton from "../../component/common/TopButton";
import DropDownMenu from "../../component/common/DropDownMenu";
import CalendarContent from "../../component/common/CalendarContent";
import BottomNavbar from "../../component/common/BottomNavbar";
import useSalesData from "../../hooks/useSalesData";
import LoadingScreen from "../../component/common/LoadingScreen";
import { useTranslation } from "react-i18next";
import { formatDate } from "../../component/common/DateConverter";
import BestMenuDetail from "../../component/contents/BestMenuDetail";
import BiggestDiffDetail from "../../component/contents/BiggestDiffDetail";

function DetailPage(props){
    const location = useLocation()
    const navigate =useNavigate()
    const {t,i18n} = useTranslation()
    const {
        currentDate,
        isLoadingState,
        todayValue,
        predictTodayValue,
        predictDetailValue,
        predictLastValue,
        predictNextValue,
        rankDetailValue,
        rankCompareValue,
        menuObject,
        lastDetailValue} = useSalesData();
    const {state} = location
    // const todayArray = state.todayValue[page]
    // const lastArray = state.lastDetailValue[page]
    const [page,setPage] = useState("")
    const [pageType,setPageType] = useState("")
    const changeLanguage = (type) => {
        if (i18n.language === 'en' && type ==='ko'){
            i18n.changeLanguage('ko')
        }
        else if(i18n.language === 'ko' && type ==='en'){
            i18n.changeLanguage('en')
        }
        setLeftSide(false)
    }
    
    console.log(state)
    const [diffSaleRank,setDiffSaleRank] = useState([])
    const [diffProfitRank, setDiffProfitRank] = useState([])
    const [diffType,setDiffType] = useState("sale")
    const [topVisible,setTopVisible] = useState(false)
    const [leftSide,setLeftSide] = useState(false)
    const [rightSide,setRightSide] = useState(false)
    const [validDateList,setVaildDateList] = useState([])

    const sideList = [
        t('biggestDiff.daily') + t('bestMenuDetail.back'),
        t('biggestDiff.weekly') + t('bestMenuDetail.back'),
        t('biggestDiff.monthly') + t('bestMenuDetail.back'),
        t('biggestDiff.diffTitle.daily'),
        t('biggestDiff.diffTitle.weekly'),
        t('biggestDiff.diffTitle.monthly')
    ];
    const pageTypeList = ['bestMenu','bestMenu','bestMenu','biggestDiff','biggestDiff','biggestDiff']
    const pageList =['daily','weekly','monthly']
    const handleDropDown = (index) => {
        setPageType(pageTypeList[index])
        setPage(pageList[index%3])
    }

    const handleBottomNav = (page) => {
        setPage(page)
    }

    
    const openLeftSide = ()=>{
        if(rightSide){
            setRightSide(false)
        }
        setLeftSide(!leftSide)
    }
    const openRightSide = ()=>{
        if(leftSide){
            setLeftSide(false)
        }
        setRightSide(!rightSide)
    }
    const handleScroll = () => {
        if (window.scrollY > 500) {
            setTopVisible(true);
        } else {
            setTopVisible(false);
        }
    };
    const todayDate = formatDate(new Date())
    function changeType(type) {
        setDiffType(type);
    }
    useEffect(()=>{
        let list = []
        if(rankCompareValue !== null && todayDate === currentDate){
            list.push(todayDate)
            for(let date of Object.keys(rankCompareValue['monthly']) ){
                if (rankCompareValue['monthly'][date].length !== 0){
                    list.push(date)
                }
            }
            setVaildDateList(list)
        }
    },[rankCompareValue, currentDate])
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const goBack = () => {

        navigate(`/${page}`)
    }
    useEffect(()=>{
        window.scroll(0,0)
        if(state !== undefined){
            setPageType(state.pageType)
            setPage(state.page)
        }
    },[state])

    if(isLoadingState){
        return (
            <LoadingScreen txt={<span>매출 데이터를 <br /> 가져오고 있어요!</span>}></LoadingScreen>
        )
    }
    return(
        <div className="report-page">
            <Header leftSide={setLeftSide} t={t} i18n={i18n}rightSide={setRightSide} page={page} currentDate={currentDate}></Header>
            <motion.div
                    className="side-nav__dropdown"
                    initial={{ x: '-100%', opacity: 0 }}
                    animate={{ x: leftSide ? 0 : '-100%', opacity: leftSide ? 1 : 0 }}
                    exit={{ x: '-100%', opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {leftSide && <DropDownMenu changeLanguage={changeLanguage} sideList={sideList} open={openLeftSide} onclickFunction={handleDropDown}></DropDownMenu>}
            </motion.div>
            <motion.div
                className="side-nav__calendar"
                initial={{ x: '+100%', opacity: 0 }}
                animate={{ x: rightSide ? 0 :'+100%' , opacity: rightSide ? 1 : 0 }}
                exit={{ x: '+100%', opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                 {rightSide && <CalendarContent validDateList={validDateList} detail={pageType}  page={page} currentDate={state.currentDate} open={openRightSide}></CalendarContent>}
            </motion.div>
            {
                pageType === "bestMenu" ?
                <BestMenuDetail 
                rankDetailValue={rankDetailValue} 
                lastDetailValue={lastDetailValue} 
                page={page}
                goBack={goBack}
                t={t}
                i18n={i18n}
                
                ></BestMenuDetail>
                :
                <BiggestDiffDetail 
                rankDetailValue={rankDetailValue} 
                lastDetailValue={lastDetailValue} 
                page={page}
                goBack={goBack}
                t={t}
                i18n={i18n}
                ></BiggestDiffDetail>

            }
            <motion.div className="top-button__div"
                    initial={{opacity:0}}
                    animate={{opacity: 
                        topVisible?
                        1:0
                    }}
                    transition={{duration:0.3}}
                    
                >
                    <TopButton></TopButton>

            </motion.div>
            <BottomNavbar changeDetail={handleBottomNav} page={page} pageType={pageType} info="biggestdiff" currentDate={state.currentDate} t={t} i18n={i18n}></BottomNavbar>


        </div>
    )
    


  
    


}

export default DetailPage;