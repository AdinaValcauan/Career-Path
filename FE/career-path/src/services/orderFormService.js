import api from './axiosConfig';

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
        throw error;
    }
};