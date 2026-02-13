import LoginForm from '../components/LoginForm';
import useLoginPage from '../hooks/useLoginPage';

const LoginPage = () =>{
    useLoginPage();

    return <LoginForm />;  
}

export default LoginPage;