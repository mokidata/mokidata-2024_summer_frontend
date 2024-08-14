import { useEffect, useState } from "react";

const usePageInfo = (input) => {
    const [pageInfo, setPageInfo] = useState("default");
    
    useEffect(() => {
        if (input === 'login'){
            setPageInfo("login");
        }
        else{
            switch(input){
                case 'daily':
                    setPageInfo("daily");
                    
                    break;
                case 'weekly':
                    setPageInfo("weekly");
                    break;
                case 'monthly':
                    setPageInfo("monthly");
                    break;
                case 'login':
                    
                    break;
            }
        }
    }, [input]);
   

    return [pageInfo];
}

export default usePageInfo;