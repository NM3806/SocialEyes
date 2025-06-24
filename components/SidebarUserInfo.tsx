"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase"
import { signOutUser } from '@/redux/slices/userSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { closeLogInModal, closeSignUpModal } from '@/redux/slices/modalSlice';

export default function SidebarUserInfo() {
  const dispatch: AppDispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const [showLogout, setShowLogout] = useState(false);

  async function handleSignout() {
    await signOut(auth);
    dispatch(signOutUser());

    dispatch(closeSignUpModal())
    dispatch(closeLogInModal())
  }

  return (
    <div
      onMouseEnter={() => setShowLogout(true)}
      onMouseLeave={() => setShowLogout(false)}
      className="relative"
    >
      {/* Profile row */}
      <div className="w-fit xl:w-37 flex items-center justify-start p-2 rounded-3xl 
      hover:bg-gray-100 transition cursor-pointer">
        <Image
          src="/profile-picture.png"
          width={36}
          height={36}
          alt="Profile picture"
          className="rounded-full"
        />
        <div className="hidden lg:flex flex-col text-sm pl-2 max-w-40">
          <span className="whitespace-nowrap text-ellipsis font-semibold overflow-hidden">{user.name}</span>
          <span className="whitespace-nowrap text-ellipsis text-gray-500 text-xs overflow-hidden">@{user.username}</span>
        </div>
      </div>

      {/* Logout Button */}
      <div
        onClick={handleSignout}
        className={`
          absolute -top-3 -right-3 z-50 bg-red-500 text-white text-xs px-2 py-1 
          rounded-xl shadow hover:bg-red-600 hover:font-bold transition-all duration-300 ease-in-out cursor-pointer
          ${showLogout ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-2 scale-95 pointer-events-none"}
        `}
      >
        Logout
      </div>
    </div>
  );
}
