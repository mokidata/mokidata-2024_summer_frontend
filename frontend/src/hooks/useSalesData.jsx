import { useDispatch, useSelector } from "react-redux";
import { totalThunks } from "../services/salesApiSlice";
import { useEffect,useState} from "react";
function useSalesData() {

    console.log("!!!!use Sales Data!!!")
    const [todayValue , setTodayValue] = useState({daily:{},weekly:{},monthly:{}});
    const [predictTodayValue , setPredictTodayValue] = useState({daily:{},weekly:{},monthly:{}});
    const [predictDetailValue , setPredictDetailValue] = useState({daily:{},weekly:{},monthly:{}});
    const [rankCompare , setRankCompare] = useState({daily:{},weekly:{},monthly:{}});
    const [rankDetailValue , setRankDetailValue] = useState({daily:{},weekly:{},monthly:{}});
    const [menuList,setMenuList] = useState([])
    const isLoading = useSelector((state) => state.sale.isLoading)
    const totalData = useSelector((state) => state.sale.totalData)

    useEffect(()=>{
        if(!isLoading){
            setTodayValue(totalData['today'])
            setPredictTodayValue(totalData['predictToday'])
            setPredictDetailValue(totalData['predictDetail'])
            setRankCompare(totalData['rankCompare'])
            setRankDetailValue(totalData['rankDetail'])
            setMenuList(totalData['menuList'])
            console.log({todayValue,predictTodayValue,predictDetailValue,rankDetailValue,rankCompare,menuList})
        }
    },[isLoading])
    
    
    return {isLoading,todayValue,predictTodayValue,predictDetailValue,rankDetailValue,rankCompare,menuList};
    

    
}

export default useSalesData;