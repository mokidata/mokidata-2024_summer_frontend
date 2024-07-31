import { useLocation } from "react-router-dom";
import Header from "../../component/common/Header";
import Price from "../../component/common/Price";
import Triangle from "../../component/common/Triangle";
import { useEffect, useState } from "react";

function BestMenuDetail(props){
    const location = useLocation()
    const {state } = location
    const [rankArray,setRankArray] = useState([])
    const [lastRank,setLastRank] = useState({})
    useEffect(()=>{
        const obj = {}
        if(Object.keys(state.lastDetail[state.page]).length !== 0)
        {
            state.lastDetail[state.page]['saleGetResList'].forEach((element,index) => {
                obj[element.name] = index+1
            });
            setLastRank(obj);
        }
       
        if( Object.keys(state.rankDetail[state.page]).length !== 0){
            setRankArray(state.rankDetail[state.page]['saleGetResList'])
        }
        
    },[state])
    useEffect(()=>{
        console.log(rankArray)
    },[rankArray])


    return(
        <div className="report-page">
            <Header page={props.page}></Header>
            <div className="report-component" id="best-rank">
                <div className="best-rank__goback">
                    &lt; 오늘 판매 순위

                </div>
                <div className="best-rank__table">
                    <div className="best-rank__column-info">
                        <div className="best-rank__column" id="rank">
                            순위
                        </div>
                        <div className="best-rank__column" id="diff">
                            변동
                        </div>
                        <div className="best-rank__column" id="menu-info">
                            메뉴명<br></br>판매갯수
                        </div>
                        <div className="best-rank__column" id="profit">
                            판매금액
                        </div>

                    </div>
                    {
                        rankArray.map((element,index) => (
                            <div className="best-rank__each" id={(index+1) %2 === 0 ? "even":"odd"}>
                                <div className="best-rank__row" id="rank">
                                    {index+1}
                                </div>
                                <div className="best-rank__row" id="diff">
                                    <Triangle diff={index+1 - lastRank[element.name] } unit=""></Triangle>
                                </div>
                                <div className="best-rank__row" id="menu-info">
                                    <div className="best-rank__row__menu">
                                        {element.name}
                                    </div>
                                    <div className="best-rank__row__sales">
                                        {element.count}
                                    </div>

                                </div>
                                <div className="best-rank__row" id="profit">
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