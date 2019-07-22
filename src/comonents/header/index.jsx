import React, { Component } from 'react'
import {withRouter} from 'react-router-dom'
import {Modal} from 'antd';
import menuList from '../../config/menuConfig'

import {reqWeather} from '../../api'
import './index.less'
import LinkButton from '../link-button/link-button'
import  memoryUtil  from  '../../utils/memoryUtil'
import storageUtil from '../../utils/storageUtil'
import formateDate from '../../utils/dateUtil'


 class Header extends Component {
     state={
        currentTime: Date.now(),
        dayPictureUrl:'',
        weather:''
     }

        backClick=()=>{
        Modal.confirm({
            title: '确定要退出吗?',
              onOk:()=>{
              console.log('OK');
              storageUtil.removeUser()
              memoryUtil.user=''
              this.props.history.replace('/login')
            },
            onCancel() {
              console.log('Cancel');
            },
          });
        }

        getTitle=(path)=>{
            let title=''
            menuList.find((item)=>{
                if(item.key===path){
                    title=item.title
                }else if(item.children){
                    item.children.find((citem)=>{
                        if( path.indexOf(citem.key)===0){
                            title=citem.title
                        }
                 
                    })
                }

            })
            return title
        }
  
        getTime=()=>{
           const currentTime=Date.now()
           return formateDate(currentTime)
        }
        componentDidMount(){
            this.timeId=setInterval(() => {
                this.setState({
                    currentTime: formateDate(Date.now())
                })
            }, 1000);
            this.getWeather()
        }
        componentWillUnmount(){
            clearInterval(this.timeId)
        }
       getWeather= async()=>{
        const {dayPictureUrl,weather}=  await reqWeather('北京')
        this.setState({dayPictureUrl,weather})   
       }
      

    render() {
        const path=this.props.location.pathname
        const user=memoryUtil.user.username
        const {currentTime,dayPictureUrl,weather} =this.state
        return (
            
            <div className='header'>
                <div className='header-top'>
                    <span>欢迎, {user}</span>
                    <LinkButton onClick={this.backClick}>退出</LinkButton>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>{this.getTitle(path)}</div>
                    <div className='header-bottom-right'>
                        <span>{currentTime}</span> &nbsp;&nbsp;
                        <img src={dayPictureUrl} alt="weather"/>&nbsp;&nbsp;
                        <span>{weather}</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Header)