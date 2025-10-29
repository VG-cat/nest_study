import React, { useRef } from 'react'
import { Button, Form, Input } from 'antd-mobile'
import { useMutation } from '@apollo/client/react';
import { GET_AUTHCODE, VALIDATE_CODE } from './graphql/auth';
import type { FormInstance } from 'antd-mobile/es/components/form';


const App = function () {
  const fileRef = useRef(null);
  const [run] = useMutation(GET_AUTHCODE);
  const [login] = useMutation(VALIDATE_CODE);
  const formRef = React.createRef<FormInstance>()

  const handleSubmit = (e: Event) => {
    e.preventDefault()
    const file = fileRef.current.files[0];

    fetch("http://localhost:3000/graphql", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `query getSignature{
          getSignature{
            exprie,
            signature,
            accessid,
            dir,
            host,
            policy
          }
        }`,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("获取签名失败");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data.data);

        //使用永久 AccessKey + POST 表单直传
        const formData = new FormData();
        formData.append("policy", data.data.getSignature.policy);
        formData.append("signature", data.data.getSignature.signature);
        formData.append("OSSAccessKeyId", data.data.getSignature.accessid);
        formData.append("key", data.data.getSignature.dir + file.name); // 文件名
        formData.append("file", file); // file 必须为最后一个表单域

        return fetch(data.data.getSignature.host, {
          method: "POST",
          body: formData
        });
      })
      .then((response) => {
        if (response.ok) {
          console.log("上传成功");
          alert("文件已上传");
        } else {
          console.log("上传失败", response);
          alert("上传失败，请稍后再试");
        }
      })
      .catch((error) => {
        console.error("发生错误:", error);
      });

  }

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
      alert('登录成功')
    } else {
      alert('登录失败')
    }
  }

  return (
    <>
      <form>
        <div>
          <label>选择文件:</label>
          <input type="file" id="file" name="file" ref={fileRef} required />
        </div>
        <button type="submit" onClick={handleSubmit}>上传</button>
      </form>
      <Form layout='horizontal' mode='card'
        onFinish={onFinish}
        ref={formRef}
        footer={
          <Button block type='submit' color='primary' size='large'>
            提交
          </Button>
        }
      >
        <Form.Header>卡片模式及分组</Form.Header>
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

export default App
