import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import * as api from "./Api";

// --- Auth Hooks ---

export const useRequestOtp = () => {
    return useMutation({
        mutationFn: api.requestOtp,
    });
};

export const useVerifyOtp = () => {
    return useMutation({
        mutationFn: ({ email, otp }) => api.verifyOtp(email, otp),
    });
};

// --- Statistics & Home Hooks ---

export const useStats = () => {
    return useQuery({
        queryKey: ["stats"],
        queryFn: api.getStats,
        refetchInterval: 60000,
        keepPreviousData: true,
    });
};

export const useNextMeeting = () => {
    return useQuery({
        queryKey: ["next-meeting"],
        queryFn: api.getNextMeeting,
        refetchInterval: 60000,
        keepPreviousData: true,
    });
};

// --- Booking & Room Hooks ---

export const useRoomsStatus = () => {
    return useQuery({
        queryKey: ["rooms"],
        queryFn: api.getRoomsStatus,
        refetchInterval: 60000,
        keepPreviousData: true,
    });
};

export const useMyBookings = (type) => {
    return useQuery({
        queryKey: ["bookings", type],
        queryFn: () => api.getMyBookings(type),
        keepPreviousData: true,
    });
};

export const useBookRoom = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: api.bookRoom,
        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: query =>
                    ["bookings", "stats", "next-meeting", "rooms"].includes(query.queryKey[0])
            });

        },
    });
};

export const useRescheduleBooking = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ bookingId, bookingData }) => api.rescheduleBooking(bookingId, bookingData),
        onSuccess: () => {
            queryClient.invalidateQueries(["bookings", "upcoming"]);
            queryClient.invalidateQueries(["next-meeting"]);
            queryClient.invalidateQueries(["rooms"]);
        },
    });
};

export const useCancelBooking = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: api.cancelBooking,
        onSuccess: () => {
            queryClient.invalidateQueries(["bookings", "upcoming"]);
            queryClient.invalidateQueries(["next-meeting"]);
            queryClient.invalidateQueries(["rooms"]);
        },
    });
};

// --- Calendar Hooks ---

export const useCalendarEvents = (month) => {
    return useQuery({
        queryKey: ["calendar", month],
        queryFn: () => api.getCalendarEvents(month),
        enabled: !!month,
    });
};

// --- Profile Hooks ---

export const useProfileStats = () => {
    return useQuery({
        queryKey: ["profile-stats"],
        queryFn: api.getProfileStats,
    });
};