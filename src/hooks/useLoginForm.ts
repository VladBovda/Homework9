import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../store/slices/userSlice';
import { AppDispatch } from '../store/store';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSnackbar } from '../contexts/SnackbarContext';

const validationSchema = yup.object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
});

const useLoginForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const result = await dispatch(login({ username: values.username, password: values.password }));
                if (login.rejected.match(result)) {
                    showSnackbar('Incorrect username or password', 'error');
                } else {
                    showSnackbar('Login successful!', 'success');
                    navigate('/home');
                }
            } catch (error) {
                showSnackbar('Incorrect username or password', 'error');
            }
        },
    });

    const goToRegister = () => navigate('/register');

    return { formik, goToRegister };
};

export default useLoginForm;
