import React from "react";

export default function ChatAreaEmpty() {
  return (
    <div className="flex-1 flex flex-col w-full justify-center items-center p-4 rounded-md">
      <h1 className="font-bold text-5xl/14 md:text-7xl/22 tracking-tight flex flex-col items-center justify-center text-center">
        <span>
          We <span className="text-primary">Found</span> It
        </span>
        <span>
          You Got <span className="text-primary">It!</span>
        </span>
      </h1>
      <p className="text-xs md:text-base md:max-w-4xl font-bold mx-auto text-center">
        Selamat Datang di WeFoundIt
      </p>
      <p className="text-xs md:text-base md:max-w-4xl mx-auto text-center">
        Temukan dan kembalikan barang hilang dengan mudah!
      </p>
    </div>
  );
}
