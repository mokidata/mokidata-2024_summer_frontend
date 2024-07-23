import Chart from "../common/Chart";
import Price from "../common/Price";

function CompPredictSales (props){
    const data = [
        {
            column: "예상 매출",
            value:400000,
            highlight : false
        }
        ,
        {
            column :"실제 매출",
            value : 456789,
            highlight: true
        }
        ,
    ]
    
    return(
        <div className="report-component">
            <div className="report-title">
                <div className="report-title__benefit">
                    <div>
                         오늘 예상보다&nbsp;
                    </div>
                    <Price value={12345} unit="원"></Price>
                    
                </div>
                <div>
                    더 벌었어요!
                </div>

            </div>
            <Chart type="bar" data={data}></Chart>

        </div>
        
    );
}

export default CompPredictSales