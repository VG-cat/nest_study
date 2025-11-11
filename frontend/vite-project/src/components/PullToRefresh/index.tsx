import React, { useState, useEffect } from 'react';
import { usePullToRefresh } from './hooks';

interface IProps {
    children: React.ReactNode,
    onRefresh: () => void;
}

/**
 * 下拉刷新组件
 * @returns 
 */
const PullToRefresh = ({ children, onRefresh }: IProps) => {

    const [state, setState] = useState();
    const { status, containerRef } = usePullToRefresh(onRefresh);

    useEffect(() => {

    }, [])

    return (
        <div ref={containerRef}>
            {status !== 'finish' && status}
            {children}
        </div>
    );
};

export default PullToRefresh;