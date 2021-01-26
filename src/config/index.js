// 全局窗口关闭统一时间
export const $globalCloseTime = 1;

// 请求地址公用前缀
export const BASE_URL = process.env.NODE_ENV === 'development' ? '/blade-studio' : '/api/blade-studio';
export const MEMBER_URL = process.env.NODE_ENV === 'development' ? '/blade_member_simulate' : '/api/blade_member_simulate';
// 线上服务器地址
export const PRODUCTION_URL = '';
// 本地服务器地址
export const DEVELOPMENT_URL = '';

export const WS_URl = process.env.NODE_ENV === 'development' ? 'h5.zhongjiaotech.com' : 'h5.zhongjiaotech.com/api';

// 图片本地地址
export const DEVELOPMENT_IMAGE_URL = 'https://aaa.jzwowo.cn';
// 图片线上地址
export const PRODUCTION_IMAGE_URL = 'https://aaa.jzwowo.cn';