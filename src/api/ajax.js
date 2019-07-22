import axios from 'axios'
import qs from 'qs'
import {message} from 'antd'
axios.interceptors.request.use((config)=>{
    const {method,data}=config
        if(method.toLocaleLowerCase()==='post'&& typeof data==='object'){
        config.data=qs.stringify(data)
       
      }
    return config
})

axios.interceptors.response.use((response)=>{
       return response.data
},(error)=>{
    message.error('请求失败')
      return new Promise(()=>{})
})

export default axios