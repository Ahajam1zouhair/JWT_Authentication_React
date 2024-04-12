import { apiSlice } from "../../api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  
  endpoints: (build) => ({
    register: build.mutation({
      query: (date) => ({
        url: "/api/user/register",
        method: "POST",
        body: date,
      }),
    }),
    login: build.mutation({
      query: (date) => ({
        url: "/api/user/login",
        method: "POST",
        body: date,
      }),
    }),
  }),
});

export const { useRegisterMutation , useLoginMutation } = authApiSlice;
