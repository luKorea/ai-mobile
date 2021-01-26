// TODO TIP 全局提示封装
import {message} from 'antd';

export const success = () => message.success('successful');

export const error = (err) => message.error(`errorInfo: ${err}`);

export const warning = () => message.warning('This is a warning message');

export const loginSuccess = () => message.success('Login successful')
export const loginError = (err) => message.success(`Login error, ${err}`)
export const noLogin = () => message.warning('You are not logged in. Please log in first')
export const RegisterSuccess = () => message.success('Register successful')
export const RegisterError = (err) => message.success(`Register error, ${err}`)

export const collectOk = () => message.success('Collection added successfully')
export const collectCancel = () => message.success('Collection cancelled successfully')
export const cartOk = () => message.success('Successfully added to shopping cart')
export const cartCancel = () => message.success('Removed from cart')