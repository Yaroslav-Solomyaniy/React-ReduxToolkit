import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import {IPost} from "../store/models/IPost";

export const postAPI = createApi({
    reducerPath: 'postAPI',
    baseQuery: fetchBaseQuery({baseUrl: "http://localhost:500"}),
    tagTypes: ['POST'],
    endpoints: (build) => ({
       fetchAllPosts: build.query<IPost[],number>({
           query: (limit: number = 5)=> ({
               url: `/posts`,
               params: {
                   _limit: limit
               }
           }),
           providesTags: result => ['POST']
       }),
        createPost: build.mutation<IPost, IPost>({
            query: (post)=> ({
                url: `/posts`,
               method: 'POST',
                body: post
            }),
            invalidatesTags: result => ['POST']
        }),
        updatePost: build.mutation<IPost, IPost>({
            query: (post)=> ({
                url: `/posts/${post.id}`,
                method: 'PUT',
                body: post
            }),
            invalidatesTags: result => ['POST']
        }),
        deletePost: build.mutation<IPost, IPost>({
            query: (post)=> ({
                url: `/posts/${post.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: result => ['POST']
        }),


    })
})

export const {useFetchAllPostsQuery} = postAPI
