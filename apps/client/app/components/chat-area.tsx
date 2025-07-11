import React, { useState, type FormEvent } from "react";
import { Button } from "./ui/button";
import type { Route } from "../routes/+types/chat";
import axios from "axios";
import type { User } from "~/hooks/useSession";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";

type Message = {
  id?: string;
  senderId: string;
  receiverId?: string;
  message: string;
  timestamp?: any;
  readBy?: string[];
};

type ChatAreaProps = {
  messages: Message[];
  onSend: (text: string, receiverId: string) => Promise<void>;
  currentUser: User;
  chatId: string;
  otherUser: User;
  // ...other fields as needed
};

export default function ChatArea({
  messages,
  onSend,
  currentUser,
  otherUser,
}: ChatAreaProps) {
  const [input, setInput] = useState("");

  // Find the other participant (assumes 1-to-1 chat)
  const otherUserId =
    messages.find((msg) => msg.senderId !== currentUser.id)?.senderId ||
    messages.find((msg) => msg.receiverId !== currentUser.id)?.receiverId ||
    otherUser?.id ||
    "";

  const handleSend = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !otherUserId) return;
    setInput(""); // clear input immediately
    await onSend(input, otherUserId);
  };

  return (
    <div className="flex-1 flex flex-col w-full p-4 box-primary rounded-md border border-gray-200">
      {/* User info at the top */}
      <div className="flex items-center gap-3 mb-4">
        <Avatar>
          <AvatarImage src={otherUser?.photo_url} alt="User Avatar" />
          <AvatarFallback>
            {otherUser?.name
              ? otherUser.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
              : "?"}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-bold text-base">
            {otherUser?.name || otherUserId || "Pengguna lain"}
          </div>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto mb-4">
        {messages.map((msg, idx) => (
          <div
            key={msg.id || idx}
            className={`mb-2 flex ${
              msg.senderId === currentUser.id ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`px-3 py-2 rounded-lg max-w-xs ${
                msg.senderId === currentUser.id
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.message}
            </div>
          </div>
        ))}
      </div>
      <form className="flex gap-2" onSubmit={handleSend}>
        <input
          type="text"
          className="flex-1 border rounded px-3 py-2"
          placeholder="Ketik pesan..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Kirim
        </Button>
      </form>
    </div>
  );
}
