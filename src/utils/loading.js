import React from 'react';
import ReactDOM from 'react-dom';
import { Spin } from 'antd';
// 全局设置
import { $globalCloseTime } from '../config';

// 统计 - 当前正在请求的数量
let reqCount = 0;


// 显示loading
const showLoading = () => {

    if( !reqCount )  {
        let div = document.createElement('div');
        div.setAttribute('id', 'dm_loading');
        document.body.appendChild(div);

        ReactDOM.render(<Spin tip='Loading Data ...' />, div);
    }
    reqCount++;

}

// 隐藏loading
const hideLoading = () => {
    setTimeout(() => {
        reqCount--;

        if(!reqCount) {
            document.body.removeChild(document.getElementById('dm_loading'));
        }
    }, ($globalCloseTime + 1) * 500)

}

export default { showLoading, hideLoading }