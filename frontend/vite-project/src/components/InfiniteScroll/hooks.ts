import { useEffect, useState } from "react"

const OFFEST = 90;

export const useDownload = ({
    hasMore=false,
    loadMore=()=>{}
})=>{
    const [tips,setTips] = useState('');

    useEffect(() =>{
        window.onscroll = async ()=>{
            const {scrollTop,clientHeight} = document.documentElement;
            const  {scrollHeight} = document.body;

            if(hasMore && (scrollTop + clientHeight + OFFEST >= scrollHeight)){
                setTips('加载中。。。');
                await loadMore();
                setTips('加载完成。。。');
                setTimeout(()=>{
                    setTips('')
                },1000)
            }
        }

        return ()=>{
            window.onscroll = null;
        }
    },[hasMore])

    return {
        tips,
    }
}