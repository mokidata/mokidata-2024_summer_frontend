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
    // const data = [
    //     {
    //       column: "3월",
    //       value: 345345,
    //       highlight: false,
    //     },
    //     {
    //       column: "4월",
    //       value: 456456,
    //       highlight: false,
    //     },
    //     {
    //       column: "5월",
    //       value: 567567,
    //       highlight: false,
    //     },
    //     {
    //       column: "6월",
    //       value: 678678,
    //       highlight: false,
    //     },
    //     {
    //       column: "7월",
    //       value: 789789,
    //       highlight: false,
    //     },
    //     {
    //       column: "8월",
    //       value: 890890,
    //       highlight: true,
    //     },
    //   ];
    return(
        <div className="report-component">
            <div className="report-title">
                <div>
                    오늘 예상보다 
                    <br></br> 더 벌었어요!
                </div>
                <div>
                    <Price value={12345} unit="원"></Price>
                    
                </div>

            </div>
            <Chart type="bar" data={data}></Chart>

        </div>
        
    );
}

export default CompPredictSales