import React, { Component } from 'react'
import './index.less'
import { Menu, Icon } from 'antd';
import {Link,withRouter} from 'react-router-dom'
import Logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig'

const { SubMenu } = Menu;

class LeftNav extends Component {
    getMenuNodes = (menuList) => {
        const path=this.props.location.pathname
        return menuList.reduce((pre, item) => {
          if (!item.children) {
            pre.push((
              <Menu.Item key={item.key}>
                <Link to={item.key}>
                  <Icon type={item.icon}/>
                  <span>{item.title}</span>
                </Link>
              </Menu.Item>
            ))
          } else {
            pre.push((
              <SubMenu
                key={item.key}
                title={
                  <span>
                    <Icon type={item.icon}/>
                    <span>{item.title}</span>
                  </span>
                }
              >
                {this.getMenuNodes(item.children)}
              </SubMenu>
            ))
           if(item.children.find(item=> path.indexOf(item.key)===0)){
              this.openKey=item.key
           }
          }
          return pre
        }, [])
      }
    
    componentWillMount(){
      this.getMenuNodes=this.getMenuNodes(menuList)
    }
    render() {
       
       const selectKey=this.props.location.pathname
        return (
            <div className='left-nav'>
                <Link className='link' to="/home">
                   <img src={Logo} alt="logo"/>
                   <h2>后台管理</h2>
                </Link>
                <Menu
                    mode="inline"
                    theme="dark"
                    selectedKeys={[selectKey]}
                    defaultOpenKeys={[this.openKey]}
                    >
                    {
                    this.getMenuNodes
                    }
                </Menu>

               
            </div>
        )
    }
}

export default withRouter(LeftNav)
