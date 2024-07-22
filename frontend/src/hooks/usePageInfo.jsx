import { useEffect, useState } from "react";

const usePageInfo = (input) => {
    console.log(input)
    const [pageInfo, setPageInfo] = useState("default");
    
    useEffect(() => {
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
                setPageInfo("login");
                break;
        }

    }, [input]);
   

    return [pageInfo];
}

export default usePageInfo;