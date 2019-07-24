import React, { Component } from 'react'
import {Form, Input,Tree } from 'antd'
import menuList from '../../config/menuConfig'

const { TreeNode } = Tree

export default class AuthForm extends Component {
    state = {
        
        checkedKeys: []
        
      };
    
   
       

      onCheck = checkedKeys => {
        
        this.setState({ checkedKeys });
      };
    
      getMenus=()=>this.state.checkedKeys

      
      renderTreeNodes = menuList =>{
       return menuList.reduce((pre,item) => {
           pre.push(<TreeNode title={item.title} key={item.key}>
            {item.children ? this.renderTreeNodes(item.children) : null}
              </TreeNode>)
          
          return pre
        },[])
    }
    
    componentWillMount(){
        this.treeNodes=this.renderTreeNodes(menuList)

        const menus=this.props.role.menus
        this.setState(
            {checkedKeys:menus}
        )
    }
    
    componentWillReceiveProps(nextProps){
       const menus=nextProps.role.menus
       this.setState({
           checkedKeys:menus
       })
    }

    render() {
        const role=this.props.role

        return (
           <div>
                <Form labelCol={{ span: 4 }} wrapperCol={{ span: 16 }}>
                <Form.Item label="角色名称"> 
                 <Input value={role.name} disabled/>
                </Form.Item> 
               </Form>
               <Tree
                checkable
                defaultExpandAll
                onCheck={this.onCheck}
                checkedKeys={this.state.checkedKeys}
                 >
                <TreeNode title='平台权限' key='all'> 
                   {this.treeNodes}
                </TreeNode>    
               
      </Tree>
           </div>
        )
    }
}
