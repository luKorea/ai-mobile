// TODO  axios 二次封装
import $axios from './axios';
import qs from 'qs';
import {BASE_URL} from '../config/index';

export default class Http {
    static request(method = 'get', url, data = {}) {
        return $axios({
            method, url,
            data: method === 'get' ? data : qs.stringify(data)
        }).then(res => {
            return this.isSuccess(res);
        })
    }

    // 判断请求是否成功
    static isSuccess(res) {
        if (res.data) {
            return res.data || {};
        } else {
            this.requestException(res);
        }
    }

    // 处理异常
    static requestException(res) {
        const error = new Error(res.data && res.data.msg);
        error.response = res.data;
        throw error
    }

    // 处理 get 请求
    static get(url, data) {
        return this.request('get', BASE_URL + url, data)
    }

    // 处理 put 请求
    static put(url, data) {
        return this.request('put', BASE_URL + url, data)
    }

    // 处理 post 请求
    static post(url, data) {
        return this.request('post', BASE_URL + url, data)
    }

    // 处理 patch 请求
    static patch(url, data) {
        return this.request('patch', BASE_URL + url, data)
    }

    // 处理 delete 请求
    static delete(url, data) {
        return this.request('delete', BASE_URL + url, data)
    }

}