/**
 * @type Navigation Component
 * @desc 分页
 * @author Jafeney
 * @dateTime 2016-07-07
 **/

import React, { Component, PropTypes } from 'react'
import Icon from '../../Basic/Icon/'
import './style.less'

class Pagination extends Component {

    static propTypes = {
        totalPage : PropTypes.number.isRequired,
        selectPage : PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props)
        this.state = {
            current: 1
        }
    }

    _renderPaginate(current) {
        var totalPage = this.props.totalPage;
        var pageSpace = this.props.pageSpace || 2;
        var showUnit = pageSpace + 5;
        var pageArr = [];
        var pageCont = [];

        if (totalPage <= showUnit) {
            for (var p=1;p<=totalPage;p++) {
                pageArr.push({
                    page : p,
                    currentPage : (p === current)
                });
            };
        } else {
            if (current < 4) {
                for (var p=1;p<=showUnit-1;p++) {
                    pageArr.push({
                        page : p,
                        currentPage : (p === current)
                    });
                };
                pageArr.push({
                    page : '...',
                    dot : true,
                    currentPage : false
                });
                pageArr.push({
                    page : totalPage,
                    currentPage : false
                });
            } else {
                if ((current - 3) <= 1) {
                    for (var i=1; i<=current;i++) {
                        pageArr.push({
                            page : i,
                            currentPage : (i === current)
                        });
                    };
                } else {
                    pageArr.push({
                        page : 1,
                        currentPage : false
                    });
                    pageArr.push({
                        page : '...',
                        dot : true,
                        currentPage : false
                    });
                    if ((totalPage - current) >= 3) {
                        for (var j=(current-pageSpace); j <= current;j++) {
                            pageArr.push({
                                page : j,
                                currentPage : (j === current)
                            });
                        }
                    } else {
                        for (var j=(current-(5-(totalPage-current))); j <= current;j++) {
                            pageArr.push({
                                page : j,
                                currentPage : (j === current)
                            });
                        }
                    }
                };
                if ((current + 3) >= totalPage) {
                    for (var m = (current+1);m <= totalPage;m++) {
                        pageArr.push({
                            page : m,
                            currentPage : false
                        });
                    };
                } else {
                    for (var n = (current+1);n <= (current+pageSpace);n++) {
                        pageArr.push({
                            page : n,
                            currentPage : false
                        });
                    };
                    pageArr.push({
                        page : '...',
                        dot : true,
                        currentPage : false
                    });
                    pageArr.push({
                        page : totalPage,
                        currentPage : false
                    });
                };
            }
        }
        pageCont = pageArr.map(function(item,index) {
            var pageClass = item.dot ? 'paginate-dot' : '';
            pageClass += item.currentPage ? ' paginate-current' : '';
            // return React.createElement("li", {className:  pageClass, key:  index },  item.page);
            return (
                <li className={pageClass} key={index}>{item.page}</li>
            );
        });
        return pageCont;
    }

    _handlePageClick(e) {
        var target = e.target;
        if (target.tagName !== 'LI' || /paginate-current/.test(target.className) || /paginate-dot/.test(target.className)) return;
        var page = parseInt(target.innerHTML);
        this.setState({
            current : page
        });
        this.props.selectPage(page);
    }

    _handlePrevClick() {
        var current = parseInt(this.state.current);
        if (current === 1) return;
        this.setState({
            current : (current - 1)
        });
        this.props.selectPage(current - 1);
    }

    _handleNextClick() {
        var current = parseInt(this.state.current);
        if (current === this.props.totalPage) return;
        this.setState({
            current : (current + 1)
        });
        this.props.selectPage(current + 1);
    }

    render() {
        var paginate = this._renderPaginate(this.state.current);
        var currentPage = this.state.current;
        var prevClass = (this.state.current === 1) ? 'prev-page unavailable' : 'prev-page';
        var nextClass = (this.state.current === this.props.totalPage) ? 'next-page unavailable' : 'next-page';
        var isSimple = this.props.isSimple || false;  //简易模式
        if (this.props.totalPage>0) {
            return (
                <div className={"ry-pagination " + (this.state.wrapClass ? this.state.wrapClass : "")} style={this.props.wrapStyle}>
                    <span onClick={()=>this._handleNextClick()} className={nextClass}>下一页<i></i></span>
                    {isSimple ? <span className="ry-currentPage">{currentPage}</span> : <ul onClick={(e)=>this._handlePageClick(e)}>{paginate}</ul>}
                    <span onClick={()=>this._handlePrevClick()} className={prevClass}>上一页<i></i></span>
                </div>
            )
        } else {
            return (<div></div>);
        }
    }
}

export default Pagination
