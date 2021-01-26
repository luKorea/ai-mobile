import React, {useEffect} from 'react';
import {HashRouter, Switch, Route, Redirect} from "react-router-dom";
import routes from './router';
import './App.less';
import './common/index.less';


function App() {
  return (
      <div className="app">
        <HashRouter>
            <div className='content'>
                <Switch>
                    {
                        routes.map((item, index) => {
                            return (
                                <Route
                                    key={ index } path={ item.path }
                                    exact={ item.exact }
                                    render={ props => {
                                        document.title = item.title;
                                        return <item.component {...props}/>
                                    }} />
                            );
                        })
                    }
                    <Redirect from='/' to='/login' />
                </Switch>
            </div>
        </HashRouter>
      </div>
  );
}

export default App;
