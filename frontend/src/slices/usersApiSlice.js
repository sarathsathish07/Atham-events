import { apiSlice } from "./apiSlice.js";

const USERS_URL = '/api/users'

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder)=>({
    login: builder.mutation({
      query: (data)=>({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data
      })
    }),
    register: builder.mutation({
      query: (data)=>({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data
      })
    }),
    logout: builder.mutation({
      query: ()=>({
        url: `${USERS_URL}/logout`,
        method: 'POST'
      })
    }),
    updateUser: builder.mutation({
      query: (data)=>({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data
      })
    }),
    fetchCategory: builder.query({
      query: () => `${USERS_URL}/categories`,
    }),
    fetchItemsByCategory: builder.query({
      query: (categoryId) => `${USERS_URL}/categories/${categoryId}/items`,
    }),
    submitSelection: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/save`,
        method: 'POST',
        body: data
      })
    }),
    fetchAllCategoriesWithItems: builder.query({
      query: () => `${USERS_URL}/categories-with-items`, 
    }),
    
  
  })
})


export const { 
  useLoginMutation, 
  useLogoutMutation,
  useRegisterMutation, 
  useUpdateUserMutation,
  useFetchCategoryQuery,
  useFetchItemsByCategoryQuery ,
  useSubmitSelectionMutation,
  useFetchAllCategoriesWithItemsQuery
} = usersApiSlice