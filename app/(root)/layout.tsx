import React from 'react'
import Header from "@/components/Header"

import { Toaster } from "@/components/ui/sonner"
import { auth } from "@/lib/better-auth/auth" 
import {redirect} from "next/navigation"
import { headers } from 'next/headers'

const layout = async ({children} : {children : React.ReactNode}) => {
  // Next.js App Router mein headers() ek async function hai jo current request ke HTTP headers return karta hai. 
  // Yeh headers mein authentication cookies hoti hain (session tokens).
  // Headers se session cookie extract karta hai (e.g., better_auth.session_token)
  // Cookie signature verify karta hai using your secret key
  // Database se session data fetch karta hai aur check karta hai ki session valid hai ya expired
  // User object return karta hai agar sab valid hai, warna null

  const session = await auth.api.getSession( { headers : await headers() } );
  if(!session?.user) redirect('sign-in');

  const user = {
    id : session.user.id,
    name : session.user.name,
    email : session.user.email,
  }

  return (
    <main className='min-h-screen text-gray-400'>
        <Header
          user = {user}
        />
        <div className="container py-10">
            {children}
            <Toaster />
        </div>
    </main>
  )
}

export default layout