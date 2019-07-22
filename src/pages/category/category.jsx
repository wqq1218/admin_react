import React, { Component } from 'react'
import { Card, Button, Icon, Table, message ,Modal} from 'antd';
import LinkButton from '../../comonents/link-button/link-button'
import { reqCategorys,reqAddCategorys,reqUpdateCategorys } from '../../api'
import AddUpdataFrom from './categoryForm'

/**
 * 分类管理
 */
export default class Category extends Component {
  
  state = {
    isloading: true,
    categorys: [],
    showStatus: 0,
  }


  handleOk =() => {
   
    this.form.resetFields( )
    
    let result
    this.form.validateFields(async(err,values)=>{
      
      if(!err){
        const { categoryName } = values
        let categoryId=this.category._id
        const {showStatus}=this.state
        if(showStatus===1){
          
          result = await reqAddCategorys(categoryName)
        }else{
          result = await reqUpdateCategorys({ categoryId, categoryName })
        }
        this.setState({showStatus: 0,})
        this.form.resetFields()
        if(result.status===0){
          this.getCategorys()
          message.success((showStatus===2 ?"修改":"添加" ) + "成功")
        }else{
          message.error('添加失败')
        }
      }
    })
   
  }
  
  handleCancel = ( ) => {
    this.form.resetFields( )
    this.setState({
      showStatus:0,
    });
  };

  getCategorys = async () => {
    const result = await reqCategorys()
    this.setState({isloading:false})
    if (result.status === 0) {
      const categorys = result.data
      this.setState({categorys})
    }else{
      message.error('获取分类列表失败')
    }
  }
  
  initColumns = () => {
    this.columns = [
      {
        title: '名称',
        dataIndex: 'name',
      },
      {
        title: '修改',
        width: 400,
        render: (category) => <LinkButton onClick={( )=>{this.setState({showStatus:2}); this.category=category}}>修改</LinkButton>,
      },
    ];
  }
  componentWillMount() {
    this.initColumns()
  }
  componentDidMount() {
    this.getCategorys()
  }


  render() {
    const extra = (
      <Button type="primary" onClick={()=>{this.setState({showStatus:1});this.category= null }}>
        <Icon type='plus' />
        添加
        </Button>
    )
    const category=this.category || {}
    const { categorys,isloading,showStatus } = this.state
    return (
      <Card title="品类管理" extra={extra}>
        <Table
          columns={this.columns}
          rowKey="_id"
          dataSource={categorys}
          loading={isloading}
          bordered={true}
          pagination={{ defaultPageSize: 6, showQuickJumper: true }}
        />,
        <Modal
          title={showStatus===1?"添加数据":'修改成功'}
          visible={showStatus}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <AddUpdataFrom setForm={form => this.form = form} categoryName={category.name}/>
        </Modal>
      </Card>
    )
  }
}


