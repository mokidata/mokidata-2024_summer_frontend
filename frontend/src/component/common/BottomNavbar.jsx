import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const BottomNavbar = (props) => {

    
    const links = [props.t('bottomNavBar.daily'), props.t('bottomNavBar.weekly'), props.t('bottomNavBar.monthly')];
    const linksCode = ['daily', 'weekly', 'monthly'];
    const navigate = useNavigate();

    function changeDateType(link) {
        let dateType = "";
        switch (link) {
            case props.t('bottomNavBar.monthly'):
                dateType = "monthly";
                break;
            case props.t('bottomNavBar.weekly'):
                dateType = "weekly";
                break;
            case props.t('bottomNavBar.daily'):
                dateType = "daily";
                break;
            default:
                dateType = props.page;
        }
        if (props.page !== dateType && props.info === "reportIndex") {
            navigate(`/${dateType}`, { state: { currentDate: props.currentDate } });
        } else if (props.page !== dateType && props.info === "bestmenu") {
            navigate(`/bestmenu`, { state: { currentDate: props.currentDate, page: dateType } });
        } else if (props.page !== dateType && props.info === "biggestdiff") {
            navigate(`/biggestdiff`, { state: { currentDate: props.currentDate, page: dateType } });
        }
    }

    return (
        <div className="bottom-nav">
            {
                links.map((link, index) => (
                    <button 
                        className="botton-nav__button" 
                        key={linksCode[index]} 
                        onClick={(event) => changeDateType(link)} 
                        style={linksCode[index] === props.page ? { textDecoration: "underline" } : {}}>
                        {link}
                    </button>
                ))
            }
        </div>
    );
}

export default BottomNavbar;
