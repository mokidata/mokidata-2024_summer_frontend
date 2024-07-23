import Header from "../../component/common/Header";
import BestMenu from "../../component/contents/BestMenu";
import BiggestDiffMenu from "../../component/contents/BiggestDiffMenu";
import CompPredictSales from "../../component/contents/CompPredictSales";
import PredictSales from "../../component/contents/PredictSales";
import TodaySales from "../../component/contents/TodaySales";
import usePageInfo from "../../hooks/usePageInfo";

function ReportPage(props){
    const [page] = usePageInfo(props.page);
    
    //custom hook -> 여러 데이터 받아옴
    return(
        <div className="report-page">
            <Header page={page}></Header>
            <TodaySales page={page}></TodaySales>
            <CompPredictSales page={page}></CompPredictSales>
            <PredictSales page={page}></PredictSales>
            <BestMenu page={page}></BestMenu>
            <BiggestDiffMenu page={page}></BiggestDiffMenu>
        </div>
        
    );

}

export default ReportPage;

