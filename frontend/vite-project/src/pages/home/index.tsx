import InfiniteScroll from '@/components/InfiniteScroll';
import PullToRefresh from '@/components/PullToRefresh';
import React, { useState, useEffect } from 'react';


const Home = () => {
    const [state, setState] = useState();

    const data = new Array(1000).fill(10);

    return (
        <>
            <PullToRefresh onRefresh={() => console.log('刷新')}>
                <div>
                    {data.map(item => {
                        return <li style={{ height: "20px", width: "100vw", background: 'red' }}>{item}</li>
                    })}
                </div>
            </PullToRefresh>
            <InfiniteScroll hasMore={true} loadMore = {()=>{}}/>
        </>

    );
};

export default Home;