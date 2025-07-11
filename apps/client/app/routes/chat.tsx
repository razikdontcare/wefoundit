import type { Route } from "./+types/chat";
import { Undo2 } from "lucide-react";
import { useNavigate } from "react-router";
import ChatCard from "~/components/chat-card";
import ChatArea from "~/components/chat-area";
import ChatAreaEmpty from "~/components/chat-areaEmpty";

export function meta({}: Route.MetaArgs) {
  return [{ title: "WeFoundIt" }, { name: "description", content: "" }];
}

export default function Chat({ params }: { params?: { id?: string } }) {
  const navigate = useNavigate();
  
  const handleChatCardClick = (chatId: string) => {
    navigate(`/chat/${chatId}`);
  };

  return (
    <>
      <div className="container mx-auto max-w-7xl flex flex-col gap-2 px-2 sm:px-4" style={{ height: 'calc(90vh - 4rem)' }}>
        {/* Header */}
        <div className="flex justify-between items-center w-full rounded-md px-2 sm:px-4 py-2 flex-shrink-0">
          <Undo2
            onClick={() => navigate(-1)}
            className="cursor-pointer"
            size={28}
          />
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-center">
            Chat <span className="text-xs font-normal">(Count Unread chat)</span>
          </h1>
          <Undo2 className="opacity-0" size={28} />
        </div>
        {/* Main Chat Layout */}
        <div className="flex flex-col md:flex-row justify-center gap-2 md:gap-4 px-1 sm:px-4 pb-2 flex-1 min-h-0">
          {/* Chat List (Sidebar) */}
          <div className="rounded-2xl w-full md:w-[38%] h-full gap-2 flex flex-col">
            <div className="flex items-center justify-center w-full mb-2 flex-shrink-0">
              <input
                type="text"
                placeholder="Search"
                className="border border-gray-300 rounded-md p-2 w-full box-secondary hover:bg-gray-100 transition duration-150 text-sm"
              />
            </div>
            {/* Chat list (scrollable) */}
            <div className="flex flex-col gap-2 overflow-y-auto flex-1 min-h-0">
              <div onClick={() => handleChatCardClick('1')}>
                <ChatCard />
              </div>
              <div onClick={() => handleChatCardClick('2')}>
                <ChatCard />
              </div>
              {/* Tambahkan ChatCard lain jika perlu */}
            </div>
          </div>
          {/* Chat Area */}
          <div className="rounded-2xl w-full h-full flex flex-col items-center justify-center">
            {/* Jika ada chatId dari params, tampilkan ChatArea, jika tidak tampilkan ChatAreaEmpty */}
            {params?.id ? (
              <div className="w-full h-full">
                <ChatArea />
              </div>
            ) : (
              <div className="hidden md:flex w-full h-full items-center justify-center">
                <ChatAreaEmpty />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}