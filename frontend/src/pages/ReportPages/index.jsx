import { useCallback, useEffect, useState } from "react";
import BottomNavbar from "../../component/common/BottomNavbar";
import Header from "../../component/common/Header";
import BestMenu from "../../component/contents/BestMenu";
import BiggestDiffMenu from "../../component/contents/BiggestDiffMenu";
import CompPredictSales from "../../component/contents/CompPredictSales";
import PredictSales from "../../component/contents/PredictSales";
import TodaySales from "../../component/contents/TodaySales";
import usePageInfo from "../../hooks/usePageInfo";
import useSalesData from "../../hooks/useSalesData";
import { useSelector } from "react-redux";

function ReportPage(props){
    console.log("!!!report page!!!")
    const [page] = usePageInfo(props.page)
    const {isLoading,todayValue,predictTodayValue,predictDetailValue,rankDetailValue,rankCompareValue,menuList} = useSalesData();
    const [menuObject,setMenuObject] = useState({})
    useEffect(()=> {
        let obj = {}
        menuList.forEach((element) => {
            obj[element.name] = {price : element.price,img:element.img}
        })
        setMenuObject(obj)
    }, [menuList]);

   
    //custom hook -> 여러 데이터 받아옴
    if(isLoading){
        console.log("isloading")
        return (
            
            <div>
                loading...
            </div>

        )
    }
    else{
        console.log("!!!Loading end!!!")
         return(
            <div className="report-page">
                <Header page={page}></Header>
                <TodaySales page={page} value={todayValue}></TodaySales>
                <CompPredictSales page={page} value={predictTodayValue} todayValue={todayValue} menuObject={menuObject}></CompPredictSales>
                <PredictSales page={page} value={predictDetailValue} menuObject={menuObject}></PredictSales>
                <BestMenu page={page} value={rankDetailValue} menuObject={menuObject}></BestMenu>
                <BiggestDiffMenu page={page} value={rankCompareValue} menuObject={menuObject}></BiggestDiffMenu>
                <BottomNavbar></BottomNavbar>
            </div>
            
        );
    }

   

}

export default ReportPage;

