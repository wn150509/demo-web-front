import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import React from 'react';
import {Redirect,Link} from "react-router-dom";
import './login.css';

export default class UserLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phone:'',
            password:'',
            loginFlag:false
        };
    }
    doLogin=(e)=>{
        e.preventDefault();
        let phone=this.state.phone;
        let password=this.state.password;
        let params=new URLSearchParams();
        params.append('phone',phone);
        params.append('password',password);
        const _this=this;    //先存一下this，以防使用箭头函数this会指向我们不希望它所指向的对象。
        if (this.isPhoneAvailable(phone)){
            axios.post('http://localhost:8080/user/login',params,
                {headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}})
                .then(function (response) {
                    localStorage.setItem("userId",response.data.data.userId);
                    _this.setState({
                        loginFlag:true

                    });
                })
                .catch(function (error) {
                    console.log(error);
                    _this.setState({
                        isLoaded:false,
                        error:error
                    })
                })
        }
    }
    isPhoneAvailable(phoneInput) {//判断手机号格式
        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(phoneInput)) {
            return alert("请输入正确的电话");
        } else {
            return true;
        }
    }
    render() {
        if(this.state.loginFlag){
            return <Redirect to='/list/' />;
        }
        return (
            <div className="form" style={{position:'relative'}}>
                <div className="form_register" style={{position:'absolute'}}>
                <form onSubmit={this.doLogin}>
                    <h1>登&ensp;&ensp;录</h1>
                    <div className="form_item">
                        <label htmlFor="phoneNum">电话：</label>
                        <input type="text" placeholder="请输入电话" required  value={this.state.phone} onChange={this.input_change.bind(this)} />
                    </div>
                    <div className="form_item">
                        <label htmlFor="password">密码：</label>
                        <input type="password" placeholder="请输入密码" required  value={this.state.password} onChange={this.input_change1.bind(this)} />
                    </div>
                    <div className="form_item">
                        <input type="submit" value="登录"/>
                    </div>
                </form>
                <div className="info">没有账号？点击<span className="switch register_Btn">
                    <Link to={'/register'}>注册</Link>
                </span></div>
                </div>
            </div>
            )
    }
    input_change(e){
        this.setState({//绑定input值
            phone:e.target.value
        })
    }
    input_change1(e){//绑定input值
        this.setState({
            password:e.target.value
        })
    }
}
