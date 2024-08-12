import { useNavigate } from "react-router-dom";

const BottomNavbar = (props) => {
    const links = ['일별', '주별','월별' ];
    const linksCode =['daily','weekly','monthly']
    const navigate = useNavigate()
    function changeDateType(link){
        let dateType = ""
        switch(link){
            case '월별' :
                dateType = "monthly"
                break
            case '주별':
                dateType = "weekly"
                break
            case '일별':
                dateType = "daily"
                break
            default:
                dateType = props.page
        }
        if(props.page !== dateType && props.info == "reportIndex"){
            navigate(`/${dateType}`,{state:{currentDate: props.currentDate}})
        }

        else if(props.page !== dateType && props.info =="bestmenu"){
            navigate(`/bestmenu`,{state:{currentDate: props.currentDate, page:dateType}})

        }
        else if(props.page !== dateType && props.info =="biggestdiff"){
            navigate(`/biggestdiff`,{state:{currentDate: props.currentDate, page:dateType}})

        }

        
    }
    
    return (
        <div className="bottom-nav">
           {
                links.map((link,index)=>(
                    <button className="botton-nav__button" key={linksCode[index]} onClick={(event => {
                        changeDateType(link)
                    })} 
                    style={linksCode[index] === props.page ? {textDecoration:"underline"} : {}}>
                        {link}
                    </button>
                ))
                    

                
           } 
        </div>
    );
}

export default BottomNavbar;