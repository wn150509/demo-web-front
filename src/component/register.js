import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import React from 'react';
import {Redirect ,Link} from "react-router-dom";
import './register.css'

export default class UserLogin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName:'',
            cellphone:'',
            email:'',
            password:'',
            registerFlag:false
        };
    }
    doRegister=(e)=>{
        e.preventDefault();
        let userName=this.state.userName;
        let cellphone=this.state.cellphone;
        let email=this.state.email;
        let password=this.state.password;
        const _this=this;    //先存一下this，以防使用箭头函数this会指向我们不希望它所指向的对象。
        if(this.isPhoneAvailable(cellphone)&&this.isEmailAvailable(email)){
            axios.post('http://localhost:8080/user/register',{
                userName,
                password,
                email,
                cellphone
            })
                .then(function (response) {
                    _this.setState({
                        registerFlag:true
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

    };
    isPhoneAvailable(phoneInput) {//判断手机号格式
        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(phoneInput)) {
            return alert("请输入正确的电话");
        } else {
            return true;
        }
    }
    isEmailAvailable(email){//判断邮箱格式
        var myemail=/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
        if(!myemail.test(email)){
            return alert("请输入正确的邮箱地址")
        }else {
            return true;
        }
    }
    render() {
        if(this.state.registerFlag){
            return <Redirect to='/' />;
        }
        return (
            <div className="form" style={{position:'relative'}}>
                <div className="form_register" style={{position:'absolute'}}>
                    <form onSubmit={this.doRegister}>
                        <h1>用户注册</h1>
                        <div className="form_item">
                            <label htmlFor="username1">用户姓名：</label>
                            <input type="text" placeholder="请输入用户名" required  value={this.state.userName} onChange={this.input_change.bind(this)} />
                            {/*<input type="text" name="username1" id="username1" placeholder="请输入用户名" required/>*/}
                        </div>
                        <div className="form_item">
                            <label htmlFor="phone">电话：</label>
                            <input type="text" placeholder="请输入电话" required  value={this.state.cellphone} onChange={this.input_change1.bind(this)} />
                            {/*<input type="tel" name="phone" id="phone" placeholder="请输入电话" required/>*/}
                        </div>
                        <div className="form_item">
                            <label htmlFor="email">email：</label>
                            <input type="text" placeholder="请输入邮箱" required  value={this.state.email} onChange={this.input_change2.bind(this)} />
                            {/*<input type="tel" name="email" id="email" placeholder="请输入邮箱" required/>*/}
                        </div>
                        <div className="form_item">
                            <label htmlFor="password1">登录密码：</label>
                            <input type="password" placeholder="请输入密码" required  value={this.state.password} onChange={this.input_change3.bind(this)} />
                            {/*<input type="password" name="password1" id="password1" placeholder="请输入密码" required/>*/}
                        </div>
                        <div className="form_item">
                            <input type="submit" value="注册"/>
                        </div>
                    </form>
                    <div className="info">已有账号？点击<span className="switch login_Btn">
                        <Link to={'/'}>登录</Link>
                    </span></div>
                </div>
            </div>
        )
    }
    input_change(e){
        this.setState({//绑定input值
            userName:e.target.value
        })
    }
    input_change1(e){//绑定input值
        this.setState({
            cellphone:e.target.value
        })
    }
    input_change2(e){//绑定input值
        this.setState({
            email:e.target.value
        })
    }
    input_change3(e){//绑定input值
        this.setState({
            password:e.target.value
        })
    }
}