import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../component/common/Button";
import Header from "../../component/common/Header";
import { useEffect, useState } from "react";
import GetInteger from "../../component/common/GetInteger";
import Price from "../../component/common/Price";
import { motion } from "framer-motion";
import TopButton from "../../component/common/TopButton";
import DropDownMenu from "../../component/common/DropDownMenu";
import CalendarContent from "../../component/common/CalendarContent";
import useSalesData from "../../hooks/useSalesData";
import BottomNavbar from "../../component/common/BottomNavbar";
import LoadingScreen from "../../component/common/LoadingScreen";

function BiggestDiffDetail (props){
    const location = useLocation()
    const navigate =useNavigate()
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
    // const todayArray = state.todayValue[state.page]
    // const lastArray = state.lastDetailValue[state.page]

    const [todayArray,setTodayArray] = useState([{"daily":[],"weekly":[],"monthly":[]}]) 
    const [lastArray,setLastArray] = useState([{"daily":[],"weekly":[],"monthly":[]}]) 
    useEffect(()=>{
        if(rankDetailValue !== null){
            console.log(rankDetailValue)
            setTodayArray(rankDetailValue[state.page])
        }
    },[rankDetailValue,state])
    useEffect(()=>{
        if(lastDetailValue !== null)
        setLastArray(lastDetailValue[state.page])
    },[lastDetailValue,state])
    
    console.log(state)
    const [diffSaleRank,setDiffSaleRank] = useState([])
    const [diffProfitRank, setDiffProfitRank] = useState([])
    const [diffType,setDiffType] = useState("sale")
    const [topVisible,setTopVisible] = useState(false)
    const [leftSide,setLeftSide] = useState(false)
    const [rightSide,setRightSide] = useState(false)

    const sideList = ['오늘 판매 순위','이번주 판매 순위','이번달 판매 순위','어제와 판매 비교','지난주와 판매 비교','지난달과 판매 비교']
    const urlList = ['bestmenu','bestmenu','bestmenu','biggestdiff','biggestdiff','biggestdiff']
    const pageList =['daily','weekly','monthly']
    const goPage = (index) => {
        navigate(`/${urlList[index]}`,{state:{page:pageList[index%3], currentDate:state.currentDate }})

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

        navigate(`/${state.page}`)
    }
    useEffect(()=>{
        window.scroll(0,0)
    },[state])
    useEffect(()=>{
        console.log(todayArray)
        
        if(Object.keys(todayArray).length !== 0 ){
            
            const diffArray = []
            todayArray.forEach(element => {
                const obj = {}
                const compareElement = lastArray.find((item)=> item.name === element.name)
                if(compareElement !== undefined){
                    obj['name'] = element.name
                    const todayProfit = element.count * element.price
                    const lastProfit =  compareElement.count * compareElement.price
                    obj['lastSales'] = compareElement.count
                    obj['todaySales'] = element.count
                    obj['todayProfit'] = todayProfit
                    obj['lastProfit'] = lastProfit
                    obj['profitDiff'] =  todayProfit - lastProfit
                    obj['percentage'] = Math.round(((todayProfit - lastProfit) / lastProfit)*100*100)/100 
                    diffArray.push(obj)
                }
            });
            diffArray.sort((a,b) => a.profitDiff - b.profitDiff).reverse()
            setDiffProfitRank([...diffArray]);
            //sale 차이 구하기
            diffArray.sort((a,b) => a.profitDiff - b.profitDiff).reverse()
            setDiffSaleRank([...diffArray])
        }
    },[todayArray])
  
    function changeType(type) {
        setDiffType(type);
    }
    

    if(isLoadingState){
        return (
            <LoadingScreen txt={<span>매출 데이터를 <br /> 가져오고 있어요!</span>}></LoadingScreen>
        )
    }

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
                 {rightSide && <CalendarContent info={"biggestdiff"} page={state.page} currentDate={state.currentDate} open={openRightSide}></CalendarContent>}
            </motion.div>
            <motion.div 
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{ duration: 0.5 }}
            className="report-component" id="best-rank">
                <div className="best-rank__goback" onClick={() => goBack()}>
                    &lt; {
                    state.page === 'daily'? '어제와':
                    state.page === 'weekly'? '지난 주와':
                    state.page === 'monthly' ? '지난 달과':
                    '어제와'

                } 판매 비교
                </div>
                <div className="best-rank__notice">
                    <div className="notice">
                        판매 기록이 없었던 제품은 제외됩니다.
                    </div>
                    
                </div>
                <div className="best-rank__button">
                    <div className="best-rank__each-button" onClick={(event) => changeType("sale")}>
                        <Button color={diffType==="sale" ? "black":"white"} txt="판매갯수"></Button>
                    </div>
                    <div className="best-rank__each-button" onClick={(event) => changeType("profit")}>
                        <Button color={diffType==="sale" ? "white":"black"} txt="판매수익"></Button>
                    </div>
                
                    
                    
                </div>
                <div className="best-rank__table">
                    <div className="best-rank__column-info">
                        <div className="best-rank__column" id="rank__rank">
                            순위
                        </div>
                        <div className="best-rank__column" id="rank__menu-info">
                            메뉴명
                        </div>
                        <div className="best-rank__column" id="rank__last-profit">
                            지난주
                        </div>
                        <div className="best-rank__column" id="rank__profit">
                            이번주
                        </div>
                    </div>
                    {
                        diffType ==='sale' ? 
                        diffSaleRank.map((element,index)=>(
                            <div className="best-rank__each" id={(index+1) %2 === 0 ? "even":"odd"}>
                                <div className="best-rank__row" id="rank__rank">
                                    {index+1}
                                </div>
                                <div className="best-rank__row" id="rank__menu-info">
                                    <div className="best-rank__row__menu">
                                        {element.name}
                                    </div>
                                    <div className="best-rank__row__sales" 
                                        style={{color:element.percentage >= 0 ? "red" :
                                                "blue"
                                        }}>
                                        {element.percentage > 0 ? "+" : ""}{element.percentage}%
                                    </div>
        
                                </div>
                                <div className="best-rank__row" id="rank__last-profit">
                                    {element.lastSales}개:
  
                                </div>
                                <div className="best-rank__row" id="rank__profit">
                                    {element.todaySales}개               
                                </div>
        
                            </div>


                        ))
                        :
                        diffProfitRank.map((element,index)=>(
                            <div className="best-rank__each" id={(index+1) %2 === 0 ? "even":"odd"}>
                                <div className="best-rank__row" id="rank__rank">
                                    {index+1}
                                </div>
                                <div className="best-rank__row" id="rank__menu-info">
                                    <div className="best-rank__row__menu">
                                        {element.name}
                                    </div>
                                    <div className="best-rank__row__sales" 
                                        style={{color:element.profitDiff >= 0 ? "red" :
                                                "blue"
                                        }}>
                                        {element.profitDiff > 0 ? "+" : ""}
                                        <Price value = {element.profitDiff} unit=""></Price>
                                        
                                    </div>
                                </div>
                                <div className="best-rank__row" id="rank__last-profit">
                                    <Price value = {element.lastProfit} unit="원"></Price>
                                </div>
                                <div className="best-rank__row" id="rank__profit">
                                    <Price value = {element.todayProfit} unit="원"></Price>        
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
            <BottomNavbar page={state.page} info="biggestdiff" currentDate={state.currentDate}></BottomNavbar>
            
        </div>
    )
}

export default BiggestDiffDetail;