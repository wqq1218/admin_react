import React, { Component } from 'react'
import { Card ,Button,Table,message,Modal,} from 'antd';
import LinkButton from '../../comonents/link-button/link-button'
import {reqRules,reqAddRole,reUpdateRole} from '../../api/index'
import {PAGE_SIZE} from '../../utils/constans'
import formateDate from '../../utils/dateUtil'
import AddForm from './add-form'
import AuthForm from './auth-form'
import memoryUtil from '../../utils/memoryUtil'

/**
 * 角色管理
 */
export default class Role extends Component {
   state={
     roles:[],
     visibleAdd: false,
     visibleAuth:false
   }

  setColumns=()=>{
    this.columns = [
      {
        title: '角色名称',
        dataIndex: 'name',
        
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        render:formateDate
      },
      {
        title: '授权时间',
        dataIndex: 'auth_time',
        render:formateDate
      },
      {
        title: '授权人',
        dataIndex: 'auth_name',
      },
      {
        title: '操作',
        render: (role ) => <LinkButton onClick={()=>this.showRole(role)}>设置权限</LinkButton>,
      },
    ];
  }
  
  getRoles=async()=>{
   const result=  await reqRules()
   if(result.status===0){
     message.success('获取角色列表成功')
     const roles=result.data
     this.setState({roles})
   }else{
     message.error('获取角色列表失败')
   }
  }

  showRole=(role)=>{
    this.role=role
    this.setState({
      visibleAuth:true
    })
  }
  

  

  handleCancel = () => {
    this.setState({
      visibleAdd: false,
      visibleAuth:false

    });
  };

  addRole= ()=>{
   
    this.form.validateFields(async (error,values)=>{
      if(!error){
        this.setState({
          visibleAdd: false,
          visibleAuth:false
        });
      const {roleName}=values
      const result= await reqAddRole(roleName)
      if(result.status===0){
        message.success('添加角色成功')
        this.getRoles()
      }else {
        message.error('添加角色失败')
      }
      }     
    })
  }
  updateRef=React.createRef()
  updateRole= async()=>{
    this.setState({
      visibleAuth:false
    })
    const role=this.role
    role.menus= this.updateRef.current.getMenus()
    console.log(this.updateRef.current.getMenus())
    role.auth_time=Date.now()
    role.auth_name=memoryUtil.user.username
    const result= await reUpdateRole(role)
    if(result.status===0){
      message.success('权限设置成功')
      this.getRoles()
    }else{
      message.error('权限设置失败')
    }

  }

  componentWillMount(){
    this.setColumns()
  }
  componentDidMount(){
    this.getRoles()
  }
  render() {
    const {roles,visibleAdd,visibleAuth}=this.state
    const title=(
      <Button type='primary' onClick={()=>this.setState({visibleAdd:true})}>创建角色</Button>  
      )      
    return ( 
      <div>
        <Card title={title}>
          <Table
              columns={this.columns}
              dataSource={roles}
              rowKey='_id'
              bordered
              pagination={{defaultPageSize:PAGE_SIZE,}}
              
          />,
        <Modal
          title="添加角色"
          visible={visibleAdd}
          onOk={this.addRole}
          onCancel={this.handleCancel}
        >
          <AddForm setForm={(form)=>this.form=form}></AddForm>
        </Modal>

        <Modal
          title="设置角色权限"
          visible={visibleAuth}
          onOk={this.updateRole}
          onCancel={this.handleCancel}
        >
          <AuthForm ref={this.updateRef} role={this.role}></AuthForm>
        </Modal>
        </Card>
      </div>
    )
  }
}
