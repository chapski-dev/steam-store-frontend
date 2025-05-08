import React, { FC } from 'react'
import Footer from './Footer'
import { Header } from './Header'

export const MainLayout:FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className='flex h-full w-full flex-col'>
      <Header />
      {children}
      <Footer />
    </div>
  )
}
