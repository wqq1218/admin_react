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

export  const reqRules=()=>ajax('/manage/role/list')

export const reqAddRole=(roleName)=>ajax.post('/manage/role/add',{roleName})

export const reUpdateRole=(role)=>ajax.post('/manage/role/update',role)