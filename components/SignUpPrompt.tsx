"use client"

import React from 'react'
import SignUpModal from './modals/SignUpModal'
import LogInModal from './modals/LogInModal'
import { useSelector } from 'react-redux'
import { RootState } from '@/redux/store'

export default function SignUpPrompt() {
  const name = useSelector((state: RootState) => state.user.name)

  return (
    !name &&
    <div className='fixed w-full h-[80px] bg-amber-400 bottom-0
      flex justify-center lg:justify-between items-center md:space-x-5 lg:px-20 xl:px-40 2xl:px-80'>
      <div className='hidden md:flex flex-col text-white'>
        <span className='text-xl font-bold'>Don't go blind on the SocialEyes</span>
        <span>Socialze on SocialEyes</span>
      </div>
      <div className='flex space-x-2 w-full md:w-fit p-3'>
        <LogInModal />
        <SignUpModal />
      </div>
    </div>

  )
}
