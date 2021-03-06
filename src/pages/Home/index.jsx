﻿import React from 'react';

import MyVideo from './components/Video';

import './home.less';
import {Button, Image, message, Modal} from "antd";
import {isStudioState} from "../../request/api/home";
import {getParam} from "../../utils";


import logo from "../../images/qrCode.jpg";



class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showNo: false,
            showModal: false,
            infoTitle: '',
        }
    }

    // 判断直播是否过期
    isStudio() {
        let vid = sessionStorage.getItem('vid'),
            code = sessionStorage.getItem('code'),
            type = sessionStorage.getItem('type');
        if (vid !== null && code !== null && type !== null) {
            let myPhone = sessionStorage.getItem('userPhone');
            console.log(myPhone);
            isStudioState({vid, code, phone: myPhone})
                .then(res => {
                    console.log(res.data.code);
                    if (res.code === 200) {

                    }
                    // 直播未开始
                    if (res.code === 201) {
                        this.setState({
                            infoTitle: '亲爱的同学，您预约的课程未开始，请联系老师进行重新约课！',
                            showModal: true
                        })
                    }
                    // 直播已过期
                    if (res.code === 202) {
                        this.setState({
                            infoTitle: '亲爱的同学，您预约的课程已过期，请联系老师进行重新约课！',
                            showModal: true
                        })
                    }
                    // 课程已锁定
                    if (res.code === 203) {
                        this.props.history.push(`/login?vid=${vid}&code=${code}&type=${type}`)
                    }
                }).catch(err => {
                console.log(err);
            })
        } else {
            return
        }
    }


    componentDidMount() {
        if (sessionStorage.getItem('id') === null || getParam('code') === null) {
            message.error('登陆已失效，请重新登陆')
            let vid = sessionStorage.getItem('vid'),
                code = sessionStorage.getItem('code'),
                type = sessionStorage.getItem('type');
            if (getParam('vid') && getParam('vid') && getParam('type')) {
                vid = getParam('vid');
                code = getParam('code');
                type = getParam('type');
            }
            this.props.history.push(`/login?vid=${vid}&code=${code}&type=${type}`)
            sessionStorage.clear();
        }
        this.isStudio();
    }


    render() {
        let qrCode = sessionStorage.getItem('qrCode'),
            name = sessionStorage.getItem('name'),
            phone = sessionStorage.getItem('phone');
        const {showNo, infoTitle, showModal} = this.state;
        return (
            <div className='home-container'>
                <MyVideo {...this.props}/>
                <Modal
                    title={infoTitle}
                    visible={showModal}
                    maskClosable={false}
                    style={{borderRadius: 10}}
                    labelAlign='left'
                    centered
                    closable={false}
                    footer={null}
                    maskStyle={{
                        backgroundColor: 'rgba(0,0,0,.45)'
                    }}
                >
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: "column"
                    }}>
                        <Image
                            src={qrCode || logo}
                            alt=""
                            width={118}
                            height={116}
                        />
                        <div style={{marginBottom: 20}}>
                        <span
                            style={{marginRight: 20}}>{name || '李老师'}</span>
                            <span>{phone || '13727473201'}</span>
                        </div>
                        <div style={{width: 300}}><Button type='primary'
                                                          onClick={() => this.setState({showModal: false})}
                                                          style={{width: '100%'}}>确认</Button>
                        </div>
                    </div>
                </Modal>


                {/* 不属于直播间 */}
                <Modal
                    title={infoTitle}
                    visible={showNo}
                    maskClosable={false}
                    style={{borderRadius: 10}}
                    labelAlign='left'
                    centered
                    closable={false}
                    footer={null}
                    maskStyle={{
                        backgroundColor: 'rgba(0,0,0,.45)'
                    }}
                >
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: "column"
                    }}>
                        <Image
                            src={qrCode || logo}
                            alt=""
                            width={118}
                            height={116}
                        />
                        <div style={{marginBottom: 20}}>
                        <span
                            style={{marginRight: 20}}>{name || '李老师'}</span>
                            <span>{phone || '13727473201'}</span>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default Home;

// import React from 'react';
//
//
// import './home.less';
//
//
// class Home extends React.Component {
//     constructor(props) {
//         super(props);
//     }
//
//     render() {
//         return (<div className='home-container'>
//             <div className='title-wrap'>
//                 <div className='logo'>MAYA</div>
//                 <div className='title'>3D建模基础知识</div>
//             </div>
//         </div>)
//     }
// }
//
// export default Home;