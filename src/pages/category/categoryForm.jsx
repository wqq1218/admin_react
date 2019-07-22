import React, { Component } from 'react'
import {Form,Input} from 'antd'

 class CategoryForm extends Component {
     componentWillMount(){

         this.props.setForm(this.props.form)
     }
    render() {
        const {categoryName}=this.props
        const {getFieldDecorator}=this.props.form
        return (
            <Form>
            <Form.Item>
                {getFieldDecorator('categoryName',{
                  initialValue:categoryName || '',
                  rules:[
                    {required:true, whitespace:true,message:'内容不能为空'},
                    
                ]
                })(
                  <Input
                  placeholder="请输入要添加的数据"
                />
                )}
                           
            </Form.Item>
          </Form>
        )
    }
}

const addUpdataFrom=Form.create()(CategoryForm)
export default addUpdataFrom