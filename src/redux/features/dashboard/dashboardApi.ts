import { baseApi } from "@/redux/api/baseApi";

export const dashboardApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getAdminUsersStats: builder.query({
            query: () => ({
                url: "/stats/admin/users",
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["Dashboard"],
        }),

        getAdminDashboardStats: builder.query({
            query: () => ({
                url: "/stats/admin/dashboard",
                method: "GET",
                credentials: "include",
            }),
            providesTags: ["Dashboard"],
        }),

        getEventAnalytics: builder.query({
            query: (eventId: string) => ({
                url: `/stats/analytics/${eventId}`,
                method: "GET",
            }),
            providesTags: (result, error, eventId) => [{ type: "EventAnalytics", id: eventId }],
        }),
    }),
});

export const { useGetAdminUsersStatsQuery, useGetAdminDashboardStatsQuery, useGetEventAnalyticsQuery } = dashboardApi;
