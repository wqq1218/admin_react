import ajax from './ajax'
import {message} from 'antd'
const BASE=''
export default function reqLogin(username,password){
 return  ajax({
        method:'post',
        url:BASE+'/login',
        data:{
            username,
            password
        }
    })
}

const username='admin'
const password='admin'
reqLogin(username,password).then((result)=>{
    message.success('请求成功',result)
    console.log(result)
},(err)=>{
     
})