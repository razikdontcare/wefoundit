import type { Route } from "./+types/chat";
import { Undo2 } from "lucide-react";
import { useNavigate } from "react-router";
import ChatCard from "~/components/chat-card";
import ChatArea from "~/components/chat-area";
import ChatAreaEmpty from "~/components/chat-areaEmpty";
import { useEffect, useState, useCallback } from "react";
import { db } from "~/lib/firebase"; // <-- You need to create this file for Firebase initialization
import {
  collection,
  doc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  updateDoc,
  setDoc,
  addDoc,
  serverTimestamp,
  increment,
  where, // <-- add this import
} from "firebase/firestore";
import { useAuth } from "~/hooks/useSession"; // <-- You need to provide current user context
import axios from "axios";

// Utility to generate consistent chatId for two users
function getChatId(userIdA: string, userIdB: string) {
  return [userIdA, userIdB].sort((a, b) => a.localeCompare(b)).join("_");
}

export function meta({}: Route.MetaArgs) {
  return [{ title: "WeFoundIt" }, { name: "description", content: "" }];
}

export async function clientLoader({ params }: Route.ClientActionArgs) {
  const chatId = params?.id;
  if (!chatId) return { data: null };

  const response = await axios.get(
    "http://localhost:5000/api/auth/users/" + chatId,
    {
      withCredentials: true,
    }
  );
  if (response.status !== 200) {
    throw new Error("Failed to fetch chat data");
  }
  // Fetch chat data here if needed
  return { data: response.data.data };
}

