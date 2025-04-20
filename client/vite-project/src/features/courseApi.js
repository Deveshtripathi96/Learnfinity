import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_API = "http://localhost:8080/api/v1/course";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: COURSE_API,
    credentials: "include",
  }),
  tagTypes: ["Refetch_creator_course","Refetch_Lecture"],
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: ({ Title, category }) => ({
        url: "",
        method: "POST",
        body: { Title, category },
      }),
      invalidatesTags: ["Refetch_creator_course"],
    }),
    getCreatorCourse: builder.query({
      query: () => ({
        url: "",
        method: "GET",
      }),
      providesTags: ["Refetch_creator_course"],
    }),
    editCourse: builder.mutation({
      query: ({ formdata, courseId }) => ({
        url: `/${courseId}`,
        method: "PUT",
        body: formdata,
      }),
      invalidatesTags: ["Refetch_creator_course"],
    }),
    getCourseById: builder.query({
      query: (courseId) => ({
        url: `/${courseId}`,
        method: "GET",
      }),
    }),
    createLecture: builder.mutation({
      query: ({ lectureTitle, courseId }) => ({
        url: `/${courseId}/lecture`,
        method: "POST",
        body: { lectureTitle },
      }),
    }),
    getCourseLecture: builder.query({
      query: (courseId) => ({
        url: `/${courseId}/lecture`,
        method: "GET",
      }),
      providesTags: ["Refetch_Lecture"],
    }),
    editLecture: builder.mutation({
      query: ({lectureTitle,videoInfo,isPreviewFree,courseId,lectureId}) => ({
        url: `/${courseId}/lecture/${lectureId}`,
        method: "POST",
        body:{lectureTitle,videoInfo,isPreviewFree}
      }),
    }),
    removeLecture: builder.mutation({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Refetch_Lecture"],
    }),
    getLectureById: builder.query({
      query: (lectureId) => ({
        url: `/lecture/${lectureId}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetCreatorCourseQuery,
  useEditCourseMutation,
  useGetCourseByIdQuery,
  useCreateLectureMutation,
  useGetCourseLectureQuery,
  useEditLectureMutation,
  useRemoveLectureMutation,
  useGetLectureByIdQuery
} = courseApi;
