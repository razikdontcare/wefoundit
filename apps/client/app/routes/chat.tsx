import type { Route } from "./+types/chat";
import{ StepBack, Undo2 } from "lucide-react";
import{ XCircle } from "lucide-react";
import{ CircleCheckBig } from "lucide-react";
import { useNavigate } from "react-router";
import ChatCard from "~/components/chat-card";
import ChatArea from "~/components/chat-area";

export function meta({}: Route.MetaArgs) {
  return [{ title: "WeFoundIt" }, { name: "description", content: "" }];
}

export default function Chat({ params }: { params: { id: string } }) {
    const navigate = useNavigate();
  return (
    <>
        <div className="rounded-lg container mx-auto max-w-7xl flex-col justify-center items-center my-2 gap-4 px-4">
            <div className="flex justify-between items-center w-full rounded-md px-4 py-2">
                <Undo2 onClick={() => navigate(-1)} className="cursor-pointer"/>
                <h1 className="text-2xl font-bold">Chat (Count Unread chat)</h1>
                <Undo2 className="opacity-0"/>
            </div>
            <div className="flex flex-row justify-center gap-2 px-4 py-2">
                <div className="flex flex-col rounded-2xl w-[70%] min-h-[36rem] gap-2">
                    <div className="flex items-center justify-center w-full ">
                        <input type="text" placeholder="Search" className="border border-gray-300 rounded-md p-2 w-full box-secondary hover:bg-gray-00 transition duration-150 " />
                    </div>
                    {/* Placeholder for chat list */}
                    <ChatCard />
                    <ChatCard />
                </div>
                <div className="flex flex-col items-start rounded-2xl w-full min-h-[38.5rem] ">
                    <ChatArea />
                    {/* Placeholder for chat area */}
                </div>
            </div>
        </div>
    </>
  );
}