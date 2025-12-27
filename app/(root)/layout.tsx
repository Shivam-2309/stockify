import React from 'react'

const layout = ({children} : {children : React.ReactNode}) => {
  return (
    <main>
        <div className="container py-10">
            {/*Header*/}
            {children}
        </div>
    </main>
  )
}

export default layout