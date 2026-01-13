import axios from 'axios';
import base_url from './base_url';
import AsyncStorage from '@react-native-async-storage/async-storage';

const apiClient = axios.create({
    baseURL: base_url,
});

// Request Interceptor: Add Token automatically
apiClient.interceptors.request.use(async (config) => {
    try {
        let token = await AsyncStorage.getItem('token');
        if (!token) {
            const userDataStr = await AsyncStorage.getItem('userData');
            if (userDataStr) {
                const userData = JSON.parse(userDataStr);
                token = userData?.token || userData?.access_token;
            }
        }
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    } catch (error) {
        console.error('apiClient - Error getting token:', error);
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default apiClient;
