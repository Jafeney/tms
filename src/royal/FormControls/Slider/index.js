/**
 * @type FormControls Component
 * @desc 滑动输入条
 * @author Jafeney
 * @dateTime 2016-07-07
 **/

import React, { Component } from 'react'
import './style.less'

class Slider extends Component {

    constructor(props) {
        super(props)
        this.state = {
            wrapStyle: props.wrapStyle || null,
            wrapClass: props.wrapClass || null,
            progress: props.progress || 50,
            percent: 0,
            showPercent: false,
        }
        this.lastProgress = 0;
        this.flag = false;
        this.currentX = 0, this.currentWidth = 0;
        this.callback = props.callback || null;
    }

    handleClick(e) {
        this.nowWidth = this.refs.wrapper.clientWidth;
        // console.log(this.nowWidth);
        this.nowX = e.clientX;
        console.log(this.nowX)
        // this.setState({progress: e.clientX})
    }

    handleMouseDown(e) {
        let event = e || window.event;
        this.flag = true;
        this.currentWidth = this.refs.wrapper.clientWidth;
        this.currentX = event.clientX;
        this.lastProgress = this.state.progress || 0;
        this.setState({showPercent: true })
    }

    handleMouseMove(e) {
        let event = e || window.event;
        let _progress = event.clientX - this.currentX + this.lastProgress;
        let _percent = _progress/this.currentWidth*100 | 0;
        if (this.flag && _progress>=0 && _progress<= this.currentWidth) {
            console.log(_progress);
            this.setState({progress: _progress, percent: _percent})
        }
    }

    handleMouseUp(e) {
        if (this.flag) {this.callback && this.callback()}
        this.flag = false;
        this.setState({showPercent: false })
    }

    render() {
        return (
            <div ref="wrapper"
                style={this.state.wrapStyle}
                onMouseUp={(e)=>this.handleMouseUp(e)}
                className={"ry-slider " +
                    (this.state.wrapClass?this.state.wrapClass:'')}>
                <div className="ry-slider-handle"
                    onMouseDown={(e)=>this.handleMouseDown(e)}
                    style={{left: this.state.progress}}>
                    <span className={this.state.showPercent ? "ry-slider-percent ry-active" : "ry-slider-percent" }>{this.state.percent}</span>
                </div>
                <div className="ry-slider-track"
                    style={{width: this.state.progress}}></div>
                <div className="ry-slider-step"></div>
            </div>
        )
    }

    componentDidMount() {
        document.addEventListener('mouseup', ()=> {
            if (this.flag) {this.callback && this.callback()}
            this.flag = false;
            this.setState({showPercent: false })
        })
        document.addEventListener('mousemove', (e)=> {
            this.handleMouseMove(e)
        })
    }
}

export default Slider
