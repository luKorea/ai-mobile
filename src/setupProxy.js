// 本地代理配置
const {createProxyMiddleware} = require('http-proxy-middleware');
const DEVELOPMENT_URL = 'http://192.168.1.11:2829';
const BASE_URL = '/blade-studio'

module.exports = function (app) {
    app.use(
        BASE_URL,
        createProxyMiddleware({
            target: DEVELOPMENT_URL,
            changeOrigin: true,
        })
    );
};