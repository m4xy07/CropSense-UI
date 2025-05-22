import { useState, useRef, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import Image from "next/image";

interface Message {
  text: string;
  avatarUrl: string;
  timestamp: string;
  username: string;
  fromCurrentUser?: boolean;
}

function formatTimestamp(date: Date): string {
  const now = new Date();
  const diffInMs = now.getTime() - date.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  const time = date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  if (diffInDays === 0) return `Today at ${time}`;
  if (diffInDays === 1) return `Yesterday at ${time}`;
  if (diffInDays >= 2) {
    const day = date.getDate();
    const suffix =
      day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
        ? "rd"
        : "th";
    const dayWithSuffix = `${day}${suffix}`;
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();
    return `${dayWithSuffix} ${month}, ${year}`;
  }

  return "";
}

export default function ChatBox() {
  const { user } = useUser();
  const [hasMounted, setHasMounted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const maxChars = 500;

  // Load messages from localStorage on first mount
  useEffect(() => {
    setHasMounted(true);
    const saved = localStorage.getItem("chat_messages");
    if (saved) {
      setMessages(JSON.parse(saved));
    } else {
      const initialMessages: Message[] = [
        {
          text: "Cropsense is great!",
          avatarUrl: "/avatar3.jpg",
          timestamp: formatTimestamp(new Date(Date.now() - 86400000 * 3)),
          username: "Samantha",
          fromCurrentUser: false,
        },
        {
          text: "How is the weather today in your area?",
          avatarUrl: "/avatar1.jpg",
          timestamp: formatTimestamp(new Date(Date.now() - 86400000)),
          username: "Jacob",
          fromCurrentUser: false,
        },
        {
          text: "I need 20 bags of fertilizer for my farm. Can somebody help me?",
          avatarUrl: "/avatar2.jpg",
          timestamp: formatTimestamp(new Date()),
          username: "Emily",
          fromCurrentUser: false,
        },
      ];
      setMessages(initialMessages);
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (hasMounted) {
      localStorage.setItem("chat_messages", JSON.stringify(messages));
    }
  }, [messages, hasMounted]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxChars) {
      setInput(value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "" || !user) return;

    const newMessage: Message = {
      text: input,
      avatarUrl: user.imageUrl,
      timestamp: formatTimestamp(new Date()),
      username: user.username || user.fullName || user.firstName || "Anonymous",
      fromCurrentUser: true,
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
  };

  return (
    <div className="w-full h-full flex flex-col bg-transparent rounded-xl shadow-md">
      {/* Chat Display */}
      <div className="flex-1 overflow-y-auto p-2 bg-transparent rounded-lg shadow-inner mb-2">
        {messages.map((msg, index) => {
          const isCurrentUser = msg.fromCurrentUser;
          return (
            <div
              key={index}
              className={`flex items-start gap-2 my-4 ${
                isCurrentUser ? "flex-row-reverse" : ""
              }`}
            >
              <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0">
                <Image
                  src={msg.avatarUrl}
                  alt="User Avatar"
                  fill
                  className="object-cover"
                  sizes="100px"
                />
              </div>
              <div
                className={`p-3 py-2 rounded-md max-w-xs shadow-md break-words theme-color dashboard-equipment-select text-white ${
                  isCurrentUser ? "bg-[#2563eb]" : "main-dashboard-theme"
                }`}
              >
                <div
                  className={`flex justify-between items-center mb-1 text-xs text-muted-foreground ${
                    isCurrentUser ? "flex-row-reverse gap-2" : ""
                  }`}
                >
                  <span className="font-medium text-[14px] text-white">
                    {msg.username}
                  </span>
                  <span
                    className={`ml-2 whitespace-nowrap text-white/70 ${
                      isCurrentUser ? "!ml-0" : ""
                    }`}
                  >
                    {hasMounted ? msg.timestamp : ""}
                  </span>
                </div>
                <div
                  className={`text-sm ${isCurrentUser ? "text-right" : ""}`}
                >
                  {msg.text}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-1 p-2">
        <div className="flex flex-row gap-2 items-end">
          <Textarea
            ref={textareaRef}
            placeholder="Send a message"
            value={input}
            onChange={handleInputChange}
            className="flex-1 resize-none overflow-hidden equipment-input theme-color bg-[rgba(255,255,255,.025)] transition-all  text-white rounded-md !py-2 !px-4 !h-9"
            rows={1}
            maxLength={maxChars}
          />
          <Button variant="outline" type="submit">
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}
