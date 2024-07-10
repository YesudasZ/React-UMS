import { apiSlice } from "./apiSlice";

const ADMIN_URL = "/api/admin";

export const adminApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.mutation({
      query: () => ({
        url: `${ADMIN_URL}/getUsers`,
        method: "GET",
      }),
    }),
    seachUser: builder.mutation({
      query: ({ query }) => ({
        url: `${ADMIN_URL}/searchUser?query=${query}`,
        method: "GET",
      }),
    }),
    viewUser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/viewUser/${data}`,
        method: "GET",
      }),
    }),
    deleteUser: builder.mutation({
      query: (data) => ({
        url: `${ADMIN_URL}/deleteUser/${data}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useDeleteUserMutation,
  useGetUsersMutation,
  useSeachUserMutation,
  useViewUserMutation,
} = adminApiSlice;
