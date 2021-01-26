// 超出指定行内容溢出，则显示省略号...
export const $ellipsis = (value, len) => {
    if( !value.trim() ) return '';
    return value.length >= len ? `${value.slice(0, len)}...` : value;
};


// 全局loading
export { default as loading } from './loading';

// 邮箱格式验证
export const validateEmail = () => {
    return new RegExp('^([a-zA-Z0-9]+[_|\\_|\\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\\_|\\.]?)*[a-zA-Z0-9]+\\.[a-zA-Z]{2,3}$', 'g')
}

// 手机号码 - 校验
export const validatePhone = () => {
    return new RegExp(/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/, 'g')
};


// 获取地址蓝参数

export const getQueryString = (name) => {
    return window.location.hash.substr(1);
};

// 获取验证码
export const getVerifycode = () =>  {
    const TIME_COUNT = 60 //更改倒计时时间
    if (!this.timer) {
        this.count = TIME_COUNT
        this.show = false
        this.timer = setInterval(() => {
            if (this.count > 0 && this.count <= TIME_COUNT) {
                this.count--
            } else {
                this.show = true
                clearInterval(this.timer) // 清除定时器
                this.timer = null
            }
        }, 1000)
    }
}


export const getParam = function (name) {
    let search = document.location.hash;
    //alert(search);
    let pattern = new RegExp("[?&]" + name + "\=([^&]+)", "g");
    let matcher = pattern.exec(search);
    let items = null;
    if (null != matcher) {
        try {
            items = decodeURIComponent(decodeURIComponent(matcher[1]));
        } catch (e) {
            try {
                items = decodeURIComponent(matcher[1]);
            } catch (e) {
                items = matcher[1];
            }
        }
    }
    return items;
};


export function deleteObject(obj) {
    var uniques = [];
    var stringify = {};
    for (var i = 0; i < obj.length; i++) {
        var keys = Object.keys(obj[i]);
        keys.sort(function(a, b) {
            return (Number(a) - Number(b));
        });
        var str = '';
        for (var j = 0; j < keys.length; j++) {
            str += JSON.stringify(keys[j]);
            str += JSON.stringify(obj[i][keys[j]]);
        }
        if (!stringify.hasOwnProperty(str)) {
            uniques.push(obj[i]);
            stringify[str] = true;
        }
    }
    uniques = uniques;
    return uniques;
}
