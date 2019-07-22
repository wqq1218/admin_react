import React, { Component } from 'react'
import {Redirect,Route,Switch} from 'react-router-dom'
import memoryUtil from '../../utils/memoryUtil'
import { Layout } from 'antd';
import LeftNav from '../../comonents/left-nav'
import Header from '../../comonents/header'
import Home from '../home/home'
import Category from '../category/category'
import Product from '../product/product'
import Role from '../role/role'
import User from '../user/user'
import Bar from '../charts/bar'
import Line from '../charts/line'
import Pie from '../charts/pie'


const { Footer, Sider, Content } = Layout;

export default class Admin extends Component {
    
    render() {

        const user=memoryUtil.user
        if(!user._id){
            return <Redirect to='./login'/>
        }
        return (
        <Layout style={{height:'100%'}}>
            <Sider><LeftNav/></Sider>
            <Layout>
                <Header/>
                <Content style={{backgroundColor:'white',margin:'20px'}}>
                    <Switch>
                        <Route path='/home' component={Home}/>
                        <Route path='/category' component={Category}/>
                        <Route path='/product' component={Product}/>
                        <Route path='/role' component={Role}/>
                        <Route path='/user' component={User}/>
                        <Route path='/charts/bar' component={Bar}/>
                        <Route path='/charts/line' component={Line}/>
                        <Route path='/charts/pie' component={Pie}/>
                        <Redirect to='/home' />
                    </Switch> 
                </Content>
                <Footer style={{textAlign:'center'}}>推荐使用谷歌浏览器，可以得到最佳使用效果</Footer>
            </Layout>
        </Layout>
        )
    }
}


