import React from 'react'
import Image from 'next/image'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';
import { ArrowUpTrayIcon, ChartBarIcon, ChatBubbleOvalLeftEllipsisIcon, HeartIcon } from '@heroicons/react/24/outline'
import { arrayRemove, arrayUnion, doc, DocumentData, Timestamp, updateDoc } from 'firebase/firestore';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { openCommentModal, openLogInModal, setCommentDetails } from '@/redux/slices/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { RootState } from '@/redux/store';
import { db } from '@/firebase';

dayjs.extend(relativeTime);

interface PostProps {
  data: DocumentData;
  id: string;
}

export default function Post({ data, id }: PostProps) {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user)

  async function likePost() {
    if(!user.username) {
      dispatch(openLogInModal())
      return;
    }

    const postRef = doc(db, "posts", id)

    if (data.likes.includes(user.uid)) {
      await updateDoc(postRef, {
        likes: arrayRemove(user.uid)
      })
    }
    else {
      await updateDoc(postRef, {
        likes: arrayUnion(user.uid)
      })
    }
  }

  return (
    <div className='border-y border-gray-100'>
      <Link href={'/' + id}>
        <PostHeader
          username={data.username}
          name={data.name}
          timestamp={data.timestamp}
          text={data.text}
        />
      </Link>

      <div className='ml-16 p-3 flex space-x-14'>
        <div className='relative'>
          <ChatBubbleOvalLeftEllipsisIcon
            className='w-5.5 h-5.5 cursor-pointer hover:text-amber-400 transition'
            onClick={() => {
              if(!user.username) {
                dispatch(openLogInModal())
                return;
              }

              dispatch(setCommentDetails({
                name: data.name,
                username: data.username,
                id: id,
                text: data.text,
              }))

              dispatch(openCommentModal())
            }}
          />
          {
            data.comments.length > 0 &&
            <span className='absolute text-xs top-1 -right-3'>
              {data.comments.length}
            </span>
          }
        </div>

        <div className='relative'>
          {
            data.likes.includes(user.uid) ?

              <HeartSolidIcon
                className='w-5.5 h-5.5 cursor-pointer text-pink-500 transition'
                onClick={() => likePost()}
              />
              :
              <HeartIcon
                className='w-5.5 h-5.5 cursor-pointer hover:text-pink-500 transition'
                onClick={() => likePost()}
              />
          }
          {
            data.likes.length > 0 &&
            <span className='absolute text-xs top-1 -right-3'>
              {data.likes.length}
            </span>
          }
        </div>

        <div className='relative'>
          <ChartBarIcon
            className='w-5.5 h-5.5 cursor-not-allowed'
          />
        </div>

        <div className='relative'>
          <ArrowUpTrayIcon
            className='w-5.5 h-5.5 cursor-not-allowed'
          />
        </div>
      </div>
    </div>
  )
}

interface PostHeaderProps {
  username: string,
  name: string,
  timestamp?: Timestamp,
  text: string,
  replyTo?: string,
}

export function PostHeader({ username, name, timestamp, text, replyTo }: PostHeaderProps) {
  return (
    <div className='flex p-3 space-x-5'>
      <Image
        src="/profile-picture.png"
        width={44}
        height={44}
        alt="Profile picture"
        className="rounded-2xl w-11 h-11 z-10 ml-1"
      />

      <div className='text-sm flex flex-col space-y-1.5'>
        <div className='flex space-x-1.5'>
          <span className='font-bold inline-block whitespace-nowrap overflow-hidden
          text-ellipsis max-w-[60px] min-[400px]:max-w-[100px] min-[500px]:max-w-[140px]
          sm:max-w-[160px]'>
            {name}
          </span>
          <span className='text-gray-400 inline-block whitespace-nowrap overflow-hidden
          text-ellipsis max-w-[60px] min-[400px]:max-w-[100px] min-[500px]:max-w-[140px]
          sm:max-w-[160px]'>
            @{username}
          </span>
          <span className='text-gray-400'>
            {timestamp && (
              <>
                <span className='text-gray-400'>· </span>
                {timestamp?.toDate ? dayjs(timestamp.toDate()).fromNow() : 'just now'}
              </>
            )}

          </span>
        </div>
        <div>
          {text}
        </div>

        {replyTo && (
          <span className='text-sm text-gray-400'>
            Replying to <span className='text-amber-400'>@{replyTo}</span>
          </span>
        )}
      </div>
    </div>
  )
}
