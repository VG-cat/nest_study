import { getWeekZh } from '../src/utils';
import { act, fireEvent, render, renderHook, waitFor } from '@testing-library/react';
import { useRequest } from '../src/hooks/useRequest'; // Adjust path as needed
import { expect, describe, it } from '@jest/globals';


describe('测试',()=>{
    it('utils 测试',()=>{
        const res = getWeekZh('Monday');
        //断言
        expect(res).toBe('周一')
    });
    it('hooks 测试',async ()=>{
        const service = () => new Promise((r)=>{
            r(true);
        })

        const {result} = renderHook(() => useRequest(service,{}));

        await waitFor(()=>{});

        expect(result.current).toBe('')
    });
    it('组件 测试',async ()=>{
        const dom = <Button/>;
        const {getByText} = render(dom);
        
        const myButton = getByText('myButton');

        act(() => {fireEvent.click(myButton)});  //等待页面加载

        const cn = myButton.parentElement?.className;


        expect(cn).toContain('active')
    })

})
