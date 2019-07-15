import React, {Component} from 'react'
import { Form, Icon, Input, Button,message} from 'antd'
import logo from './images/logo.png'
import './login.less'
import reqLogin from '../../api'
import storageUtil from '../../utils/storageUtil'
import memoryUtil from '../../utils/memoryUtil'

 class Login extends Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async(err,{username,password})=>{
        if(!err){
          const result=await reqLogin(username,password)
          console.log(username,password)
          console.log(result)
          if(result.status===0){
            const user=result.data
            storageUtil.saveUser(user)
            memoryUtil.user=user
            this.props.history.replace('/')
            message.success('登录成功')
          }else{
            message.error('登录失败')
          }
          
          //alert(`发送ajxa请求，用户名${username},密码${password}`)
        }else{

        }
    })
    
  };
  validator=(rule,value,callback)=>{
    value=value.trim()
    if(!value){
      callback('输入内容不能为空')
    }else if(value.length<4){
      callback('密码长度不能小于4位')
    }else if(value.length>12){
      callback('密码长度不能大于12位')
    }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
      callback('密码必须由英文数字和下划线组成')
    }else{
      callback()
    }
  }
  render() {
    const {getFieldDecorator}=this.props.form
    return (
      <div className='login'>
        <div className='login-header'>
          <img src={logo} alt="login"/>
          <h1>后台管理系统</h1>
        </div>
        <div className='login-comment'>
          <h1>用户登录</h1>
          <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
            {getFieldDecorator('username',{
              rules:[
                {required:true, whitespace:true,message:'用户名不能为空'},
                {min:4,message:'用户名最少为4位'},
                {max:12,message:'用户名不能超过12位'},
                {patttern:/^[a-zA-Z0-9_]+$/,message:'用户名必须包含字母数字或下划线'},
            ]
            })(
              <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />
            )}
            
        
        </Form.Item>
        <Form.Item>
        {getFieldDecorator('password',{
           initialValue:'',
           rules:[{validator:this.validator}]
        })(
              <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />
            )}
          
        </Form.Item>
        <Form.Item>
          
          <Button type="primary" htmlType="submit" className="login-form-button">提交</Button>
        
        </Form.Item>
      </Form>
        </div>
      </div>
      
    )
  }
}

const WrapperForm=Form.create()(Login)
export default WrapperForm

