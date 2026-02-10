import { baseApi } from "@/redux/api/baseApi";

export interface ChatMessage {
    id: string;
    userId: string;
    userProfile: {
        name: string;
        avatar?: string;
    };
    message: string;
    messageType: string;
    formattedTime: string;
    likes: number;
    hasLiked: boolean;
    createdAt: string;
}

export interface SendMessageRequest {
    message: string;
}

export interface ChatParticipantsResponse {
    total: number;
    participants: Array<{
        name: string;
        avatar?: string;
        id: string;
    }>;
}

export const streamChatApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        // Get chat messages
        getChatMessages: builder.query({
            query: ({ streamId, limit = 50 }: { streamId: string; limit?: number }) => ({
                url: `/chatmessage/${streamId}/messages`,
                method: "GET",
                params: { limit },
            }),
            providesTags: ["ChatMessages"],
        }),

        // Send message
        sendMessage: builder.mutation({
            query: ({ streamId, message }: { streamId: string; message: string }) => ({
                url: `/chatmessage/${streamId}/messages`,
                method: "POST",
                body: { message },
            }),
            invalidatesTags: ["ChatMessages"],
        }),

        // Get chat participants
        getChatParticipants: builder.query({
            query: (streamId: string) => ({
                url: `/chatmessage/${streamId}/participants`,
                method: "GET",
            }),
            providesTags: ["ChatParticipants"],
        }),
    }),
});

export const { useGetChatMessagesQuery, useSendMessageMutation, useGetChatParticipantsQuery, useLazyGetChatParticipantsQuery } = streamChatApi;
