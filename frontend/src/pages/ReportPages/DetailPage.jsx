import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import Header from "../../component/common/Header";
import { useEffect, useState,useRef } from "react";
import {motion} from 'framer-motion'
import TopButton from "../../component/common/TopButton";
import DropDownMenu from "../../component/common/DropDownMenu";
import CalendarContent from "../../component/common/CalendarContent";
import BottomNavbar from "../../component/common/BottomNavbar";
import useSalesData from "../../hooks/useSalesData";
import LoadingScreen from "../../component/common/LoadingScreen";
import { useTranslation } from "react-i18next";
import { formatDate } from "../../functions/DateConverter";
import BestMenuDetail from "../../component/report/BestMenuDetail";
import BiggestDiffDetail from "../../component/report/BiggestDiffDetail";

function DetailPage(props){
    console.log(props)
    const location = useLocation()
    const navigate =useNavigate()
    const {t,i18n} = useTranslation()
    const {
        todayDate,
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
        lastDetailValue,
        validDateList} = useSalesData();
    const {state} = location
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

    const [topVisible,setTopVisible] = useState(false)
    const [leftSide,setLeftSide] = useState(false)
    const [rightSide,setRightSide] = useState(false)

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
            <Header leftSide={openLeftSide} t={t} i18n={i18n} rightSide={openRightSide} page={page} currentDate={currentDate}></Header>
            <motion.div
                    className="side-nav__dropdown"
                    initial={{ x: '-100%', opacity: 0 }}
                    animate={{ x: leftSide ? 0 : '-100%', opacity: leftSide ? 1 : 0 }}
                    exit={{ x: '-100%', opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {leftSide && <DropDownMenu changeLanguage={changeLanguage} sideList={sideList} open={openLeftSide} onclickFunction={handleDropDown} t={t} i18n={i18n}></DropDownMenu>}
            </motion.div>
            <motion.div
                className="side-nav__calendar"
                initial={{ x: '+100%', opacity: 0 }}
                animate={{ x: rightSide ? 0 :'+100%' , opacity: rightSide ? 1 : 0 }}
                exit={{ x: '+100%', opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                 {rightSide && <CalendarContent validDateList={validDateList} detail={pageType}  page={page} currentDate={state.currentDate} open={openRightSide} t={t} i18n={i18n}></CalendarContent>}
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