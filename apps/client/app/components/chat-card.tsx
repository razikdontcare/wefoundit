import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

type ChatCardProps = {
  chat: {
    title?: string;
    lastMessage?: string;
    lastTimestamp?: any;
    photo_url?: string;
    name?: string;
    // ...other fields as needed
  };
  unread?: number;
  onClick?: () => void;
};

export default function ChatCard({ chat, unread = 0, onClick }: ChatCardProps) {
  console.log(chat);
  // Format hari dalam bahasa Indonesia dari lastTimestamp
  let hari = "";
  if (chat.lastTimestamp) {
    const date =
      typeof chat.lastTimestamp.toDate === "function"
        ? chat.lastTimestamp.toDate()
        : new Date(chat.lastTimestamp);
    hari = date.toLocaleDateString("id-ID", { weekday: "long" });
  }

  return (
    <div
      className="flex flex-row rounded-md w-full h-16 box-secondary hover:bg-gray-100 transition duration-150 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-between p-2 min-w-[50px]">
        <Avatar>
          <AvatarImage src={chat.photo_url} alt="User Avatar" />
          <AvatarFallback>
            {chat.name
              ? chat.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
              : "?"}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col items-center justify-between w-full p-2">
        <div className="flex flex-row justify-between items-center gap-2 w-full">
          <span className="font-bold">{chat.title || "Chat Title"}</span>
          <span className="text-sm text-gray-400">{hari}</span>
        </div>
        <div className="flex flex-row justify-between items-center gap-2 w-full">
          <span className="text-sm text-gray-300">
            {chat.lastMessage || "Last message preview..."}
          </span>
          {unread > 0 && (
            <span className="bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center ml-1">
              {unread}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
