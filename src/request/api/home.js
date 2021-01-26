
import http from "../http";
import $axios from '../axios';
import {BASE_URL, MEMBER_URL} from '../../config/index';

// 判断直播间是否生效
export const isStudioState = (data) => {
    return http.post('/getStudioByCode', {
        ...data
    })
}
// 判断用户是否第一次登录或者用户是否属于这个直播间
export const isOneLogin = (data) => {
    return $axios.get(`${BASE_URL}/getMemberByStudioId`, {
        params: {
            ...data
        }
    })
}

// 发送验证码
export const sendCode = (data) => {
    return $axios.get(`${BASE_URL}/sendMessage`, {
        params: {
            ...data
        }
    })
}

// 登陆
export const login = (data) => {
    return http.post('/login', {
        ...data
    })
}

// 获取模拟用户
export const getMember = () => {
    return $axios.get(`${MEMBER_URL}/page`)
}

// 获取直播间信息
export const getStudio = (code) => {
    return $axios.get(`${BASE_URL}/detail`, {
        params: {
            code
        }
    })
}