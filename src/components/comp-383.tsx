"use client"

import { useState } from "react"
import { Bell } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

const initialNotifications = [
  {
    id: 1,
    image: "/avatar-80-01.jpg",
    user: "Chris Tompson",
    action: "requested review on",
    target: "PR #42: Feature implementation",
    timestamp: "15 minutes ago",
    unread: true,
  },
  {
    id: 2,
    image: "/avatar-80-02.jpg",
    user: "Emma Davis",
    action: "shared",
    target: "New component library",
    timestamp: "45 minutes ago",
    unread: true,
  },
  {
    id: 3,
    image: "/avatar-80-03.jpg",
    user: "James Wilson",
    action: "assigned you to",
    target: "API integration task",
    timestamp: "4 hours ago",
    unread: false,
  },
  {
    id: 4,
    image: "/avatar-80-04.jpg",
    user: "Alex Morgan",
    action: "replied to your comment in",
    target: "Authentication flow",
    timestamp: "12 hours ago",
    unread: false,
  },
  {
    id: 5,
    image: "/avatar-80-05.jpg",
    user: "Sarah Chen",
    action: "commented on",
    target: "Dashboard redesign",
    timestamp: "2 days ago",
    unread: false,
  },
  {
    id: 6,
    image: "/avatar-80-06.jpg",
    user: "Miky Derya",
    action: "mentioned you in",
    target: "Origin UI open graph image",
    timestamp: "2 weeks ago",
    unread: false,
  },
]

function Dot({ className }: { className?: string }) {
  return (
    <svg
      width="6"
      height="6"
      fill="currentColor"
      viewBox="0 0 6 6"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="3" cy="3" r="3" />
    </svg>
  )
}

export default function NotificationsComponent() {
  const [notifications, setNotifications] = useState(initialNotifications)
  const unreadCount = notifications.filter((n) => n.unread).length

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        unread: false,
      }))
    )
  }

  const handleNotificationClick = (id: number) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id
          ? { ...notification, unread: false }
          : notification
      )
    )
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="relative !border-none !bg-transparent !h-fit hover:!bg-[rgba(255,255,255,0.025)] group !p-[6px] !rounded-md flex flex-row items-center cursor-pointer !transition-all duration-200 ease-in-out"
          aria-label="Open notifications"
        >
          <Bell className="!w-[18px] !h-[18px] text-[rgba(255,255,255,.75)] group-hover:text-[#fff] transition-all duration-200 ease-in-out" aria-hidden="true" />
          {unreadCount > 0 && (
            <Badge className="!bg-[#f4af29] alert-animation absolute  -top-[4px] -right-[4px] w-[16px] h-[16px] text-[11px] text-[#0a0118] font-bold font-inter -translate-x-1/2 px-1">
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-1 !border-none font-inter notifications-context-menu theme-color">
        <div className="flex items-baseline justify-between gap-4 px-3 py-2">
          <div className="text-sm font-semibold">Notifications</div>
          {unreadCount > 0 && (
            <button
              className="text-xs font-medium hover:underline"
              onClick={handleMarkAllAsRead}
            >
              Mark all as read
            </button>
          )}
        </div>
        <div
          role="separator"
          aria-orientation="horizontal"
          className="bg-[rgba(255,255,255,.05)] -mx-1 my-1 h-px"
        ></div>
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="hover:bg-[#ffffff0a] rounded-md px-3 py-2 text-sm transition-colors"
          >
            <div className="relative flex items-start gap-3 pe-3">
              <img
                className="size-9 rounded-md"
                src={notification.image}
                width={32}
                height={32}
                alt={notification.user}
              />
              <div className="flex-1 space-y-1">
                <button
                  className="text-white/80 text-left after:absolute after:inset-0"
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  <span className="text-white font-medium hover:underline">
                    {notification.user}
                  </span>{" "}
                  {notification.action}{" "}
                  <span className="text-white font-medium hover:underline">
                    {notification.target}
                  </span>
                  .
                </button>
                <div className="text-[#b2b2b2] text-xs">
                  {notification.timestamp}
                </div>
              </div>
              {notification.unread && (
                <div className="absolute end-0 self-center">
                  <Dot />
                </div>
              )}
            </div>
          </div>
        ))}
      </PopoverContent>
    </Popover>
  )
}
