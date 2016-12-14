/**
 * @desc 轮播配置模块
 * @author Jafeney <692270687@qq.com>
 * @dateTime 2016-12-23
 **/

import React, { Component } from 'react'
import Animation from '../../royal/Other/QueueAnimation/'
import Table from '../../royal/Views/Table/'
import Button from '../../royal/FormControls/Button/'
import Input from '../../royal/FormControls/Input/'
import Modal from '../../royal/Views/Modal/'
import PopUp from '../../royal/Views/PopUp/'
import { CAROUSEL } from '../../../database/columns'

import { parseURL } from '../../mixins/helper'

// redux
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getCarousel, addCarousel, updateCarousel, deleteCarousel } from '../../redux/actions/carousel'

class Carousel extends Component {

    constructor(props) {
        super(props)
        let _currentRow = null;
        props.carousel.map((item) => {
            _currentRow = item
        })
        this.state = {
            currentRow: _currentRow,
        }
    }

    handleAdd() {
        this.refs.c_img_new.setValue('')
        this.refs.c_link_new.setValue('')
        this.addModal.show()
    }

    handleAddSubmit() {
        let { actions, currentPage } = this.props;
        actions.addCarousel({
            body: {
                pid: currentPage.get('id'),
                img: this.refs.c_img_new.getValue(),
                link: parseURL(this.refs.c_link_new.getValue())
            },
            success: () => {
                this.pop.show()
                this.addModal.close()
                actions.getCarousel({ params: { pid: currentPage.get('id') }})
            },
            error: (message) => {
                window.alert(message)
            },
        })
    }

    handleEditSubmit() {
        let { actions, currentPage } = this.props;
        let { currentRow } = this.state;
        actions.updateCarousel({
            body: {
                id: currentRow.get('c_id'),
                img: this.refs.c_img.getValue(),
                link: parseURL(this.refs.c_link.getValue())
            },
            success: () => {
                this.pop.show()
                this.editModal.close()
                actions.getCarousel({ params: { pid: currentPage.get('id') }})
            },
            error: (message) => {
                window.alert(message)
            },
        })
    }

    handleDeleteSubmit() {
        let { actions, currentPage } = this.props;
        let { currentRow } = this.state;
        actions.deleteCarousel({
            body: {
                id: currentRow.get('c_id'),
            },
            success: () => {
                this.pop.show()
                this.delModal.close()
                actions.getCarousel({ params: {pid: currentPage.get('id')} })
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

    _renderRowCarousel(row, operates) {
        return (
            <tr>
                <td><img style={{height: '100px'}} src={row.get('c_img')} /></td>
                <td>{row.get('c_link')}</td>
                <td>
                    <a onClick={()=> operates._edit(row)} style={{textDecoration: 'none', color: '#98cf07'}}>编辑</a><br/>
                    <a onClick={()=> operates._delete(row)} style={{textDecoration: 'none', color: '#ed6767'}}>删除</a>
                </td>
            </tr>
        )
    }

    render() {
        let { carousel} = this.props;
        let { currentRow } = this.state;
        return (
            <li className="ry-active">
                <Animation speed={'zing'} name="fadeInLeft" style={{width: '100%', paddingTop: '10px'}}>
                    <Table dataSource={carousel.get('items')}
                        columns={CAROUSEL}
                        operates={{_edit: (row)=>this.handleEditRow(row), _delete: (row)=>this.handleDeleteRow(row)}}
                        renderRow={this._renderRowCarousel}
                    />
                    <p style={{marginTop: '15px'}}><Button text="添加轮播" icon="plus" callback={()=>this.handleAdd()} type="primary" style={{marginRight: 10}} /></p>
                </Animation>
                <Modal title={"编辑轮播信息"} style={{width: 600, height: 240}}
                    ref={(ref)=> this.editModal = ref}>
                    <p style={{fontSize:'14px', paddingTop: '10px', paddingLeft: '10px'}}>
                        <Input name="图片地址" ref="c_img" placeholder="输入轮播图片的网络地址" style={{width: '460px'}} value={currentRow.get('c_img')} wrapStyle={{marginBottom: '10px', display: 'block'}}/>
                        <Input name="图片链接" ref="c_link" placeholder="输入轮播图片的超链接地址" style={{width: '460px'}} value={currentRow.get('c_link')} wrapStyle={{marginBottom: '10px', display: 'block'}}/>
                    </p>
                    <p className="footer">
                        <Button text="确定" callback={()=>this.handleEditSubmit()} type="primary" style={{marginRight: 10}} />
                        <Button text="取消" callback={()=>this.editModal.close()} type="ghost" />
                    </p>
                </Modal>
                <Modal title={"添加轮播"} style={{width: 600, height: 240}}
                    ref={(ref)=> this.addModal = ref}>
                    <p style={{fontSize:'14px', paddingTop: '10px', paddingLeft: '10px'}}>
                        <Input name="图片地址" ref="c_img_new" placeholder="输入轮播图片的网络地址" style={{width: '460px'}} wrapStyle={{marginBottom: '10px', display: 'block'}}/>
                        <Input name="图片链接" ref="c_link_new" placeholder="输入轮播图片的超链接地址" style={{width: '460px'}} wrapStyle={{marginBottom: '10px', display: 'block'}}/>
                    </p>
                    <p className="footer">
                        <Button text="确定" callback={()=>this.handleAddSubmit()} type="primary" style={{marginRight: 10}} />
                        <Button text="取消" callback={()=>this.addModal.close()} type="ghost" />
                    </p>
                </Modal>
                <Modal title={"删除提示"} style={{width: 420, height: 200}}
                    ref={(ref)=> this.delModal = ref}>
                    <p style={{fontSize:'14px'}}>{ '你确定要删除该轮播吗？' }</p>
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
        currentPage: state.currentPage,
        carousel: state.carousel,
    }
}

function mapDispatchToProps(dispatch) {
    return { actions: bindActionCreators({ getCarousel, addCarousel, updateCarousel, deleteCarousel  }, dispatch) }
}

export default connect(mapStateToProps, mapDispatchToProps)(Carousel)
