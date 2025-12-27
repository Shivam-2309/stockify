import React from 'react'
import Header from "@/components/Header"

const layout = ({children} : {children : React.ReactNode}) => {
  return (
    <main>
        <div className="container py-10">
            {/*Header*/}
            <Header />
            {children}
        </div>
    </main>
  )
}

export default layout