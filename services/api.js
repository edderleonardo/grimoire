import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const listRequests = async () => {
    try {
        const response = await apiClient.get('/solicitudes');
        return response.data;
    } catch (error) {
        console.error('Error al listar registros:', error);
        throw error;
    }
};

export const createRequest = async (request) => {
    try {
        const response = await apiClient.post('/solicitud', request);
        return response.data;
    } catch (error) {
        console.error('Error al crear registro:', error);
        throw error;
    }
};

export const updateRequest = async (id, request) => {
    try {
        const response = await apiClient.put(`/solicitud/${id}`, request);
        console.log("🚀 ~ updateRequest ~ response:", response)
        return response.data;
    } catch (error) {
        console.error('Error al actualizar registro:', error);
        throw error;
    }
};

export const deleteRequest = async (id) => {
    try {
        const response = await apiClient.delete(`/solicitud/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar registro:', error);
        throw error;
    }
};

export const changeStatusRequest = async (id, status) => {
    try {
        const response = await apiClient.patch(`/solicitud/${id}/estatus`, { status });
        return response.data;
    } catch (error) {
        console.error('Error al cambiar estado del registro:', error);
        throw error;
    }
}

export { apiClient };