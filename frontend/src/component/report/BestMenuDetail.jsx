import Price from "../../component/common/Price";
import Triangle from "../../component/common/Triangle";
import { useEffect, useState } from "react";
import {motion} from 'framer-motion'


function BestMenuDetail(props){
   

    console.log(props)
    // const [pageInfo,setPageInfo] = useState("daily")
    // const rankArray = state.rankDetail[state.page]
    const [rankArray,setRankArray] = useState([{"name":"","count":0,"price":0}])   
    const [lastRank,setLastRank] = useState({"daily":[],"weekly":[],"monthly":[]})
   
   
    useEffect(()=>{
        if(props.rankDetailValue !== null){
            console.log(props.rankDetailValue[props.page])
            const copy = [...props.rankDetailValue[props.page]]
            copy.sort((a, b) => (b.price * b.count) - (a.price * a.count));
            setRankArray(copy)
        }
        
        // setRankInfo(state.page)
    },[props.rankDetailValue,props])
    
    useEffect(() => {
        const obj = {};
        if (props.lastDetailValue !== null) {
            props.lastDetailValue[props.page].forEach((element, index) => {
                obj[element.name] = index + 1;
            });
            setLastRank(obj);
        }
    }, [props, props.lastDetailValue]);




    return (
        
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="report-component"
                id="best-rank"
            >
                <div className="best-rank__goback" onClick={props.goBack}>
                    &lt; {props.t(`bestMenuDetail.${props.page}`)} {props.t('bestMenuDetail.back')}
                </div>
                <div className="best-rank__table">
                    <div className="best-rank__column-info">
                        <div className="best-rank__column" id="rank__rank">
                            {props.t('bestMenuDetail.rank')}
                        </div>
                        <div className="best-rank__column" id="rank__diff">
                            {props.t('bestMenuDetail.diff')}
                        </div>
                        <div className="best-rank__column" id="rank__menu-info" style={{display:"flex",flexDirection:"column"}}>
                            <div>
                                {props.t('bestMenuDetail.menuName')}
                            </div>
                            <div>
                                {props.t('bestMenuDetail.menuQuantity')}
                            </div>
                            
                            
                        </div>
                        <div className="best-rank__column" id="rank__profit">
                            {props.t('bestMenuDetail.profit')}
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
        
    );


}

export default BestMenuDetail;