import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSnackbar } from '../contexts/SnackbarContext';

const useLoginPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const state = location.state as { from?: string };
    const { showSnackbar } = useSnackbar();

    useEffect(() => {
        if (state?.from === 'protected') {
            showSnackbar('You are not authorized to view this page. Please log in.', 'error');
            navigate('/login', { replace: true, state: {} });
        }
    }, []);
};

export default useLoginPage;
