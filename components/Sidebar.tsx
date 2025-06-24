import React from "react";
import Image from 'next/image'
import {
  HomeIcon,
  BellIcon,
  InboxIcon,
  EllipsisHorizontalCircleIcon,
  MagnifyingGlassIcon,
  EyeIcon
} from "@heroicons/react/24/outline";
import SidebarUserInfo from "./SidebarUserInfo";

export default function Sidebar() {
  return (
    <nav className="hidden sm:flex flex-col sticky top-0 h-screen px-4 py-6 bg-white">
      <div className="relative flex flex-col h-full justify-between items-center">
        <div>
          <div className="mb-6 px-1">
            <img
              src="/logos/SocialEyes-amber.png"
              alt="SocialEyes logo"
              className="w-10 h-auto rounded-lg"
            />
          </div>
          <ul className="space-y-2">
            <SidebarLink Icon={HomeIcon} text="Home" />
            <SidebarLink Icon={MagnifyingGlassIcon} text="Search" />
            <SidebarLink Icon={EyeIcon} text="Explore" />
            <SidebarLink Icon={InboxIcon} text="Inbox" />
            <SidebarLink Icon={BellIcon} text="Notifications" />
            <SidebarLink Icon={EllipsisHorizontalCircleIcon} text="More" />
          </ul>
        </div>

        <SidebarUserInfo/>

      </div>
    </nav>
  );
}

interface SidebarLinkProps {
  text: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

function SidebarLink({ text, Icon }: SidebarLinkProps) {
  return (
    <li className="flex items-center px-3 py-2 hover:bg-amber-100 rounded-xl cursor-pointer transition-colors">
      <Icon className="h-6 w-6" />
      <span className="hidden pl-2 lg:inline text-base font-medium">{text}</span>
    </li>
  );
}
