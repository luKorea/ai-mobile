// TODO 优化加载速度,实现路由懒加载

import React from 'react';
import Loadable from 'react-loadable';
import {Spin} from 'antd';
//通用的过场组件
const loadingComponent = _ => (
    <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: 'center',
        width: "100%",
        height: "100vh"
    }}><Spin size="large"/>Loading</div>
)


//过场组件默认采用通用的，若传入了loading，则采用传入的过场组件
const loadable = (loader, loading = loadingComponent) => Loadable({
    loader,
    loading
})

export default loadable;