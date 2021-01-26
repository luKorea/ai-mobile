import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ConfigProvider } from 'antd';
import zh_CN from 'antd/es/locale/zh_CN';
import * as serviceWorker from './serviceWorker';
import 'lib-flexible';


const render = () => {
    ReactDOM.render(
        <ConfigProvider locale={zh_CN}>
            <App />
        </ConfigProvider>,
        document.getElementById('root')
    );

}

render();
// Hot reloading
if (module.hot) {
    // Reload components
    module.hot.accept('./App', () => {
        render()
    })
}


serviceWorker.unregister();
