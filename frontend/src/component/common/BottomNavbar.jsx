const BottomNavbar = () => {
    const links = ['월별', '주별', '일별'];
    return (
        <div className="bottom-nav">
           {
                links.map((link)=>(
                    <button className="botton-nav__button">
                        {link}
                    </button>
                ))
                    

                
           } 
        </div>
    );
}

export default BottomNavbar;