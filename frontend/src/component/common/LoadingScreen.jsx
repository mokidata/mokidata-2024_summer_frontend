import {motion} from 'framer-motion'

function LoadingScreen(props){

    return (
        <div className='loading-screen'>
             <motion.div
            className="loading-spinner"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{
                duration: 1,
                ease: "linear",
                repeat: Infinity // 무한 반복
            }}
            style={{
                width: '30px',
                height: '30px',
                border: '6px solid black', // 회색
                borderTop: '6px solid white', // 파란색
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}
            >
            
            </motion.div>
            <div className='loading-txt'>
                 {props.txt}
            </div>
       

        </div>
       
    );
}

export default LoadingScreen