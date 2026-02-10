import { baseApi } from "@/redux/api/baseApi";

export const streamApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        // Create a new livestream
        createLivestream: builder.mutation({
            query: (streamData: { eventId: string; title: string; description: string; streamType?: string }) => ({
                url: "/livestream",
                method: "POST",
                body: {
                    ...streamData,
                    streamType: "public",
                },
            }),
            invalidatesTags: ["Livestream"],
        }),

        // Start a livestream
        startLivestream: builder.mutation({
            query: (streamId: string) => ({
                url: `/livestream/${streamId}/start`,
                method: "POST",
            }),
            invalidatesTags: (_result, _error, streamId) => [{ type: "Livestream", id: streamId }, "Livestream"],
        }),

        // End a livestream
        endLivestream: builder.mutation({
            query: (streamId: string) => ({
                url: `/livestream/${streamId}/end`,
                method: "POST",
            }),
            invalidatesTags: (_result, _error, streamId) => [{ type: "Livestream", id: streamId }, "Livestream"],
        }),

        // Get livestreams for an event
        getEventLivestreams: builder.query({
            query: (eventId: string) => ({
                url: `/livestream/event/${eventId}`,
                method: "GET",
            }),
            providesTags: ["Livestream"],
        }),
        getAgoraToken: builder.query({
            query: (streamId: string) => ({
                url: `/livestream/${streamId}/token?role=broadcaster`,
                method: "GET",
            }),
        }),
    }),
});

export const { useCreateLivestreamMutation, useStartLivestreamMutation, useEndLivestreamMutation, useGetEventLivestreamsQuery, useLazyGetAgoraTokenQuery } = streamApi;
