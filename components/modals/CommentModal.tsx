'use client'

import { closeCommentModal } from '@/redux/slices/modalSlice'
import { RootState } from '@/redux/store'
import { Modal } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { PostHeader } from '../Post'
import PostInput from '../PostInput'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function CommentModal() {
  const open = useSelector((state: RootState) => state.modals.commentModalOpen);
  const commentDetails = useSelector((state: RootState) =>
    state.modals.commentPostDetails
  );
  const dispatch = useDispatch();

  return (
    <>
      <Modal
        open={open} onClose={() => dispatch(closeCommentModal())}
        className='flex justify-center items-center'
      >
        <div className='w-full h-full sm:w-150 sm:h-fit bg-white sm:rounded-xl 
         outline-none relative'>
          <XMarkIcon className='w-7 mt-5 ms-5 cursor-pointer'
            onClick={() => dispatch(closeCommentModal())} />

          <div className='pt-5 pb-10 px-0 sm:px-5 flex flex-col'>
            <PostHeader
              username={commentDetails.name}
              name={commentDetails.username}
              text={commentDetails.text}
              replyTo={commentDetails.username}
            />
            <div className='mt-4'>
              <PostInput
                insideModal={true}
              />
            </div>

            <div className='absolute w-0.5 h-32 bg-gray-300 left-9 sm:left-14 top-20'></div>
          </div>
        </div>
      </Modal>
    </>
  )
}
