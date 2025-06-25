import React from 'react'
import Sidebar from "@/components/Sidebar";
import SignUpPrompt from "@/components/SignUpPrompt";
import Widgets from "@/components/Widgets";
import { ArrowLeftIcon, ArrowUpTrayIcon, ChartBarIcon, 
    ChatBubbleOvalLeftEllipsisIcon, EllipsisHorizontalIcon, HeartIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import { PostHeader } from '@/components/Post';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase';

interface Comment {
    name: string;
    text: string;
    username: string;
}

const fetchPost = async (id: string) => {
    const postRef = doc(db, "posts", id);
    const postSnap = await getDoc(postRef);
    return postSnap.data();
};

export default async function Page(props: any) {
    const { id } = (await props).params;
    const post = await fetchPost(id);

    return (
        <>
            <div>
                <div className="text-black min-h-screen mx-auto flex justify-center">
                    <Sidebar />
                    <div className='flex-grow max-w-xl border-x border-gray-100'>

                        <div className='py-4 px-3 border-b-2 border-gray-100 font-bold 
                text-lg sm:text-xl sticky top-0 z-11 bg-opacity-80 backdrop-blur-sm
                flex items-center'>
                            <Link href="/">
                                <ArrowLeftIcon className='w-5 h-5 mr-10' />
                            </Link>
                            SocialEyes
                        </div>

                        <div className='flex flex-col p-3 space-y-5 border-b border-gray-100'>
                            <div className='flex justify-between items-center'>
                                <div className='flex space-x-3'>
                                    <Image
                                        src={"/profile-picture.png"}
                                        width={44}
                                        height={44}
                                        alt={"Logo"}
                                        className="rounded-4xl w-11 h-11 z-10"
                                    />
                                    <div className='flex flex-col'>
                                        <span className='font-bold inline-block whitespace-nowrap overflow-hidden
                        text-ellipsis max-w-[60px] min-[400px]:max-w-[100px] min-[500px]:max-w-[140px]
                        sm:max-w-[160px]'>
                                            {post?.name}
                                        </span>
                                        <span className='text-gray-400 inline-block whitespace-nowrap overflow-hidden
                        text-ellipsis max-w-[60px] min-[400px]:max-w-[100px] min-[500px]:max-w-[140px]
                        sm:max-w-[160px]'>
                                            @{post?.username}
                                        </span>
                                    </div>
                                </div>
                                <EllipsisHorizontalIcon className='w-5 h-5 cursor-pointer' />
                            </div>
                            <span>{post?.text}</span>
                        </div>

                        <div className='border-b border-gray-100 p-3'>
                            <span className='font-bold'>{post?.likes?.length ?? 0}</span> Likes
                        </div>

                        <div className='flex justify-evenly border-b border-gray-100 p-3 text-gray-500'>
                            <ChatBubbleOvalLeftEllipsisIcon className='w-5.5 h-5.5 cursor-not-allowed' />
                            <HeartIcon className='w-5.5 h-5.5 cursor-not-allowed' />
                            <ChartBarIcon className='w-5.5 h-5.5 cursor-not-allowed' />
                            <ArrowUpTrayIcon className='w-5.5 h-5.5 cursor-not-allowed' />
                        </div>

                        {
                            post?.comments?.map((comment: Comment, index: number) => (
                                <Comment
                                    key={index}
                                    name={comment.name}
                                    username={comment.username}
                                    text={comment.text}
                                />
                            ))
                        }
                    </div>
                    <Widgets />
                </div>
                <SignUpPrompt />
            </div>
        </>
    );
}

interface CommentProps {
    name: string;
    username: string;
    text: string;
}

function Comment({ name, username, text }: CommentProps) {
    return (
        <div className='border-b border-gray-100 pb-3'>
            <PostHeader
                name={name}
                username={username}
                text={text}
            />
            <div className='flex space-x-14 p-3 ms-16'>
                <ChatBubbleOvalLeftEllipsisIcon className='w-5 h-5' />
                <HeartIcon className='w-5 h-5' />
                <ChartBarIcon className='w-5 h-5 cursor-not-allowed' />
                <ArrowUpTrayIcon className='w-5 h-5 cursor-not-allowed' />
            </div>
        </div>
    );
}
