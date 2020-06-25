//app.js
import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Login from './component/login';//用户登录组件
import List from './component/list';//用户登录记录
import register from './component/register';//用户注册组件

class App extends Component {
  constructor(props){
    super(props);
    this.state={};
  }
  render() {
    return (
        <Router>
            <div className="container">
                <Route exact path="/" component={Login} />
                {/*<Route path="/products/:id" component={Detail} />*/}
                <Route path="/login" component={Login} />
                <Route exact path="/list" component={List} />
                <Route exact path="/register" component={register} />
            </div>
        </Router>
    );
  }
}

export default App;

