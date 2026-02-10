import { baseApi } from "@/redux/api/baseApi";

export const promotionApi = baseApi.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        // Get organizer promotion statistics
        getOrganizerPromotionStats: builder.query({
            query: () => ({
                url: "/stats/organizer/promotions",
                method: "GET",
            }),
            providesTags: ["PromotionStats"],
        }),

        // Get my promotions with pagination
        getMyPromotions: builder.query({
            query: (params?: { page?: number; limit?: number }) => ({
                url: "/promotion/my-promotions",
                method: "GET",
                params: {
                    page: params?.page || 1,
                    limit: params?.limit || 10,
                },
            }),
            providesTags: ["Promotion"],
        }),

        // Get promotion by ID
        getPromotionById: builder.query({
            query: (id: string) => ({
                url: `/promotion/${id}`,
                method: "GET",
            }),
            providesTags: (result, error, id) => [{ type: "Promotion", id }],
        }),

        // Create new promotion
        createPromotion: builder.mutation({
            query: (data: { code: string; description: string; discountType: string; discountValue: number; validUntil: string; usageLimit: number; isSingleUse: boolean }) => ({
                url: "/promotion",
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Promotion", "PromotionStats"],
        }),

        // Update promotion
        updatePromotion: builder.mutation({
            query: ({ id, data }: { id: string; data: any }) => ({
                url: `/promotion/${id}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: "Promotion", id }, "PromotionStats"],
        }),

        // Toggle promotion status (activate/deactivate)
        togglePromotionStatus: builder.mutation({
            query: (id: string) => ({
                url: `/promotion/${id}/toggle-status`,
                method: "PATCH",
            }),
            invalidatesTags: (result, error, id) => [{ type: "Promotion", id }, "PromotionStats"],
        }),
    }),
});

export const { useGetOrganizerPromotionStatsQuery, useGetMyPromotionsQuery, useGetPromotionByIdQuery, useCreatePromotionMutation, useUpdatePromotionMutation, useTogglePromotionStatusMutation } = promotionApi;
