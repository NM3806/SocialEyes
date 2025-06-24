"use client"

import { Modal } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { closeLogInModal, openLogInModal } from '@/redux/slices/modalSlice'
import { EyeIcon, EyeSlashIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/firebase'

export default function LogInModal() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const isOpen = useSelector((state: RootState) =>
        state.modals.logInModalOpen
    );
    const dispatch: AppDispatch = useDispatch();

    async function handleLogIn() {
        await signInWithEmailAndPassword(auth, email, password)
    }

    // Log In as Guest
    async function handleGuestLogIn() {
        await signInWithEmailAndPassword(auth, "guest@gmail.com", "123456")
    }

    return (
        <>
            <button
                className='w-full h-12 md:w-22 md:h-10 text-md md:text-sm border-2 border-gray-100 rounded-full 
                        text-white font-bold cursor-pointer hover:bg-white/25 transition outline-none'

                onClick={() => dispatch(openLogInModal())}
            >Log In</button>

            <Modal open={isOpen}
                // onClose={handleClose}
                onClose={
                    () => dispatch(closeLogInModal())
                }
                className='flex justify-center items-center'
            >
                <div className='w-full h-full sm:w-150 sm:h-fit bg-white
                sm:rounded-xl'>
                    <XMarkIcon className='w-7 mt-5 ms-5 cursor-pointer'
                        onClick={() => dispatch(closeLogInModal())} />


                    <div className="pt-10 pb-20 px-4 sm:px-20 ">
                        <h1 className='text-3xl font-bold mb-10'>Log In to SocialEyes</h1>
                        <div className='w-full space-y-5 mb-10'>

                            <input placeholder='Email'
                                type="text"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                className='w-full h-14 border border-gray-200 outline-none
                            ps-3 rounded-sm focus:border-amber-400 transition' />

                            <div className='w-full h-14 border border-gray-200 outline-none
                            rounded-sm focus-within:border-amber-400 transition overflow-hidden
                            flex items-center justify-between pe-3'>

                                <input placeholder='Password'
                                    type={showPassword ? "text" : "password"}
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    className='w-full h-full ps-3 outline-none' />

                                <div onClick={() => setShowPassword(!showPassword)}
                                    className='w-7 h-7 text-gray-400 cursor-pointer'>
                                    {showPassword ? <EyeSlashIcon className='hover:' /> : <EyeIcon />}
                                </div>
                            </div>

                            <div className='flex flex-col items-center space-y-5 py-3'>
                                <button
                                    onClick={() => handleLogIn()}
                                    className='w-full h-12 text-md rounded-full 
                                    bg-amber-400 text-white font-bold cursor-pointer hover:bg-amber-400/75 transition'
                                >
                                    Log In
                                </button>
                                <h1 className='text-xl'>or</h1>
                                <button
                                onClick={handleGuestLogIn}
                                    className='w-full h-12 text-md rounded-full 
                                    bg-amber-400 text-white font-bold cursor-pointer hover:bg-amber-400/75 transition'
                                >
                                    Log In as Guest
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}
