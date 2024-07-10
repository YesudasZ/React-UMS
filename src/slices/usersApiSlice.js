import { apiSlice } from "./apiSlice";

const USER_URL = "/api/users";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/auth`,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: ({ id, data }) => ({
        url: `${USER_URL}?${new URLSearchParams({ id }).toString()}`,
        method: "POST",
        body: data,
        formData: true,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
      }),
    }),
    update: builder.mutation({
      query: ({ id, data }) => ({
        url: `${USER_URL}/profile/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateMutation,
} = userApiSlice;
