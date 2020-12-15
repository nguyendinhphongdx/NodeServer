import logo from './logo192.png';
import './assets/css/Login.css';
function Login(){
    return (
        <div className="Login full-height">
            <div className="container">
                    <div className="left align-center justify-content">
                        <div className="title">Member Login</div>
                        <p>Sign in to your Account</p>
                        <div className="picture">
                            <img src={logo} alt=""/>
                        </div>
                    </div>
                    <div className="right align-center justify-content">
                        <div className="container-input">
                            <div className="row">
                                <input type="text" placeholder="Username"/>
                                <i className="fas fa-user"></i>
                            </div>
                            <div className="row">
                                <input type="password" placeholder="Password"/>
                                <i className="fas fa-lock"></i>
                            </div>
                            <div className="row">
                                    <button>Login</button>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    );
}
export default Login;