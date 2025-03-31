import React from 'react'
import { Outlet } from 'react-router-dom'
import HeaderHome from '../component/HeaderHome'
import Footer from '../component/Footer'

type Props = {}

const HomeTemplate = (props: Props) => {
  return (
    <div>
        <HeaderHome/>
        <div className='content'>
            <Outlet/>
        </div>
        <Footer/>
    </div>
  )
}

export default HomeTemplate