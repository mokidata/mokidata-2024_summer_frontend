import { useEffect, useRef, useState } from "react";
import BottomNavbar from "../../component/common/BottomNavbar";
import Header from "../../component/common/Header";
import BestMenu from "../../component/contents/BestMenu";
import BiggestDiffMenu from "../../component/contents/BiggestDiffMenu";
import CompPredictSales from "../../component/contents/CompPredictSales";
import PredictSales from "../../component/contents/PredictSales";
import TodaySales from "../../component/contents/TodaySales";
import usePageInfo from "../../hooks/usePageInfo";
import useSalesData from "../../hooks/useSalesData";
import {motion} from "framer-motion"
import DropDownMenu from "../../component/common/DropDownMenu";
import { formatDate, formatMonth } from "../../component/common/DateConverter";
import { useLocation } from "react-router-dom";
import CalendarContent from "../../component/common/CalendarContent";
import { useDispatch } from "react-redux";
import { totalThunks } from "../../services/salesApiSlice";
import TopButton from "../../component/common/TopButton";
import LoadingScreen from "../../component/common/LoadingScreen";
import { current } from "@reduxjs/toolkit";
import { useTranslation } from "react-i18next";

function ReportPage(props){
    
    console.log("!!!report page!!!")
    const {t,i18n} = useTranslation();  
    const sideList = Object.values(t('sideList',{returnObjects:true}))
    console.log(sideList)
    
    const [page] = usePageInfo(props.page)
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
    const [componentFade ,setComponentFade] = useState([true,false,false,false,false])
    const [leftSide,setLeftSide] = useState(false)
    const [rightSide,setRightSide] = useState(false)
    const todayDate = formatDate(new Date())
    const [topVisible,setTopVisible] = useState(false)
    const [validDateList,setVaildDateList] = useState([])
    const changeLanguage = (type) => {
        if (i18n.language === 'en' && type ==='ko'){
            i18n.changeLanguage('ko')
        }
        else if(i18n.language === 'ko' && type ==='en'){
            i18n.changeLanguage('en')
        }
        setLeftSide(false)

        
        
    }
    const handleScrollTop = () => {
        if (window.scrollY > 500) {
            setTopVisible(true);
        } else {
            setTopVisible(false);
        }
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScrollTop);
        return () => {
            window.removeEventListener('scroll', handleScrollTop);
        };
    }, []);

    //유효한 데이터 범위 파악
    useEffect(()=>{
        let list = []
        if(rankCompareValue !== null && todayDate === currentDate){
            list.push(todayDate)
            for(let date of Object.keys(rankCompareValue['monthly']) ){
                if (rankCompareValue['monthly'][date].length !== 0){
                    let lastday = new Date(date)
                    lastday.setMonth(lastday.getMonth() + 1)
                    lastday.setDate(0)
                    console.log(formatDate(lastday))
                    list.push(formatDate(lastday))
                }
            }
            setVaildDateList(list)
        }
    },[rankCompareValue, currentDate])

    const handleScroll = () => {
        const items = document.querySelectorAll('.report-item');
        items.forEach((item, index) => {
            const rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight/2 && !componentFade[index]) {
                setComponentFade(prev => {
                    const newVisibleItems = [...prev];
                    newVisibleItems[index] = true;
                    return newVisibleItems;
                });
            }
        });
    };
    const scrollToContent=(index)=>{
        console.log('scroll')
        const items = document.querySelectorAll('.report-item');
        if (index >= 0 && index < items.length) { // 유효한 인덱스인지 확인
            setLeftSide(false)
            const elementPosition=items[index].getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - 66;
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

        } else {
            console.error('유효하지 않은 인덱스입니다.'); // 유효하지 않은 인덱스일 경우 에러 메시지 출력
        }
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

    useEffect(()=>{
        window.scrollTo(0,0)
        setComponentFade([true,false,false,false,false])
        
    },[props.page])

    useEffect(()=>{
        window.scrollTo(0,0)
        setComponentFade([true,false,false,false,false])

    },[])
    //페이지 옮길 때 스크롤 맨 위로 올림
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [componentFade]);


    
    if(isLoadingState){
        return (
            <LoadingScreen txt={<span>매출 데이터를 <br /> 가져오고 있어요!</span>}></LoadingScreen>
        )
    }
    else{
        console.log({isLoadingState,todayValue,predictTodayValue,predictDetailValue,predictLastValue,rankDetailValue,lastDetailValue,rankCompareValue,menuObject})
         return(
            <div className="report-page">
                <Header leftSide={openLeftSide} rightSide={openRightSide} currentDate={currentDate} page={page} t={t} i18n={i18n}></Header>
                <motion.div
                    className="side-nav__dropdown"
                    initial={{ x: '-100%', opacity: 0 }}
                    animate={{ x: leftSide ? 0 : '-100%', opacity: leftSide ? 1 : 0 }}
                    exit={{ x: '-100%', opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <DropDownMenu sideList={sideList} changeLanguage={changeLanguage} open={openLeftSide} onclickFunction={scrollToContent} t={t} i18n={i18n}></DropDownMenu>
                </motion.div>
                <motion.div
                    className="side-nav__calendar"
                    initial={{ x: '+100%', opacity: 0 }}
                    animate={{ x: rightSide ? 0 :'+100%' , opacity: rightSide ? 1 : 0 }}
                    exit={{ x: '+100%', opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <CalendarContent page={page} validDateList={validDateList} currentDate={todayDate} open={openRightSide} t={t} i18n={i18n}></CalendarContent>
                </motion.div>
                
                <motion.div
                    className="report-item"
                    initial={{opacity:0}}
                    whileInView={{opacity:1}}
                    viewport={{once:true}}
                    animate={{ opacity: componentFade[0] ? 1 : 0 }}
                    transition={{ duration: 0.7 }}
                    
                >
                    <TodaySales page={page} value={todayValue} t={t} i18n={i18n}></TodaySales> 
                </motion.div>
                <motion.div
                    className="report-item"
                    initial={{opacity:0}}
                    whileInView={{opacity: componentFade[1] ? 1 : 0 }}
                    viewport={{once:true}}
                    animate={{ opacity: componentFade[1] ? 1 : 0 }}
                    transition={{ duration: componentFade[1] ?  0.7 : 0 }}
                    
                >
                    <CompPredictSales page={page} isVisible={componentFade[1]} value={predictLastValue} todayValue={todayValue} menuObject={menuObject} t={t} i18n={i18n}></CompPredictSales>
                </motion.div>
                <motion.div
                    className="report-item"
                    initial={{opacity:0}}
                    whileInView={{opacity: componentFade[2] ? 1 : 0 }}
                    viewport={{once:true}}
                    animate={{ opacity: componentFade[2] ? 1 : 0 }}
                    transition={{ duration: 0.7 }}
                    
                >
                    <PredictSales currentDate={currentDate} predictNextValue={predictNextValue} page={page} isVisible={componentFade[2]} value={predictDetailValue} menuObject={menuObject} rankCompareValue={rankCompareValue} t={t} i18n={i18n}></PredictSales>
                </motion.div>
                <motion.div
                    className="report-item"
                    initial={{opacity:0}}
                    whileInView={{opacity: componentFade[3] ? 1 : 0 }}
                    viewport={{once:true}}
                    animate={{ opacity: componentFade[3] ? 1 : 0 }}
                    transition={{ duration: 0.7 }}
                    
                >
                    <BestMenu page={page} currentDate={currentDate} validDateList={validDateList} rankDetailValue={rankDetailValue} menuObject={menuObject} lastDetailValue={lastDetailValue} t={t} i18n={i18n}></BestMenu>
                </motion.div>
                <motion.div
                    className="report-item"
                    initial={{opacity:0}}
                    whileInView={{opacity: componentFade[4] ? 1 : 0 }}
                    viewport={{once:true}}
                    animate={{ opacity: componentFade[4] ? 1 : 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <BiggestDiffMenu page={page} currentDate={currentDate} validDateList={validDateList} todayValue={rankDetailValue} lastDetailValue={lastDetailValue} menuObject={menuObject}  t={t} i18n={i18n}></BiggestDiffMenu>
                </motion.div>
                <motion.div className="top-button__div"
                    initial={{opacity:0}}
                    animate={{opacity: 
                        topVisible?1:0
                    }}
                    transition={{duration:0.3}}
                    
                >
                    <TopButton></TopButton>

                </motion.div>
                
                
                
                
                <BottomNavbar page={page} pageType="reportIndex" currentDate={currentDate}  t={t} i18n={i18n}></BottomNavbar>
            </div>
            
        );
    }

   

}

export default ReportPage;

