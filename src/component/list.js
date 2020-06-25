import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';

//List.js
class List extends React.Component {
    constructor(props){
        super(props);
        this.state={
            users:[],
            isLoaded:false
        }
    }
    //当组件输出到 DOM 后会执行 componentDidMount()
    componentDidMount(){
        const _this=this;    //先存一下this，以防使用箭头函数this会指向我们不希望它所指向的对象。
        axios.post('http://localhost:8080/user/loginLog',
            {
                "userId":localStorage.getItem("userId")
            })
            .then(function (response) {
                _this.setState({
                    users:response.data.data,
                    isLoaded:true
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

    //List.js
    render() {
        if(!this.state.isLoaded){
            return <div>Loading......</div>
        }else{
            return (
                <div>
                    <nav className="navbar navbar-default">
                        <div className="container-fluid">
                            <div className="navbar-header">
                                <h2>用户登录记录展示</h2>
                            </div>
                        </div>
                    </nav>
                    <table className="table table-bordered">
                        <thead>
                        <tr>
                            <th className="text-center">ID</th>
                            <th className="text-center">Ip地址</th>
                            <th className="text-center">登录时间</th>
                        </tr>
                        </thead>
                        <tbody>
                        <TrData users={this.state.users}/>
                        </tbody>
                    </table>
                </div>
            )
        }
    }

}
//List.js
class TrData extends Component{
    constructor(props){
        super(props);
    }
    renderTime(date) {
        var dateee = new Date(date).toJSON();
        return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
    }
    render(){
        return (
            this.props.users.map((user,i)=>{
                return (
                    <tr key={user.loginId} className="text-center">
                        <td>{user.loginId}</td>
                        <td>{user.loginIp}</td>
                        <td>{this.renderTime(user.loginTime)}</td>
                    </tr>
                )
            })
        )
    }
}

//List.js
export default List;