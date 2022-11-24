import React,{useState} from 'react'
import { Cell,Input,Button,Checkbox,Toast } from 'zarm';
import stl from './style.module.less'

const Login = () => {
  const [username, setUsername] = useState(''); // 账号
  const [password, setPassword] = useState(''); // 密码
  //登录
  const onSubmit = ()=>{
    console.log(username,password)
  }
  return <div className={stl.login}>
     <div className={stl.from}>
        <h2>登录</h2>
        <div>
          <Cell title="账号">
            <Input
              clearable
              type="text"
              placeholder="请输入账号"
              onChange={(value) => setUsername(value)}
            />
          </Cell>
          <Cell title="密码">
            <Input
              clearable
              type="password"
              placeholder="请输入密码"
              onChange={(value) => setPassword(value as string)}
            />
          </Cell>
        </div>
        <div className={stl.btn}>
            <div className={stl.checkbox}>
               <Checkbox id="agreement"/>
               <label htmlFor="agreement"> <a
                    href="/#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert('agree it');
                    }}
                  >
                    《XXX条款》
                  </a>
                  中的相关规定
                  </label>
            </div>
            <Button block onClick={onSubmit} theme="primary">登录</Button>
        </div>
     </div>
  </div>
}

export default Login