import Link from 'next/link'
import React from 'react'
import { AiOutlineDashboard } from 'react-icons/ai'
import { BiPurchaseTag } from 'react-icons/bi'
import { FaUsersCog } from 'react-icons/fa'
import { GiCampCookingPot } from 'react-icons/gi'
import { IoSettingsOutline } from 'react-icons/io5'
import { RxHamburgerMenu } from 'react-icons/rx'

export const Sidebar = () => {
  return (
    <div className='col-span-1 md:col-span-3 bg-green-900 text-gray-300 py-10 p-5 items-center'>
      <div className='flex items-center justify-between pb-10 text-white'>
        <RxHamburgerMenu size={20}/>
        <span className='font-extrabold text-2xl flex items-center'><GiCampCookingPot />DaimasKitchen</span>
      </div>
      <div className='flex flex-col gap-3 text-lg'>
        <Link href={"/dashboard"} className='flex items-center gap-1 hover:bg-white/30 p-2 hover:text-white hover:rounded transition-all duration-300'><AiOutlineDashboard />Dashboard</Link>
        <Link href={"/dashboard"} className='flex items-center gap-1 hover:bg-white/30 p-2 hover:text-white hover:rounded transition-all duration-300'><FaUsersCog />Customer Management</Link>
        <Link href={"/dashboard/orders"} className='flex items-center gap-1 hover:bg-white/30 p-2 hover:text-white hover:rounded transition-all duration-300'><BiPurchaseTag   />Orders</Link>
        <Link href={"/dashboard/orders"} className='flex items-center gap-1 hover:bg-white/30 p-2 hover:text-white hover:rounded transition-all duration-300'><IoSettingsOutline />Settings</Link>
      </div>
    </div>
  )
}
