import React, { Component } from 'react'
import LinkButton from '../../comonents/link-button/link-button'
import {Card,Icon, Form, Select, Input, Button} from 'antd'
import memoryUtil from '../../utils/memoryUtil'
import {reqCategorys} from '../../api'
import PicturesWall from './PicturesWall'


const { Option } = Select;

class ProductAddUpdate extends Component {

    state={
        categorys:[]
    }

    handleSubmit=(event)=>{
      event.preventDefault()
      this.props.form.validateFields((err,values)=>{
         if(!err){
           //const {name,desc,price,categoryId}=values
         }
      })
    }

    getCategorys= async ()=>{
        const result= await reqCategorys()
        if(result.status===0){
         const categorys=result.data
            this.setState({categorys})
        }
    }
    validatorPrice=(rule,value,callback)=>{
       if(value===''){
         callback('')
       }else if(value*1<=0){
         callback('价格不能为负')
       }else{
         callback()
       }
    }
    componentWillMount(){
    const  product=memoryUtil.product
    this.isUpdate=!!product._id
    }
    componentDidMount(){
     
     this.getCategorys()  
        
    }
    render() {
        const product = memoryUtil.product
        const {categorys}=this.state
        const  {getFieldDecorator}=this.props.form
        const title=(
            <span>
                <LinkButton>
                  <Icon type='arrow-left' onClick={()=>{this.props.history.goBack()}}/> 
                </LinkButton> 
                <span>{this.isUpdate?'修改商品':"添加商品"}</span>
            </span>)
        return (
            <Card title={title}>
                <Form labelCol={{ span: 2 }} wrapperCol={{ span:7 }} onSubmit={this.handleSubmit}>
       
       
        <Form.Item label="商品名称">
          {getFieldDecorator('name', {
            initialValue:product.name,
            rules: [{ required: true, message: '商品名称为必填项!' }],
          })(<Input placeholder='商品名称' />)}
        </Form.Item>
        <Form.Item label="商品描述">
          {getFieldDecorator('desc', {
              initialValue:product.desc,
            rules: [{ required: true, message: '商品描述为必填项!' }],
          })(<Input placeholder='商品描述'/>)}
        </Form.Item>
        <Form.Item label="商品价格">
          {getFieldDecorator('price', {
              initialValue:product.price,
            rules: [
              { required: true, message: '商品价格为必填项!' },
               {validator:this.validatorPrice}
          ],
          })(<Input placeholder='商品价格' addonAfter='元'/>)}
        </Form.Item>

        <Form.Item label="商品分类">
          {getFieldDecorator('categoryId', {
               initialValue:product.categoryId ||'',
            rules: [{ required: true, message: '商品分类为必填项!' }],
          })(
            <Select placeholder="商品分类" >
              <Option value="">未选择</Option>
              {
                  categorys.map((cl)=><Option key={cl._id} value={cl._id}>{cl.name}</Option>)
            }
            </Select>,
          )}
        </Form.Item>
        <Form.Item label="商品图片">
           <PicturesWall/> 
        </Form.Item>
      
        <Form.Item >
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </Form>
            </Card>
        )
    }
}

export default Form.create()(ProductAddUpdate)