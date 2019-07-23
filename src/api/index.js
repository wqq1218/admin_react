import ajax from './ajax'
import {message} from 'antd'
import jsonp from 'jsonp'

const BASE=''
export  function reqLogin(username,password){
 return  ajax({
        method:'post',
        url:BASE+'/login',
        data:{
            username,
            password
        }
    })
}

// const username='admin'
// const password='admin'
// reqLogin(username,password).then((result)=>{
//     message.success('请求成功',result)
//     console.log(result)
// },(err)=>{
     
// })
export function reqWeather(city){
    return new Promise((resolve,reject)=>{
        
        const url=`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
        jsonp(url,{},(error,data)=>{
           if(!error&& data.error===0){
              const {dayPictureUrl,weather}=data.results[0].weather_data[0]
              resolve({dayPictureUrl,weather})
           }else{
              message.error('请求失败')
           }
        }) 
    }) 
}

export function reqCategorys () {
   return ajax('/manage/category/list')
}

export function reqAddCategorys(categoryName){
  return  ajax.post(BASE + '/manage/category/add', {
    categoryName
  })
}

export function reqUpdateCategorys({categoryId, categoryName}){
    return ajax.post(BASE + '/manage/category/update', {categoryId, categoryName})
}
 
export const reqCategory=(categoryId)=>(ajax('/manage/category/info',{
    params:{
        categoryId}}))

export function reqProducts (pageNum,pageSize) {
    return ajax('/manage/product/list',{params:{ pageNum,pageSize}})
 }
export const reqProductSearch=({pageNum,pageSize,searchName,searchType})=>ajax('/manage/product/search',{
    params:{
        pageNum,
        pageSize,
        [searchType]:searchName
    }
})

export const reqUpdateStatus=(productId,status)=>(ajax('/manage/product/updateStatus',{
    method:'POST',
    data:{
        productId,
        status
    }
}))

export const reqDeleteImg=(name)=>ajax.post('/manage/img/delete',{name})

export const reqAddUpdateProduct = (product) => ajax.post(
    BASE + '/manage/product/' + (product._id ? 'update' : 'add'), 
    product
)
// 获取所有角色的列表
export const reqRoles = () => ajax(BASE + '/manage/role/list')
// 添加角色
export const reqAddRole = (roleName) => ajax.post(BASE + '/manage/role/add', {
  roleName
})
// 更新角色
export const reqUpdateRole = (role) => ajax.post(BASE + '/manage/role/update', role)

// 获取所有用户的列表
export const reqUsers = () => ajax(BASE + '/manage/user/list')
// 删除指定用户
export const reqDeleteUser = (userId) => ajax.post(BASE + '/manage/user/delete', {
  userId
})
// 添加/更新用户
export const reqAddOrUpdateUser = (user) => ajax.post(BASE + '/manage/user/' + (user._id ? 'update' : 'add'), user)
  