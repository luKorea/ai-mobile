// TODO axios 封装
import axios from "axios";
import { message } from 'antd';
// 设置
import { PRODUCTION_URL } from '@/config';
// 全局数据
// import $state from '@/store';

import loading from '../utils/loading';

const $axios = axios.create({
    baseURL: process.env.NODE_ENV === 'production' ? PRODUCTION_URL : '',
    timeout: 60 * 1000,
    withCredentials: true
    // headers: {'X-Custom-Header': 'foobar'}
});

// 添加请求拦截器
$axios.interceptors.request.use(
    config => {
        loading.showLoading()
        return config;
    },
    error => {
        // 对请求错误做些什么
        return Promise.reject(error);
    }
);

// 添加响应拦截器
$axios.interceptors.response.use(
    response => {
        const {  data } = response || {};
        if( data ){
            loading.hideLoading()
            // $state.setIsLoading( false );
        }
        // 对响应数据做点什么
        return response;
    },
    error => {
        const { config: { url }, code } = error || {};
        if( code === 'ECONNABORTED' ){
            message.error(`${ url } 请求超时！`);
            // $state.setIsLoading( false );
            loading.hideLoading()
        }
        if (error.response) {
            const { data, status } = error.response || {};
            // eslint-disable-next-line default-case
            switch (status) {
                case 404:
                    message.error(data.msg );
                    break;
            }
        }
        loading.hideLoading()
        // $state.setIsLoading( false );
        // 对响应错误做点什么
        return Promise.reject(error);
    }
);

export default $axios;