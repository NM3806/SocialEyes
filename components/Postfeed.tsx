"use client"

import React, { useEffect, useState } from 'react'
import PostInput from './PostInput'
import Post from './Post'
import { collection, DocumentData, onSnapshot, orderBy, query, QueryDocumentSnapshot } from 'firebase/firestore'
import { db } from '@/firebase'
import { useDispatch } from 'react-redux'
import { closeLoadingScreen } from '@/redux/slices/loadingSlice'

export default function Postfeed() {
  const [posts, setPosts] = useState<QueryDocumentSnapshot<DocumentData, DocumentData>[]>([]);
  const dispatch = useDispatch() 

  useEffect(() => {
    const q = query(collection(db, "posts"), orderBy("timestamp", "desc"))
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const snapshotDocs = snapshot.docs

      setPosts(snapshotDocs)

      dispatch(closeLoadingScreen())
    })

    return unsubscribe
  }, [])

  return (
    <div className='flex-grow max-w-xl border-x border-gray-100'>
        <div className='py-4 px-3 border-b-2 border-gray-100 font-bold text-lg sm:text-xl sticky top-0 z-11 bg-opacity-80 backdrop-blur-sm'>
            Home
        </div>
        <PostInput/>

        {posts.map(post => <Post
          key = {post.id} 
          data = {post.data()}
          id = {post.id}
        />)}
        
    </div>
  )
}
