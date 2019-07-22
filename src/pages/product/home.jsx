import React, { Component } from 'react'
import { Card, Button, Icon, Table, Select, Input, message } from 'antd';
import { reqProducts, reqProductSearch,reqUpdateStatus } from '../../api'
import LinkButton from '../../comonents/link-button/link-button'
import {PAGE_SIZE} from '../../utils/constans.js'
import memoryUtil from '../../utils/memoryUtil'
import throttle from 'lodash.throttle'

export default class ProductHome extends Component {
    state = {
        isloading: true,
        products: [],
        total: 0,
        searchName:'',
        searchType:'productName'
    }

    getProducts = async (pageNum) => {
        this.pageNum=pageNum
        const {searchName,searchType}=this.state
        let result
        if(this.isSearch){
            result =await reqProductSearch({pageNum,pageSize:PAGE_SIZE,searchName,searchType})
        }else{
            result = await reqProducts(pageNum, PAGE_SIZE)
        }
        this.setState({ isloading: false })
        if (result.status === 0) {
            const { total, list } = result.data
            this.setState({
                products: list,
                total
            })
        } else {
            message.error('获取分类列表失败')
        }
    }
    updateStatus= throttle(async (_id,status)=>{
        status=status===1? 2:1
        const result= await reqUpdateStatus(_id,status)
        if(result.status===0){
            message.success('更新商品成功')
            this.getProducts(this.pageNum )
        }
       },2000)
    initColumns = () => {
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'desc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                render: (price) => '￥' + price
            },
            {
                title: '状态',
                render: ({_id,status}) => {
                    let btnText = '下架'
                    let text = '在售'
                    if (status === 2) {
                        btnText = '上架'
                        text = '售空'
                    }
                    return <span>
                        <Button type="primary" onClick={()=>{this.updateStatus(_id,status)}}>{btnText}</Button>
                        <br/>
                        <span>{text}</span>
                    </span>
                }
            },
            {
                title: '操作',
                render: (product) => (
                    <span>
                        <LinkButton onClick={()=>{
                            memoryUtil.product=product
                            this.props.history.push('/product/detail')
                        }}>详情</LinkButton>
                        <LinkButton onClick={()=>{
                            memoryUtil.product=product
                            this.props.history.push('/product/addupdate')
                        }}
                        >修改</LinkButton>
                    </span>

                )
            },
        ];
    }
    

    componentWillMount() {
        this.initColumns()
    }
    componentDidMount() {
        this.getProducts(1)
    }
    render() {
        const {searchType}=this.state
        const title = (
            <span>
                <Select value={searchType} style={{ width: 200 }} onChange={(value)=>this.setState({searchType:value})}>
                    <Select.Option value='productName'>按名称搜索</Select.Option>
                    <Select.Option value='productDesc'>按描述搜索</Select.Option>
                </Select>
                <Input style={{ width: 200, margin: "0 10px" }} placeholder='输入关键字' 
                onChange={(event)=>this.setState({searchName:event.target.value})}/>
                <Button type="primary" onClick={()=>{
                    this.isSearch=true
                    this.getProducts(1)}
            }>搜索</Button>
            </span>
        )
        const extra = (
            <Button type="primary" onClick={()=>{
                this.props.history.push('/product/addupdate')
                memoryUtil.product={}
            }
            }>
                <Icon type='plus' />
                添加商品
            </Button>
        )

        const { isloading, products, total} = this.state
        return (
            <Card title={title} extra={extra}>
                <Table
                    columns={this.columns}
                    rowKey='_id'
                    dataSource={products}
                    loading={isloading}
                    bordered={true}
                    pagination={{
                        total,
                        defaultPageSize: PAGE_SIZE, showQuickJumper: true,
                        onChange: this.getProducts,
                        current:this.pageNum
                    }}
                />,
            </Card>
        )
    }
}
