import { action, observable } from 'mobx';

class State {

    // 登陆状态
    @observable loginState = false;
    @action setLoginState = (data = false) => this.loginState = data;


    // 用户名
    @observable uname = '';
    @action setUname = (data = '') => {
        this.uname = data;
    }

    // token
    @observable token = null;
    @action setToken = (data = null) => {
        this.token = data;
    }

    // 是否显示loading
    @observable isLoading = false;
    @action setIsLoading = (data = false) => {
        this.isLoading = data;
    }

}

export default new State();