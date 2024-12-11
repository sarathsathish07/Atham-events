import  {apiSlice} from './apiSlice.js'

const ADMIN_URL="/api/admin"

export const admiApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({

        adminLogin:builder.mutation({
            query:(data)=>({
               url:`${ADMIN_URL}/auth` ,
               method:'POST',
               body:data
            })
        }),
        adminLogout:builder.mutation({
            query:()=>({
               url:`${ADMIN_URL}/logout` ,
               method:'POST',
            })
        }),
        fetchCategories: builder.query({
            query: () => ({
                url: `${ADMIN_URL}/categories`,
                method: 'GET'
            }),
            providesTags: ['Category'],
        }),

        addCategory: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/categories`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['Category'],
        }),
        addItem: builder.mutation({
            query: (data) => ({
                url: `${ADMIN_URL}/add-items`,
                method: 'POST',
                body: data
            }),
        }),
        fetchSelections: builder.query({
            query: () => ({
                url: `${ADMIN_URL}/selections`, // Matches backend route
                method: "GET",
            }),
        }),
        fetchSelectionById: builder.query({
            query: (id) => ({
                url: `${ADMIN_URL}/selections/${id}`, // Matches backend route
                method: "GET",
            }),
        }),

    })
})

export const {useAdminLoginMutation,useAdminLogoutMutation,useFetchCategoriesQuery,useAddCategoryMutation,useAddItemMutation,useFetchSelectionsQuery, useFetchSelectionByIdQuery }= admiApiSlice