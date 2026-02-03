import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../store/slices/userSlice';
import { AppDispatch } from '../store/store';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Box, Button, TextField, Typography, Container, Paper } from '@mui/material';
import { useSnackbar } from '../contexts/SnackbarContext';

const validationSchema = yup.object({
    username: yup 
        .string()
        .required("Username is required"),
    password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
});

const RegisterForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { showSnackbar } = useSnackbar();

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema: validationSchema,
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

    return (
        <Container maxWidth="sm">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
                    <Typography component="h1" variant="h5" align="center" gutterBottom>
                        Register
                    </Typography>
                    <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
                        <TextField
                            fullWidth
                            id="username"
                            name="username"
                            label="Username"
                            value={formik.values.username}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.username && Boolean(formik.errors.username)}
                            helperText={formik.touched.username && formik.errors.username}
                            margin="normal"
                        />
                        <TextField
                            fullWidth
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            margin="normal"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Register
                        </Button>
                        <Button
                            fullWidth
                            variant="text"
                            onClick={() => navigate('/login')}
                        >
                            Already have an account?
                        </Button>
                    </Box>
                </Paper>
            </Box>
        </Container>
    );
};

export default RegisterForm;
