import React, {useState, useEffect} from 'react';
import {useDownload} from './hooks';

interface IProps{
    hasMore:boolean,
    loadMore:()=>void,
}
/**
 * 无限滚动
 * @param param
 * @returns 
 */
const InfiniteScroll = ({hasMore,loadMore}:IProps) => {
   const [state, setState] = useState();
   const {tips}  = useDownload({hasMore,loadMore});
   useEffect(() => {

   },[])

   return (
       <div>
        {hasMore? tips : '没有更多值'}
       </div>
   );
};

export default InfiniteScroll;

