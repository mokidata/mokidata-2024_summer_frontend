

function TopButton(props){
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    return(
        <div className="top-button" onClick={() => scrollToTop()}>
        </div>
    )

}

export default TopButton