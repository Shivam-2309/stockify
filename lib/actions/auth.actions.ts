'use server'

import { auth } from "../better-auth/auth";
import {inngest} from "@/lib/inngest/client";
import { headers } from 'next/headers'

export const signUpWithEmail = async ({email, password, fullName, country, investmentGoals, riskTolerance, preferredIndustry} : SignUpFormData) => {
    try {
        const response = await auth.api.signUpEmail({
            body : {email: email, password: password, name: fullName}
        })

        if(response){
            await inngest.send({
                name : 'app/user.created',
                data: {
                    email : email,
                    name : fullName,
                    country, 
                    investmentGoals, 
                    riskTolerance,
                    preferredIndustry
                }
            })
        }

        return { success: true, data: response }
    }
    catch(err){
        console.log('Sign up failed', err);
        return {success: false, error: 'Sign up failed'}
    }
}

export const signOut = async () => {
    try {
        await auth.api.signOut({headers : await headers()})
    }catch(err){
        console.log('Sign Out Failed', err)
        return {success : false, error : 'Sign out failed'}
    }
}

export const signInWithEmail = async ({email, password} : SignInFormData) => {
    try {
        const response = await auth.api.signInEmail({
            body : {email: email, password: password}
        })

        return { success: true, data: response }
    }
    catch(err){
        console.log('Sign In failed', err);
        return {success: false, error: 'Sign In failed'}
    }
}