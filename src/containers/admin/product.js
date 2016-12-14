/**
 * @desc 用户模块
 * @author Jafeney <692270687@qq.com>
 * @dateTime 2016-11-23
 **/

import React, { Component } from 'react'
import Animation from '../../royal/Other/QueueAnimation/'
import Icon from '../../royal/Basic/Icon/'
import Table from '../../royal/Views/Table/'
import Pagination from '../../royal/Navigation/Pagination/'
import Button from '../../royal/FormControls/Button/'
import Input from '../../royal/FormControls/Input/'
import Modal from '../../royal/Views/Modal/'
import PopUp from '../../royal/Views/PopUp/'
import { PRODUCTS } from '../../../database/columns'

// redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { limitStringlength, parseURL } from '../../mixins/helper'
import { getProduct, addProduct, updateProduct, deleteProduct } from '../../redux/actions/product'

class Product extends Component {

    constructor(props) {
        super(props)
        let _currentRow = null;
        props.product.map((item) => {
            _currentRow = item
        })
        this.state = {
            currentRow: _currentRow,
            dataSource: props.product.get('items').slice(0,4),
        }
        this.page = 1;
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps !== this.props) {
            let _start = (this.page-1)*4, _end = this.page*4;
            this.setState({
                dataSource: nextProps.product.get('items').slice(_start, _end)
            })
        }
    }

    handleChangePage(page) {
        this.page = page;
        let _start = (this.page-1)*4, _end = this.page*4;
        this.setState({
            dataSource: this.props.product.get('items').slice(_start, _end)
        })
    }

    handleAdd() {
        this.refs.pt_img_new.setValue('')
        this.refs.pt_link_new.setValue('')
        this.refs.pt_name_new.setValue('')
        this.refs.pt_price_new.setValue('')
        this.addModal.show()
    }

    handleAddSubmit() {
        let { actions, currentPage } = this.props;
        actions.addProduct({
            body: {
                pid: currentPage.get('id'),
                img: this.refs.pt_img_new.getValue(),
                link: parseURL(this.refs.pt_link_new.getValue()),
                name: this.refs.pt_name_new.getValue(),
                price: this.refs.pt_price_new.getValue(),
            },
            success: () => {
                this.pop.show()
                this.addModal.close()
                actions.getProduct({ params: { pid: currentPage.get('id') }})
            },
            error: (message) => {
                window.alert(message)
            },
        })
    }

    handleEditSubmit() {
        let { actions, currentPage } = this.props;
        let { currentRow } = this.state;
        actions.updateProduct({
            body: {
                id: currentRow.get('pt_id'),
                img: this.refs.pt_img.getValue(),
                link: parseURL(this.refs.pt_link.getValue()),
                name: this.refs.pt_name.getValue(),
                price: this.refs.pt_price.getValue(),
            },
            success: () => {
                this.pop.show()
                this.editModal.close()
                actions.getProduct({ params: { pid: currentPage.get('id') }})
            },
            error: (message) => {
                window.alert(message)
            },
        })
    }

    handleDeleteSubmit() {
        let { actions, currentPage } = this.props;
        let { currentRow } = this.state;
        actions.deleteProduct({
            body: {
                id: currentRow.get('pt_id'),
            },
            success: () => {
                this.pop.show()
                this.delModal.close()
                actions.getProduct({ params: {pid: currentPage.get('id')} })
            }
        })
    }

    handleEditRow(row) {
        this.setState({
            currentRow: row,
        }, ()=>{
            this.editModal.show()
        })
    }

    handleDeleteRow(row) {
        this.setState({
            currentRow: row,
        }, ()=>{
            this.delModal.show()
        })
    }

    _renderRowProduct(row, operates) {
        return (
            <tr>
                <td><img style={{height: '100px'}} src={row.get('pt_img')} /></td>
                <td>{limitStringlength(row.get('pt_link'), 50)}</td>
                <td>{row.get('pt_name')}</td>
                <td>¥{row.get('pt_price')}</td>
                <td>
                    <a onClick={()=> operates._edit(row)} style={{textDecoration: 'none', color: '#98cf07'}}>编辑</a><br/>
                    <a onClick={()=> operates._delete(row)} style={{textDecoration: 'none', color: '#ed6767'}}>删除</a>
                </td>
            </tr>
        )
    }

    render() {
        let { product } = this.props;
        let { currentRow } = this.state;
        return (
            <li className="ry-active">
                <Animation speed={'zing'} name="fadeInLeft" style={{width: '100%', paddingTop: '10px'}}>
                    <Table dataSource={this.state.dataSource}
                        columns={PRODUCTS} renderRow={this._renderRowProduct}
                        operates={{_edit: (row)=>this.handleEditRow(row), _delete: (row)=>this.handleDeleteRow(row)}}
                    />
                    <Button wrapStyle={{float: 'left', marginTop: '15px'}} text="添加产品" icon="plus" callback={()=>this.handleAdd()} type="primary" style={{marginRight: 10}} />
                    <Pagination totalPage={Math.ceil(product.get('items').size/4)} selectPage={(page)=>this.handleChangePage(page) } pageSpace={3}/>
                </Animation>
                <Modal title={"添加产品"} style={{width: 600, height: 320}}
                    ref={(ref)=> this.addModal = ref}>
                    <p style={{fontSize:'14px', paddingTop: '10px', paddingLeft: '10px'}}>
                        <Input name="产品图片" ref="pt_img_new" placeholder="输入产品图片的网络地址" style={{width: '460px'}} wrapStyle={{marginBottom: '10px', display: 'block'}}/>
                        <Input name="产品链接" ref="pt_link_new" placeholder="输入产品的超链接地址" style={{width: '460px'}} wrapStyle={{marginBottom: '10px', display: 'block'}}/>
                        <Input name="产品名称" ref="pt_name_new" placeholder="输入产品的名称" style={{width: '460px'}} wrapStyle={{marginBottom: '10px', display: 'block'}}/>
                        <Input name="产品价格" ref="pt_price_new" placeholder="输入产品的价格" style={{width: '460px'}} wrapStyle={{marginBottom: '10px', display: 'block'}}/>
                    </p>
                    <p className="footer">
                        <Button text="确定" callback={()=>this.handleAddSubmit()} type="primary" style={{marginRight: 10}} />
                        <Button text="取消" callback={()=>this.addModal.close()} type="ghost" />
                    </p>
                </Modal>
                <Modal title={"编辑产品信息"} style={{width: 600, height: 320}}
                    ref={(ref)=> this.editModal = ref}>
                    <p style={{fontSize:'14px', paddingTop: '10px', paddingLeft: '10px'}}>
                        <Input name="产品图片" ref="pt_img" placeholder="输入产品图片的网络地址" style={{width: '460px'}} value={currentRow.get('pt_img')} wrapStyle={{marginBottom: '10px', display: 'block'}}/>
                        <Input name="产品链接" ref="pt_link" placeholder="输入产品的超链接地址" style={{width: '460px'}} value={currentRow.get('pt_link')} wrapStyle={{marginBottom: '10px', display: 'block'}}/>
                        <Input name="产品名称" ref="pt_name" placeholder="输入产品的名称" style={{width: '460px'}} value={currentRow.get('pt_name')} wrapStyle={{marginBottom: '10px', display: 'block'}}/>
                        <Input name="产品价格" ref="pt_price" placeholder="输入产品的价格" style={{width: '460px'}} value={currentRow.get('pt_price')} wrapStyle={{marginBottom: '10px', display: 'block'}}/>
                    </p>
                    <p className="footer">
                        <Button text="确定" callback={()=>this.handleEditSubmit()} type="primary" style={{marginRight: 10}} />
                        <Button text="取消" callback={()=>this.editModal.close()} type="ghost" />
                    </p>
                </Modal>
                <Modal title={"删除提示"} style={{width: 420, height: 200}}
                    ref={(ref)=> this.delModal = ref}>
                    <p style={{fontSize:'14px'}}>{ '你确定要删除该产品吗？' }</p>
                    <p className="footer">
                        <Button text="确定" callback={()=>this.handleDeleteSubmit()} type="primary" style={{marginRight: 10}} />
                        <Button text="取消" callback={()=>this.delModal.close()} type="ghost" />
                    </p>
                </Modal>
                <PopUp ref={(ref)=>this.pop = ref} />
            </li>
        )
    }
}

function mapStateToProps(state, ownProps) {
    return {
        product: state.product,
        currentPage: state.currentPage,
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({ getProduct, addProduct, updateProduct, deleteProduct }, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product)
