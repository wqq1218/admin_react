import React, { Component } from 'react'
import {Form,Input} from 'antd'

 class CategoryForm extends Component {
     componentWillMount(){

         this.props.setForm(this.props.form)
     }
    render() {
       
        const {getFieldDecorator}=this.props.form
        return (
            <Form>
            <Form.Item>
                {getFieldDecorator('productName',{
                  
                  rules:[
                    {required:true, whitespace:true,message:'内容不能为空'},
                    
                ]
                })(
                  <Input
                  placeholder="商品名称"
                />
                )}
                           
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('productDesc',{
                  
                  rules:[
                    {required:true, whitespace:true,message:'内容不能为空'},
                    
                ]
                })(
                  <Input
                  placeholder="商品描述"
                />
                )}
                           
            </Form.Item>
            <Form.Item>
                {getFieldDecorator('productPrice',{
                  
                  rules:[
                    {required:true, whitespace:true,message:'内容不能为空'},
                    
                ]
                })(
                  <Input
                  placeholder="商品价格"
                />
                )}
                           
            </Form.Item>
          </Form>
        )
    }
}

const addUpdataFrom=Form.create()(CategoryForm)
export default addUpdataFrom