import { baseApi } from "../../api/baseApi";

export const recipeApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getRecipes: builder.query({
            query: (params) => {
                return {
                    url: "/recipe",
                    method: "GET",
                    params: params,
                };
            },
            providesTags: ["Recipe"],
        }),
    }),
});

export const { useGetRecipesQuery } = recipeApi;
