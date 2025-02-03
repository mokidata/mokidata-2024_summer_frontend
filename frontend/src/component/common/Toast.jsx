import { useEffect } from "react";

const ToastMessage = ({ setToast, text }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            setToast(false);
        }, 1500);
        return () => {
            clearTimeout(timer);
        }
    }, [setToast]);

    return (
        <div className="toast_message">
            { text }
        </div>
    );
}
 
export default ToastMessage;