import { useEffect, useState } from "react";
import { formatDate, formatDateNum, formatMonth, formatWeek, formatYear } from "./DateConverter";
import { useDispatch } from "react-redux";
import { totalThunks } from "../../services/salesApiSlice";
import { useNavigate } from "react-router-dom";

function CalendarContent(props){
    // props.currentDate = 2024-오늘-날짜
    let date=new Date(props.currentDate)
    let dateList = []
    let monthList = []
    let finalMap = {}
    let i = 0;
    const navigate =useNavigate()
    const dispatch = useDispatch()
    const [isMonthSelect,setIsMonthSelect] = useState(false)
    const [currentMonth,setCurrentMonth] = useState("")
    const HandleMonthSelect = (cur) => {
        console.log()
        setIsMonthSelect(!isMonthSelect)
        setCurrentMonth(cur)
    }

    const HandleDispatch= (date,page) =>{
        props.open()
        // setIsMonthSelect(!isMonthSelect)
        console.log(date)
        dispatch(totalThunks(date))
        if (props.detail ){
            navigate("/detail",{state:{currentDate:date, page:props.page, pageType:props.detail}})
        }
    }
    
    //월, 주 ,일 목록 뽑아내는 코드
    for ( let validDate of props.validDateList){
        dateList.push(validDate)
        monthList.push(`${formatYear(validDate)} ${formatMonth(validDate)}`)

    }
   
    dateList.forEach((element,index)=>{
        let list = []
        const elemDate = new Date(element)
        //해당 월의 첫날(2024년 7월 1일)
        const firstDayOfMonth = new Date(elemDate.getFullYear(), elemDate.getMonth(), 1);
        //해당 월의 마지막 날 (31일)
        const lastDayOfMonth = new Date(elemDate.getFullYear(), elemDate.getMonth()+1,0)
        const daysInMonth = lastDayOfMonth.getDate()
        // 해당 월의 첫 날이 속한 주의 시작일(월요일) 구하기
        const startOfWeek = new Date(firstDayOfMonth);
        startOfWeek.setDate(firstDayOfMonth.getDate() - firstDayOfMonth.getDay());
        switch(props.page){
            case 'daily':
                for (let day = 1; day <= daysInMonth; day++) {
                    const thisDate = new Date(elemDate.getFullYear(), elemDate.getMonth(), day)
                    if (thisDate <= new Date()){
                        list.push(formatDate(thisDate))
                    }
                }
                finalMap[monthList[index]] = list
                break
            case 'weekly':
                // 주 단위로 날짜를 추가
                for (let thisDate = startOfWeek; thisDate <= lastDayOfMonth; thisDate.setDate(thisDate.getDate() + 1)) {
                    // 토요일인 경우 주 배열에 추가하고 초기화
                    if (thisDate.getDay() === 6|| thisDate > lastDayOfMonth) {
                        list.push(formatDate(thisDate));
                        // formatWeek(formatDate(thisDate))
                    }
                }
                finalMap[monthList[index]] = list
                break
        }
    })

    useEffect(()=>{
        setIsMonthSelect(false)
    },[])


   
    return(

        <div className="side-nav">
            <div className="side-nav__top">
                <div className="side-nav__title">
                    {props.t('calendar.selectMonth')}
                </div>
                <div className="side-nav__close" onClick={() => props.open()}>
                    X
                </div>

            </div>
            <div className="side-nav__list">
                {   
                    isMonthSelect ?
                    <div className="side-nav__list">
                        <div className="side-nav__content side-pick" id="calendar" onClick={()=>{
                            setIsMonthSelect(false)
                            
                        }}>
                            {currentMonth}
                        </div>
                        {
                        
                            finalMap[currentMonth].map((date,index)=>(
                                <div className="side-nav__content side_detail-date" id="calendar" onClick={()=>{
                                    props.open()
                                    HandleDispatch(date,props.page)
                                }}>
                                    {
                                        props.page === 'daily' ? formatDateNum(date):
                                        props.page === 'weekly' ? formatWeek(date):
                                        ""
                                    }
                                    
                                </div>
                            ))
                        
                        }
                    </div>
                    :
                    dateList.map((date,index)=>(
                        <div>
                            <div className="side-nav__content" id="calendar" onClick={()=>{
                                props.page === 'monthly' ? HandleDispatch(date,props.page) : HandleMonthSelect(`${formatYear(date)} ${formatMonth(date)}`)
                            
                            
                            }} >
                            {`${formatYear(date)} ${formatMonth(date)}`}
                            </div>
                        </div>
                        
                    ))
                    
                }
            </div>


        </div>
    );

}

export default CalendarContent