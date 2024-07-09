import api from './axiosConfig';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const updateOrderFormService = async (resourceType, resourceId, orderForm) => {
    try {
        const token = sessionStorage.getItem('token');

        const response = await api.patch(`/updateOrderForm/${resourceType}/${resourceId}`, orderForm, {
            headers: {Authorization: `Bearer ${token}`},
        });
        if (response.status === 200) {
            return {success: true, error: null};
        }
    } catch (error) {
        toast.error('Eroare la actualizarea formularului de ordine');
        return {success: false, error: true};
    }
};