export default function Chat({ params, loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [chats, setChats] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [userInfos, setUserInfos] = useState<Record<string, any>>({});
  // Determine the other user's id from params (for 1-to-1 chat)
  const otherUserId = params?.id;
  // Generate consistent chatId if both user and otherUserId exist
  const chatId =
    user && otherUserId ? getChatId(user.id, otherUserId) : undefined;

  // Fetch chat list
  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/auth");
      return;
    }
    // Use Firestore query to only fetch chats where the user is a participant
    const q = collection(db, "chats");
    const unsub = onSnapshot(q, (snapshot) => {
      console.log("CHAT SNAPSHOT SIZE:", snapshot.size);
      console.log(
        "RAW DOCS:",
        snapshot.docs.map((doc) => doc.data())
      );
      const chatList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChats(chatList);
    });

    return () => unsub();
  }, [user, loading]);

  // Fetch messages for selected chat
  useEffect(() => {
    if (!chatId) return setMessages([]);
    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("timestamp", "asc")
    );
    const unsub = onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
    });
    return () => unsub();
  }, [chatId]);

  // Mark messages as read
  useEffect(() => {
    if (!chatId || !user) return;
    const markRead = async () => {
      const chatRef = doc(db, "chats", chatId);
      await updateDoc(chatRef, {
        [`unread.${user.id}`]: 0,
      });
      // ...could batch update unread messages...
    };
    markRead();
  }, [chatId, user]);

  // Mark messages as read for the currently opened chat
  useEffect(() => {
    if (!chatId || !user) return;
    // Only mark as read if this chat is currently opened (active)
    const chat = chats.find((c) => c.id === chatId);
    if (chat && chat.unread && chat.unread[user.id] > 0) {
      const chatRef = doc(db, "chats", chatId);
      updateDoc(chatRef, {
        [`unread.${user.id}`]: 0,
      }).catch(() => {});
    }
  }, [chatId, user, chats]);

  // Send message handler
  const sendMessage = useCallback(
    async (text: string, receiverId: string) => {
      if (!user || !chatId) return;

      const chatRef = doc(db, "chats", chatId);

      // Check if chat exists, if not, initialize with required fields
      const chatSnap = await getDocs(
        query(collection(db, "chats") /* optional: where("id", "==", chatId) */)
      );
      const chatExists = chats.some((c) => c.id === chatId);

      if (!chatExists) {
        await setDoc(chatRef, {
          participants: [user.id, receiverId],
          lastMessage: text,
          lastTimestamp: serverTimestamp(),
          unread: {
            [receiverId]: 1,
            [user.id]: 0,
          },
        });
      } else {
        // Update chat doc
        await updateDoc(chatRef, {
          lastMessage: text,
          lastTimestamp: serverTimestamp(),
          [`unread.${receiverId}`]: increment(1),
        });
      }

      // Add message to messages subcollection
      const msgRef = collection(db, "chats", chatId, "messages");
      const newMsg = {
        senderId: user.id,
        receiverId,
        message: text,
        timestamp: serverTimestamp(),
        readBy: [user.id],
      };
      await addDoc(msgRef, newMsg);
    },
    [user, chatId, chats]
  );

  // Fetch user info for all other participants in chat list
  useEffect(() => {
    async function fetchUserInfos() {
      if (!user || !chats.length) return;
      const idsToFetch = Array.from(
        new Set(
          chats.flatMap((chat) =>
            Array.isArray(chat.participants)
              ? chat.participants.filter((pid: string) => pid !== user.id)
              : []
          )
        )
      ).filter((id) => !(id in userInfos));
      if (idsToFetch.length === 0) return;
      const results: Record<string, any> = { ...userInfos };
      await Promise.all(
        idsToFetch.map(async (id) => {
          try {
            const res = await axios.get(
              `http://localhost:5000/api/auth/users/${id}`,
              { withCredentials: true }
            );
            if (res.status === 200 && res.data?.data) {
              results[id] = res.data.data;
            }
          } catch {
            // ignore error
          }
        })
      );
      setUserInfos(results);
    }
    fetchUserInfos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chats, user]);

  // Count unread chats for the current user
  const unreadCount = chats.filter(
    (chat) =>
      Array.isArray(chat.participants) &&
      user?.id &&
      chat.participants.includes(user.id) &&
      chat.unread &&
      chat.unread[user.id] > 0
  ).length;

  // Filtered chat list: show all chats that include the current user and match the search
  const filteredChats = chats
    .filter(
      (chat) =>
        Array.isArray(chat.participants) &&
        user?.id &&
        chat.participants.includes(user.id)
    )
    .filter((chat) => {
      // Always show if search is empty
      if (!search.trim()) return true;
      // Match title
      if ((chat.title || "").toLowerCase().includes(search.toLowerCase()))
        return true;
      // Match any participant's id (except current user)
      return chat.participants
        .filter((pid: string) => pid !== user?.id)
        .some((pid: string) =>
          pid.toLowerCase().includes(search.toLowerCase())
        );
    });

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
            Chat{" "}
            <span className="text-xs font-normal">
              ({unreadCount} Unread chat{unreadCount !== 1 ? "s" : ""})
            </span>
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
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {/* Chat list (scrollable on mobile) */}
            <div className="flex flex-col gap-2 overflow-y-auto max-h-[24rem] md:max-h-[30rem]">
              {chats
                .filter(
                  (chat) =>
                    Array.isArray(chat.participants) &&
                    user?.id &&
                    chat.participants.includes(user.id)
                )
                .map((chat) => {
                  const otherParticipantId = Array.isArray(chat.participants)
                    ? chat.participants.find((pid: string) => pid !== user?.id)
                    : undefined;
                  const otherUserInfo = otherParticipantId
                    ? userInfos[otherParticipantId]
                    : undefined;
                  return (
                    <ChatCard
                      key={chat.id}
                      chat={{
                        ...chat,
                        // Prefer chat.title, fallback to user name
                        title: chat.title || otherUserInfo?.name,
                        photo_url: otherUserInfo?.photo_url,
                        name: otherUserInfo?.name,
                      }}
                      unread={user?.id ? chat.unread?.[user.id] || 0 : 0}
                      onClick={() =>
                        otherParticipantId &&
                        navigate(`/chat/${otherParticipantId}`)
                      }
                    />
                  );
                })}
            </div>
          </div>
          {/* Chat Area */}
          <div className="rounded-2xl w-full min-h-[20rem] md:min-h-[38.5rem] flex flex-col items-start">
            {/* Jika ada chatId, tampilkan ChatArea, jika tidak tampilkan ChatAreaEmpty */}
            {chatId && user ? (
              <div className="w-full h-full flex flex-col">
                <ChatArea
                  messages={messages}
                  onSend={sendMessage}
                  currentUser={user}
                  chatId={chatId}
                  otherUser={loaderData.data}
                />
              </div>
            ) : (
              <div className="hidden md:flex md:flex-col w-full h-full">
                <ChatAreaEmpty />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
