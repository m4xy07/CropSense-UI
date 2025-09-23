"use client"

import { useState, useEffect, useMemo } from "react"
import { Bell, Thermometer, Droplets, Leaf, CloudRain, Activity, TestTube } from "lucide-react"

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
    icon: Droplets,
    iconColor: "text-blue-400",
    user: "Soil Sensor SM-01",
    action: "detected critical moisture level",
    target: "Plot A: 32% (below 40% threshold)",
    timestamp: "15 minutes ago",
    unread: true,
  },
  {
    id: 2,
    icon: Leaf,
    iconColor: "text-green-400",
    user: "NPK Sensor NP-03",
    action: "recorded nitrogen depletion in",
    target: "Plot B: 12 ppm (requires fertilizer)",
    timestamp: "45 minutes ago",
    unread: true,
  },
  {
    id: 3,
    icon: Thermometer,
    iconColor: "text-red-400",
    user: "Temperature Sensor TH-02",
    action: "measured heat stress levels",
    target: "Tomato field: 38°C (above optimal)",
    timestamp: "4 hours ago",
    unread: false,
  },
  {
    id: 4,
    icon: CloudRain,
    iconColor: "text-gray-400",
    user: "Weather Station WS-01",
    action: "updated precipitation forecast",
    target: "85mm rainfall expected in 24h",
    timestamp: "12 hours ago",
    unread: false,
  },
  {
    id: 5,
    icon: Activity,
    iconColor: "text-purple-400",
    user: "Humidity Sensor HM-04",
    action: "detected high humidity spike",
    target: "Plot C: 92% RH (disease risk)",
    timestamp: "2 days ago",
    unread: false,
  },
  {
    id: 6,
    icon: TestTube,
    iconColor: "text-yellow-400",
    user: "pH Sensor PH-05",
    action: "measured acidic soil conditions",
    target: "Plot D: pH 5.2 (needs lime treatment)",
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
  const [isLoaded, setIsLoaded] = useState(false)
  
  // Initialize state with a function to check localStorage first
  const [notifications, setNotifications] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedNotifications = localStorage.getItem('cropsense-notifications')
      if (savedNotifications) {
        try {
          const parsed = JSON.parse(savedNotifications)
          // Merge with initialNotifications to ensure we have the icon components
          return initialNotifications.map(initial => {
            const saved = parsed.find((p: any) => p.id === initial.id)
            return saved ? { ...initial, unread: saved.unread } : initial
          })
        } catch (error) {
          console.error('Failed to parse saved notifications:', error)
        }
      }
    }
    return initialNotifications
  })

  // Mark as loaded after initial render
  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Calculate unread count reactively with useMemo
  const unreadCount = useMemo(() => {
    return notifications.filter((n) => n.unread).length
  }, [notifications])

  // Save notifications to localStorage whenever they change (but only after initial load)
  useEffect(() => {
    if (typeof window !== 'undefined' && isLoaded) {
      const notificationsToSave = notifications.map(({ icon, iconColor, ...rest }) => rest)
      localStorage.setItem('cropsense-notifications', JSON.stringify(notificationsToSave))
    }
  }, [notifications, isLoaded])

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
          {isLoaded && unreadCount > 0 && (
            <Badge className="!bg-[#f4af29] alert-animation absolute  -top-[4px] -right-[4px] w-[16px] h-[16px] text-[11px] text-[#0a0118] font-bold font-inter -translate-x-1/2 px-1 rounded-full">
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-1 !border-none font-inter notifications-context-menu theme-color">
        <div className="flex items-baseline justify-between gap-4 px-3 py-2">
          <div className="text-sm font-semibold">Notifications</div>
          {isLoaded && unreadCount > 0 && (
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
              <div className="size-9 rounded-md bg-[#ffffff0a] flex items-center justify-center">
                <notification.icon className={`size-5 ${notification.iconColor}`} />
              </div>
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
