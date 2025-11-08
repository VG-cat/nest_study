import React, { useRef } from 'react'
import { Button, Form, Input } from 'antd-mobile'
import { useMutation } from '@apollo/client/react';
import { GET_AUTHCODE, VALIDATE_CODE } from '@/graphql/auth';
import type { FormInstance } from 'antd-mobile/es/components/form';
import { useNavigate } from 'react-router-dom';


const Login = function () {

  const [run] = useMutation(GET_AUTHCODE);
  const [login] = useMutation(VALIDATE_CODE);
  const formRef = React.createRef<FormInstance>()

  const nav = useNavigate();

  const handleSendCode = () => {
    const tel = formRef.current?.getFieldValue('tel')
    //发送验证码
    run({
      variables: {
        tel: tel
      }
    }).then(res => {
      console.log(res);
    })
  }

  const onFinish = async (value: { tel: string, code: string }) => {
    const res = await login({
      variables: value
    })
    console.log(res);

    if (res.data && res.data?.validateCode) {
      localStorage.setItem('token',res.data?.validateCode.data)
      alert('登录成功');
      nav('/404');

    } else {
      alert('登录失败')
    }
  }

  return (
    <>
      <Form layout='horizontal' mode='card'
        onFinish={onFinish}
        ref={formRef}
        footer={
          <Button block type='submit' color='primary' size='large'>
            提交
          </Button>
        }
      >
        <Form.Header>登录</Form.Header>
        <Form.Item label='手机号' required name='tel'>
          <Input placeholder='请输入' />
        </Form.Item>
        <Form.Item label='短信验证码' extra={<a onClick={handleSendCode}>发送验证码</a>} required name='code'>
          <Input placeholder='请输入' />
        </Form.Item>
        <Form.Header />
      </Form>
    </>
  )
}

export default Login
