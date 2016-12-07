/**
 * @type Other Component
 * @desc 可拖拽容器
 * @author Jafeney
 * @dateTime 2016-07-07
 **/

import React, { Component } from 'react'
import './style.less'

class Drag extends Component {

    constructor(props) {
        super(props)
        this.state = {
            wrapStyle: props.wrapStyle || null,
            wrapClass: props.wrapClass || null,
            wrapHeight: props.wrapHeight || null,
            wrapWidth: props.wrapWidth || null,
            style: props.style || null,
            className: props.className || null,
            position: props.position || [0,0],
        }
        this.callback = props.callback || null;
        this.flag =  false;
        this.currentX = 0;
        this.currentY = 0;
        this.lastPosition = [0,0];
    }

    handleStartDrag(e) {
        let event = e || window.event;
        this.currentX = event.clientX;
        this.currentY = event.clientY;
        this.flag = true;
        this.lastPosition = this.state.position[0] ? this.state.position : [0,0];
    }

    handleMove(e) {
        let event = e || window.event,
            height = parseInt(this.refs.dragBox.style.height),
            width = parseInt(this.refs.dragBox.style.width);

        if (this.flag) {

            let disX =  event.clientX - this.currentX + this.lastPosition[0],
                disY =  event.clientY - this.currentY + this.lastPosition[1];

            disX = disX < 0 ? 0 : disX;
            disX = disX > this.state.wrapWidth - width ? this.state.wrapWidth - width : disX;

            disY = disY < 0 ? 0 : disY;
            disY = disY > this.state.wrapHeight - height ? this.state.wrapHeight - height : disY;

            this.setState({
                position: [disX,disY]
            });
        }
    }

    HandleEndDrag(e) {
        if (this.flag) {this.callback && this.callback()}
        this.flag = false;
    }

    render() {
        return (
            <div
                onMouseUp={(e)=>this.HandleEndDrag(e)}
                onMouseMove={(e)=>this.handleMove(e)}
                style={{...this.state.wrapStyle,
                    height: this.state.wrapHeight,
                    width: this.state.wrapWidth}}
                className={'ry-drag-wrapper '
                    +(this.state.wrapClass?this.state.wrapClass:'')}>
                <div
                    ref="dragBox"
                    onMouseDown={(e)=>this.handleStartDrag(e)}
                    style={{...this.state.style,
                        left: this.state.position[0],
                        top: this.state.position[1]}}
                    className={'ry-drag-box '
                        +(this.state.className ? this.state.className : '')}>
                    {this.props.children}
                </div>
            </div>
        )
    }

    componentDidMount() {
        document.addEventListener('mouseup', ()=>{
            if (this.flag) {this.callback && this.callback()}
            this.flag = false;
        });
    }
}

export default Drag
