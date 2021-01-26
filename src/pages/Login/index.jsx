// TODO 完成登陆
import React, {useRef, useState} from 'react';
import './Login.less';
import {Button, Form, Image, Input, message, Modal} from "antd";
import {getParam} from "../../utils";
import {
    getStudio,
    isOneLogin,
    isStudioState,
    login,
    sendCode
} from "../../request/api/home";
import logo from "../../images/qrCode.jpg";

export default (props) => {
    const phoneRef = useRef();

    let vid = getParam('vid'),
        code = getParam('code'),
        type = getParam('type');
    const [codeShow, setCodeShow] = useState(true);
    let [count, setCount] = useState(60);
    let [timer, setTimer] = useState('');
    const [btnState, setBtnState] = useState(false);
    const [phone, setPhone] = useState('');
    const [showName, setShowName] = useState(true);
    const [key, setKey] = useState('');
    const [showNo, setShowNo] = useState(false);
    const [data, setData] = useState([]);


    const getVerifycode = () => {
        if (phone === '') {
            message.error('请输入手机号码')
            return
        }
        sendCode({phone, code}).then(res => {
            if (res.data.code === 200) {
                setKey(res.data.data)
            } else {
                message.error('获取验证码失败，请重新获取')
                setCodeShow(true);
                clearInterval(timer); // 清除定时器
                setCount(60)
                setTimer(null);
            }
        }).catch(err => console.log(err))
        const TIME_COUNT = 60; //更改倒计时时间
        if (!timer) {
            setCount(TIME_COUNT);
            console.log(count);
            setCodeShow(false);
            timer = setInterval(() => {
                if (count > 0 && count <= TIME_COUNT) {
                    setCount(count--);
                } else {
                    setCodeShow(true);
                    clearInterval(timer); // 清除定时器
                    setCount(60)
                    setTimer(null);
                }
            }, 1000);
        }
    };

    // 判断直播是否过期
    const isStudio = () => {
        if (vid !== null && code !== null && type !== null) {
            let myPhone = sessionStorage.getItem('userPhone');
            console.log(myPhone);
            isStudioState({vid, code, phone: myPhone})
                .then(res => {
                    console.log(res.data.code);
                    if (res.code === 200) {
                        props.history.push(`/home?vid=${vid}&code=${code}&type=${type}`)
                        sessionStorage.setItem('data', JSON.stringify(res.data))
                        document.title = res.data.courseTitle;
                        sessionStorage.setItem('status', res.code)
                        sessionStorage.setItem('title', res.data.courseTitle ? res.data.courseTitle : '')
                        sessionStorage.setItem('phone', res.data.phone ? res.data.phone : '')
                        sessionStorage.setItem('qrCode', res.data.qrCode)
                        sessionStorage.setItem('name', res.data.name ? res.data.name : '')
                        sessionStorage.setItem('time', res.data.dayTime ? res.data.dayTime : '')
                    }
                    // 直播未开始
                    else if (res.code === 201) {
                        props.history.push(`/home?vid=${vid}&code=${code}&type=${type}`)
                        sessionStorage.setItem('data', JSON.stringify(res.data))
                        document.title = res.data.courseTitle;
                        sessionStorage.setItem('status', res.code)
                        sessionStorage.setItem('title', res.data.courseTitle ? res.data.courseTitle : '')
                        sessionStorage.setItem('phone', res.data.phone ? res.data.phone : '')
                        sessionStorage.setItem('qrCode', res.data.qrCode)
                        sessionStorage.setItem('name', res.data.name ? res.data.name : '')
                        sessionStorage.setItem('time', res.data.dayTime ? res.data.dayTime : '')
                    }
                    // 直播已过期
                    else if (res.code === 202) {
                        props.history.push(`/home?vid=${vid}&code=${code}&type=${type}`)
                        sessionStorage.setItem('data', JSON.stringify(res.data))
                        document.title = res.data.courseTitle;
                        sessionStorage.setItem('status', res.code)
                        sessionStorage.setItem('title', res.data.courseTitle ? res.data.courseTitle : '')
                        sessionStorage.setItem('phone', res.data.phone ? res.data.phone : '')
                        sessionStorage.setItem('qrCode', res.data.qrCode)
                        sessionStorage.setItem('name', res.data.name ? res.data.name : '')
                        sessionStorage.setItem('time', res.data.dayTime ? res.data.dayTime : '')
                    }
                    console.log(res);
                }).catch(err => {
                message.error('服务器异常')
                console.log(err);
            })
        } else {
            return
        }
    }
    // 判断手机号码
    const isPhone = () => {
        setShowName(true)
        const {value} = phoneRef.current.state;
        console.log(value);
        if (value === undefined) {
            message.error('请输入手机号码')
            setShowName(true)
            return
        }
        const data = {
            phone: value,
            code: code
        }
        isOneLogin(data)
            .then(res => {
                if (res.data.code === 200) {
                    setShowName(false)
                    setCodeShow(true)
                }
                if (res.data.code === 401) {
                    setCodeShow(true)
                } else if (res.data.code === 400) {
                    message.error(res.data.msg)
                    // setCodeShow(false)
                }
            })
            .catch(err => {
                console.log(err)
            })
        setPhone(value);
        // setShowName(false)
    }

    const onFinish = (data) => {
        let vid = getParam('vid'),
            code = getParam('code');
        sessionStorage.setItem('userPhone', data.phone);
        login({
            phone: Number(data.phone),
            name: data.name || '',
            verifyCode: data.verifyCode,
            code: code,
            key: key
        }).then(res => {
            if (res.code === 200) {
                sessionStorage.setItem('status', res.code)
                sessionStorage.setItem('title', res.data.courseTitle ? res.data.courseTitle : '')
                sessionStorage.setItem('phone', res.data.phone ? res.data.phone : '')
                sessionStorage.setItem('qrCode', res.data.qrCode)
                sessionStorage.setItem('name', res.data.name ? res.data.name : '')
                sessionStorage.setItem('random', res.data.random ? res.data.random : 0)
                sessionStorage.setItem('vid', vid);
                sessionStorage.setItem('code', code);
                sessionStorage.setItem('type', type);
                sessionStorage.setItem('userKey', res.data.userKey ? res.data.userKey : '')
                if (type == 1) {
                    getStudio(code)
                        .then(res => {
                            if (res.data.code === 200) {
                                props.history.push(`/live?vid=${vid}&code=${code}&type=${type}`)
                                sessionStorage.setItem('id', res.data.data.id)
                                message.success('登陆成功');
                            }
                        }).catch(err => console.log(err))
                } else if (type == 2) {
                    getStudio(code)
                        .then(res => {
                            if (res.data.code === 200) {
                                isStudio()
                                sessionStorage.setItem('id', res.data.data.id)
                                message.success('登陆成功');
                            }
                        }).catch(err => console.log(err))
                }
            } else if (res.code === 203) {
                message.error(res.msg)
                return;
            } else if (res.code === 204) {
                setShowNo(true);
                setData(res.data)
            } else if (res.code === 501) {
                message.error(res.msg)
                return;
            } else if (res.code === 502) {
                message.error(res.msg)
                return;
            }
        }).catch(err => {
            console.log(err);
        })
    };

    return (
        <div className="login-container">
            <div className='logo'/>
            <div className="login-wrap">
                <div className="login">
                    <div className='title'>用户登录</div>
                    <Form
                        style={{
                            paddingBottom: 10,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'column'
                        }}
                        onFinish={onFinish}
                        labelCol={{span: 5}}
                    >
                        <Form.Item label="" name="phone"
                                   rules={[
                                       {
                                           required: true,
                                           message: '手机号码格式不正确',
                                           pattern: new RegExp(/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/, 'g'),
                                       },
                                   ]}>
                            <Input
                                maxLength={11}
                                style={{width: 300}}
                                placeholder='请输入手机号码'
                                disabled={btnState}
                                ref={phoneRef}
                                onBlur={isPhone}
                                className='input'
                            />
                        </Form.Item>
                        {
                            showName ?
                                <Form.Item label="" name="name" rules={[
                                    {
                                        required: true,
                                        pattern: new RegExp(/^[\u4E00-\u9FA5]{2,4}$/, 'g'),
                                        message: '真实姓名只能为中文且2至50个字',
                                    },
                                ]}>
                                    <Input style={{width: 300}}
                                           placeholder='请输入真实姓名'
                                           className='input'
                                           disabled={btnState}/>
                                </Form.Item> : ''
                        }

                        {/* 验证码 */}
                        <div style={{width: 300}}>
                            <Form.Item label=""
                                       name='verifyCode' rules={[
                                {
                                    required: true,
                                    message: '请输入验证码',
                                },
                            ]}>
                                <div style={{display: 'flex'}}>
                                    <Input placeholder='验证码'
                                           className='input'
                                           disabled={btnState}/>
                                    <Button style={{marginLeft: 10}}
                                            onClick={getVerifycode}
                                            className='btn'
                                            disabled={!codeShow}>
                                        {
                                            codeShow ? <span>获取验证码</span> :
                                                <span>{count}秒</span>
                                        }
                                    </Button>
                                </div>
                            </Form.Item>
                        </div>

                        <Form.Item>
                            <div className="btn">
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    disabled={btnState}
                                    style={{width: 300}}
                                >
                                    立即进入直播间
                                </Button>
                            </div>
                        </Form.Item>
                    </Form>
                </div>
            </div>


            {/* 不属于直播间 */}
            <Modal
                title={'暂未预约课程请添加老师微信进行预约!'}
                visible={showNo}
                maskClosable={false}
                style={{borderRadius: 10}}
                labelAlign='left'
                centered
                closable={false}
                footer={null}
                maskStyle={{
                    backgroundColor: 'rgba(250,250, 250, .9)'
                }}
            >
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: "column"
                }}>
                    <Image
                        src={data.qrCode || logo}
                        alt=""
                        width={118}
                        height={116}
                    />
                    <div style={{marginBottom: 20}}>
                        <span
                            style={{marginRight: 20}}>{data.name || '李老师'}</span>
                        <span>{data.phone || '13727473201'}</span>
                    </div>
                </div>
            </Modal>
        </div>
    )
}