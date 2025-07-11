import React from "react";

// Dummy data untuk frontend saja
const dummyChat = {
  title: "Budi",
  messages: [
    { text: "Halo!", fromMe: false },
    { text: "Hai juga!", fromMe: true },
    { text: "Apa kabar?", fromMe: false },
    { text: "Baik, kamu?", fromMe: true },
  ],
};

export default function ChatArea() {
  return (
    <div className="flex-1 flex flex-col w-full h-full p-4 box-primary rounded-md border border-gray-200">
      <div className="font-bold text-lg mb-2">{dummyChat.title}</div>
      <div className="flex-1 overflow-y-auto mb-4">
        {dummyChat.messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 flex ${msg.fromMe ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`px-3 py-2 rounded-lg max-w-xs ${
                msg.fromMe
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <form className="flex gap-2">
        <input
          type="text"
          className="flex-1 border rounded px-3 py-2"
          placeholder="Ketik pesan..."
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Kirim
        </button>
      </form>
    </div>
  );
}