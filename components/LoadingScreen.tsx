"use client"

import { RootState } from '@/redux/store'
import { LinearProgress } from '@mui/material'
import Image from 'next/image'
import React from 'react'
import { useSelector } from 'react-redux'

export default function LoadingScreen() {
  const loadingScreenOpen = useSelector((state: RootState) => 
    state.loading.loadingScreenOpen
  )

  return (
    <div className={`fixed top-0 left-0 bottom-0 right-0 bg-white
        flex justify-center items-center transition ${loadingScreenOpen? 'opacity-100 z-50' : 'opacity-0 -z-50'} `}>
      <div className='flex flex-col items-center'>
        <Image
          src="/logos/SocialEyes-amber.png"
          width={120}
          height={120}
          alt="Logo"
          className="mb-5 rounded-3xl"
        />

        <h1 className='text-6xl font-bold mb-10'>
          Social<span className='text-amber-400'>Eyes</span>
        </h1>

        <LinearProgress sx={{
           width: '100%',
           height: 10,
           backgroundColor: '#FEE3AA',
           "& .MuiLinearProgress-bar": {
            backgroundColor: "black" 
           }
          }}/>
      </div>
    </div>
  )
}
