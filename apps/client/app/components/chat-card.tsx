import React from "react";

export default function chatCard() {
   // Ambil waktu sekarang
  const now = new Date();
  // Format hari dalam bahasa Indonesia
  const hari = now.toLocaleDateString("id-ID", { weekday: "long" });
  const unreadCount = 5; // Contoh jumlah chat yang belum dibaca

  return (
    <>
        <div className="flex flex-row rounded-md w-full h-16 box-secondary hover:bg-gray-100 transition duration-150 cursor-pointer">
          <div className="flex items-center justify-between p-2 min-w-[50px]">
            <img
              src="https://picsum.photos/50"
              alt="User Avatar"
              className="rounded-full w-10 h-10 object-cover"
            />
          </div>
          <div className="flex flex-col items-center justify-between w-full p-2">
            <div className="flex flex-row justify-between items-center gap-2 w-full">
              <span className="font-bold">Chat Title</span>
              <span className="text-sm text-gray-400">{hari}</span>
            </div>
            <div className="flex flex-row justify-between items-center gap-2 w-full">
              <span className="text-sm text-gray-300">Last message preview...</span>
              {unreadCount > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center ml-1">
                    {unreadCount}
                  </span>
                )}
            </div>
          </div>
        </div>
    </>
  );
}
