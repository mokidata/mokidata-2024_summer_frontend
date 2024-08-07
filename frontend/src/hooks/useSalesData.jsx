import { useDispatch, useSelector } from "react-redux";
import { totalThunks } from "../services/salesApiSlice";
import { useEffect, useState } from "react";

function useSalesData() {
    console.log("!!!!use Sales Data!!!");
    const [currentDate,setCurrentDate] = useState("")
    const [todayValue, setTodayValue] = useState({ daily: {}, weekly: {}, monthly: {} });
    const [predictTodayValue, setPredictTodayValue] = useState({ daily: {}, weekly: {}, monthly: {} });
    const [predictDetailValue, setPredictDetailValue] = useState({ daily: {}, weekly: {}, monthly: {} });
    const [rankCompareValue, setRankCompareValue] = useState({ daily: {}, weekly: {}, monthly: {} });
    const [rankDetailValue, setRankDetailValue] = useState({ daily: {}, weekly: {}, monthly: {} });
    const [lastDetailValue, setLastDetailValue] = useState({ daily: {}, weekly: {}, monthly: {} });
    const [predictLastValue, setPredictLastValue] = useState({ daily: {}, weekly: {}, monthly: {} });
    const [menuObject, setMenuObject] = useState({});
    const [isLoadingState, setIsLoadingState] = useState(true);
    
    const isLoading = useSelector((state) => state.sale.isLoading);
    const totalData = useSelector((state) => state.sale.totalData);

    useEffect(() => {
        if (!isLoading) {
            console.log(totalData);
            setCurrentDate(totalData['date'])
            setTodayValue(totalData['today']);
            setPredictTodayValue(totalData['predictToday']);
            setPredictDetailValue(totalData['predictDetail']);
            setRankCompareValue(totalData['rankCompare']);
            setPredictLastValue(totalData['predictLast'])
            setRankDetailValue(totalData['rankDetail']);
            if (totalData['menuList'].length !== 0) {
                const menuList = totalData['menuList']
                let obj = {};
                menuList.forEach((element) => {
                    obj[element.name] = { price: element.price, img: element.img };
                });
                setMenuObject(obj);
            }
            setLastDetailValue(totalData['lastDetail'])
            setIsLoadingState(false);
        }
        else{
            setIsLoadingState(true)
        }
    }, [isLoading, totalData]); // totalData를 의존성 배열에 추가


   
    return { currentDate,isLoadingState, todayValue, predictTodayValue, predictDetailValue, predictLastValue ,rankDetailValue, rankCompareValue, menuObject , lastDetailValue };
}

export default useSalesData;
