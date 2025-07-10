import type { Route } from "./+types/chat";
import { Undo2 } from "lucide-react";
import { useNavigate } from "react-router";
import ChatCard from "~/components/chat-card";
import ChatArea from "~/components/chat-area";
import ChatAreaEmpty from "~/components/chat-areaEmpty";

export function meta({}: Route.MetaArgs) {
  return [{ title: "WeFoundIt" }, { name: "description", content: "" }];
}

export default function Chat({ params }: { params: { id: string } }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="container mx-auto max-w-7xl flex flex-col my-2 gap-4 px-2 sm:px-4">
        {/* Header */}
        <div className="flex justify-between items-center w-full rounded-md px-2 sm:px-4 py-2">
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
        <div className="flex flex-col md:flex-row justify-center gap-2 md:gap-4 px-1 sm:px-4 py-2">
          {/* Chat List (Sidebar) */}
          <div className="rounded-2xl w-full md:w-[38%] min-h-[18rem] md:min-h-[36rem] gap-2 flex flex-col mb-4 md:mb-0">
            <div className="flex items-center justify-center w-full mb-2">
              <input
                type="text"
                placeholder="Search"
                className="border border-gray-300 rounded-md p-2 w-full box-secondary hover:bg-gray-100 transition duration-150 text-sm"
              />
            </div>
            {/* Chat list (scrollable on mobile) */}
            <div className="flex flex-col gap-2 overflow-y-auto max-h-[24rem] md:max-h-[30rem]">
              <ChatCard />
              <ChatCard />
              {/* Tambahkan ChatCard lain jika perlu */}
            </div>
          </div>
          {/* Chat Area */}
            <div className="rounded-2xl w-full min-h-[20rem] md:min-h-[38.5rem] flex flex-col items-start">
            {/* ChatAreaEmpty hanya tampil di md ke atas */}
            <div className="hidden md:block w-full">
                <ChatAreaEmpty />
            </div>
            {/* <ChatArea /> bisa kamu ganti logic-nya jika ada chat yang dipilih */}
            </div>
          </div>
      </div>
    </>
  );
}