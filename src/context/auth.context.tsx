import React, { createContext, useState } from "react"
import type { IUser } from "../types/login.types"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getProfile } from "../api/auth.api"

type IAuthContext = {
    user: null | IUser,
    isLoading: boolean,
    isAuthenticated: boolean,
    setUser: (user: IUser | null) => void  // ✅ added
}

const initialValues: IAuthContext = {
    user: null,
    isLoading: false,
    isAuthenticated: false,
    setUser: () => {}  // ✅ empty default
}

export const AuthContext = createContext<IAuthContext>(initialValues)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const queryClient = useQueryClient()

    const { isLoading, data } = useQuery({
        queryFn: getProfile,
        queryKey: ['get-profile'],
        retry: false
    })

    const setUser = (user: IUser | null) => {
        // invalidate the profile query so it refetches on next load
        queryClient.setQueryData(['get-profile'], user ? { data: user } : null)
    }

    return (
        <AuthContext.Provider value={{
            user: data?.data || null,
            isLoading,
            isAuthenticated: !!data?.data,
            setUser
        }}>
            {children}
        </AuthContext.Provider>
    )
}