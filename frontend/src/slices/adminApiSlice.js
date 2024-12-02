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

    })
})

export const {useAdminLoginMutation,useAdminLogoutMutation,useFetchCategoriesQuery,useAddCategoryMutation,useAddItemMutation }= admiApiSlice