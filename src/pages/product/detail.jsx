import React, { Component } from 'react'
import LinkButton from '../../comonents/link-button/link-button'
import {Card,Icon,List} from 'antd'
import memoryUtil from '../../utils/memoryUtil'
import {BASE_IMG} from '../../utils/constans'
import {reqCategory} from '../../api/index'
import {Redirect} from 'react-router-dom'
export default class ProductDetail extends Component {
    state={
        categoryName:''
    }
    getCategory= async (categoryId)=>{
        const result= await reqCategory(categoryId)
        if(result.status===0){
         const categoryId=result.data.name
            this.setState({categoryName:categoryId})
        }
    }
    
    componentDidMount(){
        const product=memoryUtil.product
        const categoryId=product.categoryId
        if(!product){
            this.getCategory(categoryId)
        }       
    }
    
    render() {
        const product=memoryUtil.product
        if(!product||!product._id){
            return <Redirect to='./product'/>
        }
    const title=(
    <span>
        <LinkButton>
          <Icon type='arrow-left' onClick={()=>{this.props.history.goBack()}}/> 
        </LinkButton> 
        <span>商品详情</span>
    </span>
)        
        const {categoryName}=this.state
        return (
            <Card title={title}>
                   <List className='detail'>
                    <List.Item>
                        <span className='detail-left'>商品名称:</span>
                        <span>{product.name}</span>
                    </List.Item>
                    <List.Item>
                        <span className='detail-left'>商品描述:</span>
                        <span>{product.desc}</span>
                    </List.Item>  
                    <List.Item>
                        <span className='detail-left'>商品价格:</span>
                        <span>{product.price}</span>
                    </List.Item>  
                    <List.Item>
                        <span className='detail-left'>商品分类:</span>
                        <span>{categoryName}</span>
                    </List.Item> 
                    <List.Item>
                        <span className='detail-left'>商品图片:</span>
                        <span>
                            {product.imgs.map((img)=>
                              <img className='detail-img' key={img} src={BASE_IMG+img} alt='img'></img>
                            )}
                        </span>
                    </List.Item>  
                    <List.Item>
                        <span className='detail-left'>商品详情:</span>
                        <div dangerouslySetInnerHTML={{__html:product.detail}}></div>
                    </List.Item>       
                </List> 
            </Card>
        )
    }
}
