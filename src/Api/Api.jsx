import apiClient from '../apiClient';

// --- Auth APIs ---

export const requestOtp = async (email) => {
    const response = await apiClient.post(`/auth/employee/request-otp`, { email });
    return response.data;
};

export const verifyOtp = async (email, otp) => {
    const response = await apiClient.post(`/auth/employee/login`, { email, otp });
    return response.data;
};

// --- Statistics & Home APIs ---

export const getStats = async () => {
    const response = await apiClient.get('/stats');
    return response.data;
};

export const getNextMeeting = async () => {
    const response = await apiClient.get('/next-meeting');
    return response.data;
};

// --- Booking & Room APIs ---

export const getRoomsStatus = async () => {
    const response = await apiClient.get('/bookings/rooms/status');
    return response.data;
};

export const getMyBookings = async (type) => {
    // type: upcoming, previous, cancelled
    const response = await apiClient.get(`/bookings/my-bookings?booking_type=${type}`);
    return response.data;
};

export const bookRoom = async (bookingData) => {
    const response = await apiClient.post(`/bookings/android`, bookingData);
    return response.data;
};

export const rescheduleBooking = async (bookingId, bookingData) => {
    const response = await apiClient.put(`/bookings/android/${bookingId}`, bookingData);
    return response.data;
};

export const cancelBooking = async (bookingId) => {
    const response = await apiClient.delete(`/bookings/${bookingId}`);
    return response.data;
};

// --- Calendar APIs ---

export const getCalendarEvents = async (month) => {
    // month format: YYYY-MM
    const response = await apiClient.get(`/calendar?month=${month}`);
    return response.data;
};

// --- Profile APIs ---

export const getProfileStats = async () => {
    const response = await apiClient.get('/employee/statistics');
    return response.data;
};