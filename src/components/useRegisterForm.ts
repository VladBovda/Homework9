import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../store/slices/userSlice';
import { AppDispatch } from '../store/store';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSnackbar } from '../contexts/SnackbarContext';

const validationSchema = yup.object({
    username: yup.string().required("Username is required"),
    password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});

const useRegisterForm = () => {
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
                const result = await dispatch(register({
                    username: values.username,
                    password: values.password,
                }));
                if (register.rejected.match(result)) {
                    showSnackbar('Registration failed. Please try again.', 'error');
                } else {
                    showSnackbar('Registration successful!', 'success');
                    navigate('/login');
                }
            } catch (error) {
                showSnackbar('Registration failed. Please try again.', 'error');
            }
        },
    });

    const goToLogin = () => navigate('/login');

    return { formik, goToLogin };
};

export default useRegisterForm;
