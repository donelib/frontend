import "./Login.scss";
import googleGLogo from  "../../assets/googleGLogo.svg";

const Login = () => {
  return (
    <div className="login-container">
      <a className="button" href="/api/auth/oauth/login/google">
        <img src={googleGLogo} alt="G logo"/>
        Login
      </a>
    </div>
  );
};

export default Login;