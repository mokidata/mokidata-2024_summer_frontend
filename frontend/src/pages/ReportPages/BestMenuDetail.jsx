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
import LoadingScreen from "../../component/common/LoadingScreen";
import { useTranslation } from "react-i18next";
import { formatDate } from "../../component/common/DateConverter";

function BestMenuDetail(props){
    const location = useLocation()
    const navigate = useNavigate()
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
    console.log(state)
    // const [pageInfo,setPageInfo] = useState("daily")
    // const rankArray = state.rankDetail[state.page]
    const [rankArray,setRankArray] = useState([{"name":"","count":0,"price":0}])   
    const [lastRank,setLastRank] = useState({"daily":[],"weekly":[],"monthly":[]})
    const [topVisible,setTopVisible] = useState(false)
    const [leftSide,setLeftSide] = useState(false)
    const [rightSide,setRightSide] = useState(false)
    const [validDateList,setVaildDateList] = useState([])
    const todayDate = formatDate(new Date())
    useEffect(()=>{
        console.log(rankCompareValue)
        console.log(currentDate)
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

    const changeLanguage = (type) => {
        if (i18n.language === 'en' && type ==='ko'){
            i18n.changeLanguage('ko')
        }
        else if(i18n.language === 'ko' && type ==='en'){
            i18n.changeLanguage('en')
        }
        setLeftSide(false)

        
        
    }
    
    useEffect(()=>{
        if(rankDetailValue !== null){
            console.log(rankDetailValue[state.page])
            const copy = [...rankDetailValue[state.page]]
            copy.sort((a, b) => (b.price * b.count) - (a.price * a.count));
            setRankArray(copy)
        }
        
        // setRankInfo(state.page)
    },[rankDetailValue,state])
    
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
        setLastRank({"daily":[],"weekly":[],"monthly":[]})
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const sideList = [
        t('bestMenuDetail.daily') + t('bestMenuDetail.back'),
        t('bestMenuDetail.weekly') + t('bestMenuDetail.back'),
        t('bestMenuDetail.monthly') + t('bestMenuDetail.back'),
        '어제와 판매 비교',
        '지난주와 판매 비교',
        '지난달과 판매 비교'
    ];
    
    const urlList = ['bestmenu', 'bestmenu', 'bestmenu', 'biggestdiff', 'biggestdiff', 'biggestdiff'];
    const pageList = ['daily', 'weekly', 'monthly'];

    const goBack = () => {
        navigate(`/${state.page}`);
    };

    const goPage = (index) => {
        navigate(`/${urlList[index]}`, { state: { page: pageList[index % 3], currentDate: state.currentDate } });
    };

    useEffect(() => {
        window.scroll(0, 0);
    }, [state]);

    useEffect(() => {
        const obj = {};
        if (lastDetailValue !== null) {
            lastDetailValue[state.page].forEach((element, index) => {
                obj[element.name] = index + 1;
            });
            setLastRank(obj);
        }
    }, [state, lastDetailValue]);

    if (isLoadingState) {
        return (
            <LoadingScreen txt={<span dangerouslySetInnerHTML={{ __html: t('bestMenuDetail.loading') }} />} />
        );
    }

    return (
        <div className="report-page">
            <Header leftSide={setLeftSide} rightSide={setRightSide} page={state.page} currentDate={state.currentDate} />
            <motion.div
                className="side-nav__dropdown"
                initial={{ x: '-100%', opacity: 0 }}
                animate={{ x: leftSide ? 0 : '-100%', opacity: leftSide ? 1 : 0 }}
                exit={{ x: '-100%', opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                {leftSide && <DropDownMenu changeLanguage={changeLanguage} sideList={sideList} open={openLeftSide} onclickFunction={goPage} />}
            </motion.div>
            <motion.div
                className="side-nav__calendar"
                initial={{ x: '+100%', opacity: 0 }}
                animate={{ x: rightSide ? 0 : '+100%', opacity: rightSide ? 1 : 0 }}
                exit={{ x: '+100%', opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                {rightSide && <CalendarContent info={"bestmenu"} validDateList={validDateList} page={state.page} currentDate={state.currentDate} open={openRightSide} />}
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="report-component"
                id="best-rank"
            >
                <div className="best-rank__goback" onClick={goBack}>
                    &lt; {t(`bestMenuDetail.${state.page}`)} {t('bestMenuDetail.back')}
                </div>
                <div className="best-rank__table">
                    <div className="best-rank__column-info">
                        <div className="best-rank__column" id="rank__rank">
                            {t('bestMenuDetail.rank')}
                        </div>
                        <div className="best-rank__column" id="rank__diff">
                            {t('bestMenuDetail.diff')}
                        </div>
                        <div className="best-rank__column" id="rank__menu-info">
                            {t('bestMenuDetail.menuInfo')}
                        </div>
                        <div className="best-rank__column" id="rank__profit">
                            {t('bestMenuDetail.profit')}
                        </div>
                    </div>
                    {
                        rankArray.map((element, index) => (
                            <div className="best-rank__each" key={index} id={(index + 1) % 2 === 0 ? "even" : "odd"}>
                                <div className="best-rank__row" id="rank__rank">
                                    {index + 1}
                                </div>
                                <div className="best-rank__row" id="rank__diff">
                                    <Triangle diff={lastRank[element.name] - (index + 1)} unit="" />
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
                                    <Price value={element.count * element.price} unit="원" />
                                </div>
                            </div>
                        ))
                    }
                </div>
            </motion.div>
            <motion.div className="top-button__div"
                initial={{ opacity: 0 }}
                animate={{ opacity: topVisible ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            >
                <TopButton />
            </motion.div>
            <BottomNavbar page={state.page} info="bestmenu" currentDate={state.currentDate}  t={t} i18n={i18n} />
        </div>
    );


}

export default BestMenuDetail;