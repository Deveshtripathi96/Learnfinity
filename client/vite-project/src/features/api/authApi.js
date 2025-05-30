import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../authSlice";
import { Form } from "react-router-dom";
import { toast } from "sonner";


const USER_API="http://localhost:8080/api/v1/user/"

export const authApi=createApi({
    reducerPath:"authApi",
    baseQuery:fetchBaseQuery({
        baseUrl:USER_API,
        credentials:'include'

    }),
    endpoints:(builder)=>({
        registerUser:builder.mutation({
            query:(inputData)=>({
                url:"register",
                method:"POST",
                body:inputData
            })

           
        }),
        loginUser:builder.mutation({
            query:(inputData)=>({
                url:"login",
                method:"POST",
                body:inputData,
                 credentials: "include", // 👈 required if using cookies/session
            }),
            async onQueryStarted(arg,{queryFulfilled,dispatch}){
                try {
                    const result=await queryFulfilled;
                     console.log("Login Success:", result.data); // ✅ Check this
                    dispatch(userLoggedIn({user:result.data.user}));
                      toast.success(result.data.message); // ✅ Show toast here if needed
                } catch (error) {
                    console.log(error);
                      toast.error("Login failed");
                }
            }

           
        }),
        loadUser:builder.query({
            query:()=>({
                url:"profile",
                method:"GET",
            }),
            async onQueryStarted(arg,{queryFulfilled,dispatch}){
                try {
                    const result=await queryFulfilled;
                    dispatch(userLoggedIn({user:result.data.user}));
                } catch (error) {
                    console.log(error);
                }
            }

        }),
        updateUser:builder.mutation({
            query:(formData)=>({
            url:"profile/update",
            method:"PUT",
            body:formData,
            credentials:"include"
            })
        }),
        logoutUser:builder.mutation({
            query:()=>({
                url:"logout",
                method:"GET",
            })
        })
       
         
        

    })

    
})

export const {useRegisterUserMutation,useLoginUserMutation,useLoadUserQuery,useUpdateUserMutation,useLogoutUserMutation}=authApi;
