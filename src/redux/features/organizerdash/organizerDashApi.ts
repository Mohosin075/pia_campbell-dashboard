import { baseApi } from "@/redux/api/baseApi";

export const organizerDashApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getOrganizerDashboardStats: builder.query({
            query: () => ({
                url: "/stats/organizer/dashboard",
                method: "GET",
            }),
            providesTags: ["OrganizerDashboard"],
        }),
        getOrganizerEventStats: builder.query({
            query: () => ({
                url: "/stats/organizer/events",
                method: "GET",
            }),
            providesTags: ["OrganizerDashboard"],
        }),
        getTopRevenueEvents: builder.query({
            query: () => ({
                url: "/stats/organizer/top-revenue-events",
                method: "GET",
            }),
            providesTags: ["OrganizerDashboard"],
        }),
        getUpcomingEvents: builder.query({
            query: () => ({
                url: "/stats/organizer/upcoming-events",
                method: "GET",
            }),
            providesTags: ["OrganizerDashboard"],
        }),
        getEventStats: builder.query({
            query: (eventId: string) => ({
                url: `/stats/organizer/event/${eventId}`,
                method: "GET",
            }),
            providesTags: (result, error, eventId) => [{ type: "OrganizerDashboard", id: eventId }],
        }),
    }),
});

export const { useGetOrganizerDashboardStatsQuery, useGetOrganizerEventStatsQuery, useGetTopRevenueEventsQuery, useGetUpcomingEventsQuery, useGetEventStatsQuery } = organizerDashApi;
