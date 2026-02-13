import LoginForm from '../components/LoginForm';
import useLoginPage from './useLoginPage';

const LoginPage = () =>{
    useLoginPage();

    return <LoginForm />;  
}

export default LoginPage;