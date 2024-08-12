import { useLocation, useNavigate, useNavigation } from "react-router-dom";
import Header from "../../component/common/Header";
import Price from "../../component/common/Price";
import Triangle from "../../component/common/Triangle";
import { useEffect, useState } from "react";
import {motion} from 'framer-motion'
import TopButton from "../../component/common/TopButton";
import DropDownMenu from "../../component/common/DropDownMenu";
import CalendarContent from "../../component/common/CalendarContent";
import BottomNavbar from "../../component/common/BottomNavbar";
import useSalesData from "../../hooks/useSalesData";

function BestMenuDetail(props){
    const location = useLocation()
    const navigate = useNavigate()
    const {
        currentDate,
        isLoadingState,
        todayValue,
        predictTodayValue,
        predictDetailValue,
        predictLastValue,
        rankDetailValue,
        rankCompareValue,
        menuObject,
        lastDetailValue} = useSalesData();
    const {state} = location
    // const [pageInfo,setPageInfo] = useState("daily")
    const rankArray = state.rankDetail[state.page]
    // const [rankArray,setRankArray] = useState([{"name":"","count":0,"price":0}])   
    const [lastRank,setLastRank] = useState({})
    const [topVisible,setTopVisible] = useState(false)
    const [leftSide,setLeftSide] = useState(false)
    const [rightSide,setRightSide] = useState(false)
    // const asyncSetPage = async (page) => {
    //     setPageInfo(page)
    // }
    // const asyncSetRank = async (page) => {
    //     setRankArray(rankDetailValue[page])
    // }
    
    // const setRankInfo = async (page) => {
    //     await asyncSetPage(page)
    //     console.log(pageInfo)
    //     await asyncSetRank(pageInfo)
    //     console.log(rankArray)
    // }
    
    
    // useEffect(()=>{
    //     console.log(rankDetailValue)
    //     console.log(state)
    //     // setRankInfo(state.page)
    // },[rankDetailValue,state])
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
        setLeftSide(false)
        setRightSide(false)
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const goBack = () => {

        navigate(-1)
    }
    const goPage = () => {

    }
    useEffect(()=>{
        window.scroll(0,0)
    },[state])
    useEffect(()=>{
        const obj = {}
        if(state.lastDetail[state.page].length !== 0)
        {
            state.lastDetail[state.page].forEach((element,index) => {
                obj[element.name] = index+1
            });
            setLastRank(obj);
        }
       
        
    },[state])
    useEffect(()=>{
        console.log(rankArray)
    },[rankArray])
    useEffect(()=>{
        console.log(lastRank)
    },[lastRank])

    const sideList = ['오늘 판매 순위','이번주 판매 순위','이번달 판매 순위','어제와 판매 비교','지난주와 판매 비교','지난달과 판매 비교']

    return(
        <div className="report-page">
            <Header leftSide={setLeftSide} rightSide={setRightSide} page={state.page} currentDate={state.currentDate}></Header>
            <motion.div
                    className="side-nav__dropdown"
                    initial={{ x: '-100%', opacity: 0 }}
                    animate={{ x: leftSide ? 0 : '-100%', opacity: leftSide ? 1 : 0 }}
                    exit={{ x: '-100%', opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {leftSide && <DropDownMenu sideList={sideList} open={openLeftSide} onclickFunction={goPage}></DropDownMenu>}
            </motion.div>
            <motion.div
                className="side-nav__calendar"
                initial={{ x: '+100%', opacity: 0 }}
                animate={{ x: rightSide ? 0 :'+100%' , opacity: rightSide ? 1 : 0 }}
                exit={{ x: '+100%', opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                 {rightSide && <CalendarContent page={state.page} currentDate={state.currentDate} open={openRightSide}></CalendarContent>}
            </motion.div>
               
            <motion.div 
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{ duration: 0.5 }}
            className="report-component" 
            id="best-rank">
                <div className="best-rank__goback" onClick={goBack}>
                    &lt; {
                    state.page === 'daily'? '오늘':
                    state.page === 'weekly'? '이번 주':
                    state.page === 'monthly' ? '이번 달':
                    '오늘'
                    } 판매 순위

                </div>
                <div className="best-rank__table">
                    <div className="best-rank__column-info">
                        <div className="best-rank__column" id="rank__rank">
                            순위
                        </div>
                        <div className="best-rank__column" id="rank__diff">
                            변동
                        </div>
                        <div className="best-rank__column" id="rank__menu-info">
                            메뉴명<br></br>판매갯수
                        </div>
                        <div className="best-rank__column" id="rank__profit">
                            판매금액
                        </div>

                    </div>
                    {
                        rankArray.map((element,index) => (
                            <div className="best-rank__each" id={(index+1) %2 === 0 ? "even":"odd"}>
                                <div className="best-rank__row" id="rank__rank">
                                    {index+1}
                                </div>
                                <div className="best-rank__row" id="rank__diff">
                                    <Triangle diff={lastRank[element.name] - (index+1)  } unit=""></Triangle>
                                </div>
                                <div className="best-rank__row" id="rank__menu-info">
                                    <div className="best-rank__row__menu">
                                        {element.name}
                                    </div>
                                    <div className="best-rank__row__sales">
                                        {element.count}
                                    </div>

                                </div>
                                <div className="best-rank__row" id="rank__profit">
                                    <Price value={element.count * element.price} unit="원"></Price>
                                </div>

                            </div>

                        ))
                    }
                    

                </div>

            </motion.div>
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
            <BottomNavbar page={state.page} currentDate={state.currentDate}></BottomNavbar>
            

        </div>

    );


}

export default BestMenuDetail;