import React from 'react'
import Link from "next/link"
import Image from "next/image"
import { auth } from '@/lib/better-auth/auth'
import { headers } from "next/headers"
import { redirect } from 'next/navigation' 

const layout = async ({children} : {children : React.ReactNode}) => {
    const session = await auth.api.getSession({headers: await headers()})
    
    if(session?.user) redirect('/');
  return (
    <main className='auth-layout'>
        <section className='auth-left-section scrollbar-hide-default'>
            <Link href = "/" className='auth-logo'>
                <Image src = "/assets/images/logo1.png" alt = "seeStock logo" width = {140} height = {32} className = "h-8 w-auto" />
                <div className="text-white font-bold text-lg bg-clip-text shadow-md">
                    seeStock
                </div>
            </Link >
            <div className='pb-6 lg:pb-8 flex-1'>{ children }</div>
        </section>
        <section className='auth-right-section'>
            <div className='z-10 relative lg:mt-2 lg:mb-16'>
                <blockquote className='auth-blockquote'>
                    seeStock turned my watchilst into a winning list, and I have had a wonderful experience in using seeStock 
                    and making my financial decisions wonderful
                </blockquote>
                <div className='flex items-center justify-between'>
                    <div>
                        <cite className='auth-testimonial-author'>-Shivam Kapoor</cite>
                        <p className='max-d:text-xs text-gray-500'>Retail Investor</p>
                    </div>
                    <div className='flex items-center gap-0.5'>
                        {[1,2,3,4,5].map(
                            (star) => (
                                <Image src="/assets/icons/star.svg" alt = "Star" key = {star} width = {20} height = {20} className='w-5 h-5' />
                            ))}
                    </div>
                </div>
            </div>

            <div className='flex-1 relative'>
                <Image src = "/assets/images/logo1.png" alt = "aisa-nhi-hoga" width={100} height={750} className='auth-dashboard-preview absolute top-0'/>
            </div>
        </section>
    </main>
  )
}

export default layout