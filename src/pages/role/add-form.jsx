import React, { Component } from 'react'
import {Form, Input,} from 'antd'

class AddForm extends Component {
    componentWillMount(){
        this.props.setForm(this.props.form)
    }
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Form labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
            <Form.Item label="角色名称">
              {getFieldDecorator('roleName', {
                initialValue:'',
                rules: [{ required: true, message: '角色名称为必填项!' }],
              })(<Input  placeholder='请输入角色名称'/>)}
            </Form.Item> 
            </Form>
        )
    }
}
export default AddForm=Form.create()(AddForm)