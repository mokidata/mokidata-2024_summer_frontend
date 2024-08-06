import { useEffect, useState } from "react";
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


function ReportPage(props){
    
    console.log("!!!report page!!!")
    const [page] = usePageInfo(props.page)
    const [pageOpen, setPageOpen] = useState(false)
    const {isLoadingState,todayValue,predictTodayValue,predictDetailValue, predictLastValue,rankDetailValue,rankCompareValue,menuObject,lastDetailValue} = useSalesData();
    const [componentFade ,setComponentFade] = useState([true,false,false,false,false])
    const [leftSide,setLeftSide] = useState(false)
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
    const openLeftHeader = ()=>{
        setLeftSide(!leftSide)
    }
    useEffect(()=>{
        window.scrollTo(0,0)
        
        setComponentFade([true,false,false,false,false])
        
    },[props.page])
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [componentFade]);

    //페이지 옮길 때 스크롤 맨 위로 올림

    if(isLoadingState){
        return (
            <div>
                loading...
            </div>
        )
    }
    else{
        console.log({isLoadingState,todayValue,predictTodayValue,predictDetailValue,predictLastValue,rankDetailValue,lastDetailValue,rankCompareValue,menuObject})
         return(
            <div className="report-page">
                <Header leftSide={openLeftHeader} page={page}></Header>
                <motion.div
                    initial={{ x: '-100%', opacity: 0 }}
                    animate={{ x: leftSide ? 0 : '-100%', opacity: leftSide ? 1 : 0 }}
                    exit={{ x: '-100%', opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <DropDownMenu></DropDownMenu>
                </motion.div>
                
                <motion.div
                    className="report-item"
                    initial={{opacity:0}}
                    whileInView={{opacity:1}}
                    viewport={{once:true}}
                    animate={{ opacity: componentFade[0] ? 1 : 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <TodaySales page={page} value={todayValue}></TodaySales> 
                </motion.div>
                <motion.div
                    className="report-item"
                    initial={{opacity:0}}
                    whileInView={{opacity: componentFade[1] ? 1 : 0 }}
                    viewport={{once:true}}
                    animate={{ opacity: componentFade[1] ? 1 : 0 }}
                    transition={{ duration: componentFade[1] ?  0.7 : 0 }}
                >
                    <CompPredictSales page={page} isVisible={componentFade[1]} value={predictLastValue} todayValue={todayValue} menuObject={menuObject}></CompPredictSales>
                </motion.div>
                <motion.div
                    className="report-item"
                    initial={{opacity:0}}
                    whileInView={{opacity: componentFade[2] ? 1 : 0 }}
                    viewport={{once:true}}
                    animate={{ opacity: componentFade[2] ? 1 : 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <PredictSales page={page} isVisible={componentFade[2]} value={predictDetailValue} menuObject={menuObject} rankCompareValue={rankCompareValue}></PredictSales>
                </motion.div>
                <motion.div
                    className="report-item"
                    initial={{opacity:0}}
                    whileInView={{opacity: componentFade[3] ? 1 : 0 }}
                    viewport={{once:true}}
                    animate={{ opacity: componentFade[3] ? 1 : 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <BestMenu page={page} rankDetailValue={rankDetailValue} menuObject={menuObject} lastDetailValue={lastDetailValue}></BestMenu>
                </motion.div>
                <motion.div
                    className="report-item"
                    initial={{opacity:0}}
                    whileInView={{opacity: componentFade[4] ? 1 : 0 }}
                    viewport={{once:true}}
                    animate={{ opacity: componentFade[4] ? 1 : 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <BiggestDiffMenu page={page} todayValue={rankDetailValue} lastDetailValue={lastDetailValue} menuObject={menuObject}></BiggestDiffMenu>
                </motion.div>
                <BottomNavbar></BottomNavbar>
            </div>
            
        );
    }

   

}

export default ReportPage;

