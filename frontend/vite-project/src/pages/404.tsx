import React, { useEffect } from 'react'
import { Button, ErrorBlock } from 'antd-mobile'

export const NonePage =  () => {
  useEffect(() => {
    document.body.style.background = 'var(--adm-color-background)'
  }, [])
  return <ErrorBlock fullPage >
    <Button color='primary' onClick={()=>{window.location.href='/login'}}>返回首页</Button>
  </ErrorBlock>
}