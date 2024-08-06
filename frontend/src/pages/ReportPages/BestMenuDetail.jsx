import { useLocation } from "react-router-dom";
import Header from "../../component/common/Header";
import Price from "../../component/common/Price";
import Triangle from "../../component/common/Triangle";
import { useEffect, useState } from "react";

function BestMenuDetail(props){
    const location = useLocation()
    const {state} = location
    const rankArray = state.rankDetail[state.page]
    const [lastRank,setLastRank] = useState({})
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



    return(
        <div className="report-page">
            <Header page={state.page} currentDate={state.currentDate}></Header>
            <div className="report-component" id="best-rank">
                <div className="best-rank__goback">
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

            </div>
            

        </div>

    );


}

export default BestMenuDetail;