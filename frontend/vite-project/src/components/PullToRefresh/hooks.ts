import { useEffect, useRef, useState } from "react";


const MAX_Y = 200;

const STATUS = {
    START: 'start',
    AWAIT: 'await',
    LOADING: 'loading',
    SUCCESS: 'success',
    FINISH: 'finish'
}

export const usePullToRefresh = (onRefresh: () => void) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const y = useRef(0);
    const [status, setStatus] = useState('');

    useEffect(() => {
        if (!containerRef.current) return () => { };
        containerRef.current.ontouchstart = (e) => {
            e.preventDefault()
            if (document.documentElement.scrollTop == 0) {
                y.current = e.touches[0].pageY;
            }
        };
        containerRef.current.ontouchmove = (e) => {
            if (document.documentElement.scrollTop == 0) {
                if (e.touches[0].pageY - y.current > MAX_Y) {
                    setStatus(STATUS.AWAIT);
                    return;
                }

                if (e.touches[0].pageY - y.current > 0) {
                    setStatus(STATUS.START);
                    return;
                }


            }
        };

        return () => {
            if (!containerRef.current) return;
            containerRef.current.ontouchstart = null;
            containerRef.current.ontouchmove = null;
        }
    }, []);

    useEffect(() => {
        if (!containerRef.current) return () => { };
        containerRef.current.ontouchend = async (e) => {
            e.preventDefault(); 
            if (status == STATUS.AWAIT) {
                setStatus(STATUS.LOADING);
                await onRefresh();
                setStatus(STATUS.SUCCESS);
                setTimeout(() => {
                    setStatus(STATUS.FINISH);
                }, 500);
                return;
            }

            setStatus(STATUS.FINISH);
        }

        return () => {
            if (!containerRef.current) return;
            containerRef.current.ontouchend = null;
        }
    }, [status])


    return {
        status,
        containerRef
    }
}