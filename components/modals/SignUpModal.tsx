"use client"

import { Modal } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/redux/store'
import { closeSignUpModal, openSignUpModal } from '@/redux/slices/modalSlice'
import { EyeIcon, EyeSlashIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '@/firebase'
import { signInUser } from '@/redux/slices/userSlice'

export default function SignUpModal() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // const [isOpen, setIsOpen] = useState(false);

    // const handleOpen = () => {
    //     setIsOpen(true);
    // }

    // const handleClose = () => {
    //     setIsOpen(false);
    // }

    const isOpen = useSelector((state: RootState) =>
        state.modals.signUpModalOpen
    );
    const dispatch: AppDispatch = useDispatch();

    async function handleSignUp() {
        console.log({ email, password });
        const userCredentials = await createUserWithEmailAndPassword(
            auth,
            email,
            password,
        );

        await updateProfile(userCredentials.user, {
            displayName: name
        })

        dispatch(signInUser({
            name: userCredentials.user.displayName,
            username: userCredentials.user.email!.split("@")[0],
            email: userCredentials.user.email,
            uid: userCredentials.user.uid
        }))
    }

    // Log In as Guest
        async function handleGuestLogIn() {
            await signInWithEmailAndPassword(auth, "guest@gmail.com", "123456")
        }
    

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (!currentUser) return;

            // handle Redux actions
            dispatch(signInUser({
                name: currentUser.displayName,
                username: currentUser.email!.split("@")[0],
                email: currentUser.email,
                uid: currentUser.uid
            }))
        })

        return unsubscribe
    }, [])

    return (
        <>
            <button
                className='w-full h-12 md:w-22 md:h-10 text-md md:text-sm font-bold bg-white rounded-full cursor-pointer'
                // onClick={handleOpen}
                onClick={
                    () => dispatch(openSignUpModal())
                }
            >
                Sign Up
            </button>

            <Modal open={isOpen}
                // onClose={handleClose}
                onClose={
                    () => dispatch(closeSignUpModal())
                }
                className='flex justify-center items-center'
            >
                <div className='w-full h-full sm:w-150 sm:h-fit bg-white
                sm:rounded-xl'>
                    <XMarkIcon className='w-7 mt-5 ms-5 cursor-pointer'
                        onClick={() => dispatch(closeSignUpModal())} />


                    <div className="pt-10 pb-20 px-4 sm:px-20 ">
                        <h1 className='text-3xl font-bold mb-10'>Create your Account</h1>
                        <div className='w-full space-y-5 mb-10'>
                            <input type="text"
                                placeholder='Name'
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                                className='w-full h-14 border border-gray-200 outline-none
                                ps-3 rounded-sm focus:border-amber-400 transition'
                            />

                            <input type="text"
                                placeholder='Email'
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                className='w-full h-14 border border-gray-200 outline-none
                                ps-3 rounded-sm focus:border-amber-400 transition'
                            />

                            <div className='w-full h-14 border border-gray-200 outline-none
                            rounded-sm focus-within:border-amber-400 transition overflow-hidden
                            flex items-center justify-between pe-3'>

                                <input type={showPassword ? "text" : "password"}
                                    placeholder='Password'
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    className='w-full h-full ps-3 outline-none'
                                />

                                <div onClick={() => setShowPassword(!showPassword)}
                                    className='w-7 h-7 text-gray-400 cursor-pointer'>
                                    {showPassword ? <EyeSlashIcon className='hover:' /> : <EyeIcon />}
                                </div>
                            </div>

                            <div className='flex flex-col items-center space-y-5 py-3'>
                                <button
                                    onClick={handleSignUp}
                                    className='w-full h-12 text-md rounded-full 
                                    bg-amber-400 text-white font-bold cursor-pointer hover:bg-amber-400/75 transition'
                                >
                                    Sign Up
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
