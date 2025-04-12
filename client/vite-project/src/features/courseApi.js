import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_API = "http://localhost:8080/api/v1/course";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_API,
    credentials: "include",
  }),
  tagTypes:['Refetch_creator_course'],
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: ({ Title, category }) => ({
        url: "",
        method: "POST",
        body: {Title, category },
      }),
      invalidatesTags: ['Refetch_creator_course'],
    }),
    getCreatorCourse: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ['Refetch_creator_course'],
    }),
  }),
});

export const{useCreateCourseMutation,useGetCreatorCourseQuery} = courseApi
