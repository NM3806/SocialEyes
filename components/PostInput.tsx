"use client"

import React, { useState } from "react";
import Image from "next/image";
import {
  CalendarIcon,
  ChartBarIcon,
  FaceSmileIcon,
  MapPinIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { addDoc, arrayUnion, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { closeCommentModal, openLogInModal } from "@/redux/slices/modalSlice";

interface PostInputProps {
  insideModal?: boolean
}

export default function PostInput({ insideModal }: PostInputProps) {
  const [text, setText] = useState("");
  const user = useSelector((state: RootState) => state.user);
  const commentDetails = useSelector((state: RootState) =>
    state.modals.commentPostDetails
  );
  const dispatch = useDispatch();

  async function sendPost() {
    if(!user.username){
      dispatch(openLogInModal())
      return;
    }

    await addDoc(collection(db, "posts"), {
      text: text,
      name: user.name,
      username: user.username,
      timestamp: serverTimestamp(),
      likes: [],
      comments: [],
    });

    setText('');
  }

  async function sendComment() {
    const postRef = doc(db, "posts", commentDetails.id)

    await updateDoc(postRef, {
      comments: arrayUnion({
        name: user.name,
        username: user.username,
        text: text,
      })
    })

    setText('');
    dispatch(closeCommentModal());
  }

  return (
    <div className="flex space-x-5 p-4 border-gray-100 bg-white">
      <Image
        src={insideModal ? "/profile-picture.png" : "/logos/SocialEyes-amber.png"}
        width={44}
        height={44}
        alt={insideModal ? "pfp" : "Logo"}
        className="rounded-4xl w-11 h-11 z-10"
      />
      <div className="flex-grow">
        <textarea
          className="w-full resize-none outline-none min-h-[60px] text-lg bg-transparent 
          placeholder-gray-400 border-b-2 border-gray-100"

          placeholder={insideModal ? "Send your reply" : "What's catching your eye today?"}

          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <div className="flex items-center justify-between mt-3 pt-3">
          <div className="flex space-x-2 text-amber-400">
            <PhotoIcon className="w-[22px] h-[22px] cursor-pointer" />
            <ChartBarIcon className="w-[22px] h-[22px] cursor-pointer" />
            <FaceSmileIcon className="w-[22px] h-[22px] cursor-pointer" />
            <CalendarIcon className="w-[22px] h-[22px] cursor-pointer" />
            <MapPinIcon className="w-[22px] h-[22px] cursor-pointer" />
          </div>

          <button
            disabled={!text}
            onClick={() => insideModal ? sendComment() : sendPost()}
            className="bg-amber-400 hover:bg-amber-500 text-white font-semibold px-4 py-1.5 rounded-full text-sm transition cursor-pointer
            disabled:bg-opacity-60"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
}
