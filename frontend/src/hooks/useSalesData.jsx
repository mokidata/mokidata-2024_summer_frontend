import { useDispatch, useSelector } from "react-redux";
import { totalThunks } from "../services/salesApiSlice";
import { useEffect, useState } from "react";

function useSalesData() {
    console.log("!!!!use Sales Data!!!");
    const [todayValue, setTodayValue] = useState({ daily: {}, weekly: {}, monthly: {} });
    const [predictTodayValue, setPredictTodayValue] = useState({ daily: {}, weekly: {}, monthly: {} });
    const [predictDetailValue, setPredictDetailValue] = useState({ daily: {}, weekly: {}, monthly: {} });
    const [rankCompareValue, setRankCompareValue] = useState({ daily: {}, weekly: {}, monthly: {} });
    const [rankDetailValue, setRankDetailValue] = useState({ daily: {}, weekly: {}, monthly: {} });
    const [lastDetailValue, setLastDetailValue] = useState({ daily: {}, weekly: {}, monthly: {} });
    const [menuList, setMenuList] = useState([]);
    const [menuObject, setMenuObject] = useState({});
    const [isLoadingState, setIsLoadingState] = useState(true);
    
    const isLoading = useSelector((state) => state.sale.isLoading);
    const totalData = useSelector((state) => state.sale.totalData);

    useEffect(() => {
        if (!isLoading) {
            console.log(totalData);
            setTodayValue(totalData['today']);
            setPredictTodayValue(totalData['predictToday']);
            setPredictDetailValue(totalData['predictDetail']);
            setRankCompareValue(totalData['rankCompare']);
            setRankDetailValue(totalData['rankDetail']);
            setMenuList(totalData['menuList']);
            setLastDetailValue(totalData['lastDetail'])
        }
    }, [isLoading, totalData]); // totalData를 의존성 배열에 추가

    useEffect(() => {
        if (menuList.length !== 0) {
            let obj = {};
            menuList.forEach((element) => {
                obj[element.name] = { price: element.price, img: element.img };
            });
            setMenuObject(obj);
        }
    }, [menuList]);

    useEffect(() => {
        // 모든 상태가 업데이트된 후 isLoadingState를 설정
        if (!isLoading) {
            setIsLoadingState(false);
        }
    }, [todayValue, predictTodayValue, predictDetailValue, rankDetailValue, rankCompareValue, menuObject, lastDetailValue]); // 모든 상태를 의존성 배열에 추가

    return { isLoadingState, todayValue, predictTodayValue, predictDetailValue, rankDetailValue, rankCompareValue, menuObject , lastDetailValue };
}

export default useSalesData;
