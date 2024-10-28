import Link from 'next/link'
import React from 'react'
import { LuShoppingCart } from 'react-icons/lu'
import { RxHamburgerMenu } from 'react-icons/rx'

export const Sidebar = () => {
  return (
    <div className='col-span-1 md:col-span-3 bg-blue-700 text-gray-300 py-10 p-5 items-center'>
      <div className='flex items-center justify-between pb-10 text-white'>
        <RxHamburgerMenu size={30}/>
        <span className='font-extrabold text-2xl flex items-center'><LuShoppingCart />RebornStore</span>
      </div>
      <div className='flex flex-col gap-4 text-lg items-center'>
        <Link href={"/"}>Home</Link>
        <Link href={"/dashboard"}>Product Dashboard</Link>
        <Link href={"/dashboard"}>User Dashboard</Link>
        <Link href={"/dashboard/orders"}>Orders</Link>
        <Link href={"/dashboard/orders"}>Settings</Link>
      </div>
    </div>
  )
}
