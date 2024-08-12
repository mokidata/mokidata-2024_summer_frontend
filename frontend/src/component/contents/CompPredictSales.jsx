import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next"; // i18n 추가
import Chart from "../common/Chart";
import Price from "../common/Price";
import GetInteger from "../common/GetInteger";

function CompPredictSales(props) {
    
    const [predictTotal, setPredictTotal] = useState(0);
    const [todayTotal, setTodayTotal] = useState(0);
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        try {
            const predictValue = props.value[props.page]["predictData"];
            const menuData = props.menuObject;
            // 모든 값을 더하는 코드
            let totalSum = 0;

            for (const key in predictValue) {
                if (menuData[key] !== undefined && predictValue[key] !== undefined) {
                    totalSum += menuData[key].price * predictValue[key];
                }
            }
            totalSum = GetInteger(totalSum);
            setPredictTotal(totalSum);
            setTodayTotal(props.todayValue[props.page]['today']);
        } catch (error) {
            console.log(error);
        }
    }, [props.page]);

    useEffect(() => {
        setChartData([
            { "column": props.t('compPredictSales.expectedRevenue'), "value": predictTotal, "highlight": false, "valueHighlight": false },
            { "column": props.t('compPredictSales.actualRevenue'), "value": todayTotal, "highlight": true, "valueHighlight": true }
        ]);
    }, [todayTotal, predictTotal, props]);

    return (
        <div className="report-component">
            {
                todayTotal - predictTotal > 0 ?
                    <div className="report-title">
                        <div>
                            {
                                props.page === 'daily' ? props.t('compPredictSales.today') :
                                props.page === 'weekly' ? props.t('compPredictSales.thisWeek') :
                                props.page === 'monthly' ? props.t('compPredictSales.thisMonth') :
                                props.t('compPredictSales.today')
                            } {props.t('compPredictSales.moreEarned_en')} 😆
                        </div>
                        <div className="report-title__benefit">
                            <Price value={todayTotal - predictTotal} unit={props.t('compPredictSales.unit')}></Price>
                            &nbsp; {props.t('compPredictSales.moreEarned_kr')}
                        </div>
                    </div>
                    :
                    <div className="report-title">
                        <div>
                            {
                                props.page === 'daily' ? props.t('compPredictSales.todaySales') :
                                props.page === 'weekly' ? props.t('compPredictSales.thisWeekSales') :
                                props.page === 'monthly' ? props.t('compPredictSales.thisMonthSales') :
                                props.t('compPredictSales.todaySales')
                            } {props.t('compPredictSales.lessEarned_en')}
                        </div>
                        <div className="report-title__benefit" style={{flexDirection:"row"}}>
                            <Price value={predictTotal - todayTotal} unit={props.t('compPredictSales.unit')}></Price>
                            &nbsp; {props.t('compPredictSales.lessEarned_kr')}
                        </div>
                    </div>
            }
            <Chart isVisible={props.isVisible} type="bar" data={chartData}></Chart>
        </div>
    );
}

export default CompPredictSales;
