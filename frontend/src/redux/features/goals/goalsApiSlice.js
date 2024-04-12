import { apiSlice } from "../../api/apiSlice";

export const goalsApiSlice = apiSlice.injectEndpoints({
  tagTypes: ["Goals"],
  endpoints: (build) => ({
    // Get All goals
    getGoals: build.query({
      query: () => "/api/goal",
      providesTags: ["Goals"],
    }),
    // Get goal by id
    getGoalById: build.mutation({
      query: (id) => ({
        url: `/api/goal/${id}`,
        method: "GET",
      }),
      invalidatesTags: ["Goals"],
    }),
    // Create New Goal
    createGoal: build.mutation({
      query: (date) => ({
        url: "/api/goal",
        method: "POST",
        body: date,
      }),
      invalidatesTags: ["Goals"],
    }),
    // Update  Goal
    updateGoal: build.mutation({
      query: ({ id, text  }) => ({
        url: `/api/goal/${id}`,
        method: "PUT",
        body: {text} ,
      }),
      invalidatesTags: ["Goals"],
    }),
    // Delate Goal
    deleteGoal: build.mutation({
      query: (id) => ({
        url: `/api/goal/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Goals"],
    }),
    // logout 
    logout: build.mutation({
      query: () => ({
        url: "/api/user/logout",
        method: "GET",
      }),
      invalidatesTags: ["Goals"],
    }),
  }),
});

export const {
  useGetGoalsQuery,
  useDeleteGoalMutation,
  useLogoutMutation,
  useCreateGoalMutation,
  useUpdateGoalMutation,
  useGetGoalByIdMutation,
} = goalsApiSlice;
