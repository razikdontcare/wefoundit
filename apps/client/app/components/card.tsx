import { useState } from "react";
import { Compass, Info } from "lucide-react";

export default function Card() {
  const [isClicked, setIsClicked] = useState(false);
  return (
    <>
      <div className=" w-full max-w-md mx-auto md:max-w-lg bg-gray-300 text-black dark:bg-gray-700 dark:text-white drop-shadow-2xl rounded-md overflow-hidden">
        <div className="relative aspect-video overflow-hidden">
          <img
            src="https://picsum.photos/640/360"
            alt="foto"
            className="absolute w-full aspect-video object-cover object-center inset-0"
          />

          <div className="absolute right-15 rounded-md">
            <span className="alert alert-danger text-white px-2 py-1 rounded-md text-xs font-bold absolute top-2 left-2">
              Lost
            </span>
          </div>
        </div>
        <div className="p-4 sm:p-5 flex flex-col gap-3">
          <div className=" flex flex-wrap items-center justify-between">
            <span className="px-2 py-1  alert alert-info rounded-md font-bold text-sm  ">
              Handphone
            </span>

            <span className="italic text-black dark:text-white ml-7 text-xs">
              Lost Around Thu, Apr 17 at 15:46 PM
            </span>
          </div>

          <div className="">
            <span className="text-2xl font-bold py-3">MiawPhone 7</span>
          </div>

          <div className="flex gap-2 items-center">
            <Compass /> Lokasi
          </div>

          <div className="flex gap-2 items-center">
            <Info /> x1
          </div>

          <div className="text-sm">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos
            blanditiis officiis minus illo itaque! Blanditiis animi, debitis
            iste cupiditate voluptas nihil quae vel, consectetur deleniti autem,
            voluptatem distinctio mollitia dicta?
          </div>

          <div className="flex flex-col w-full gap-2">
            <div className="border-1 border-blue-600 rounded-md">
              <span className="flex items-center justify-center py-2 text-sm font-bold uppercase">
                Details
              </span>
            </div>
            <div
              className={`cursor-pointer rounded-md py-2 text-sm font-bold uppercase text-white flex items-center justify-center ${
                isClicked ? "bg-green-400" : "bg-blue-600 hover:bg-blue-700"
              }`}
              onClick={() => setIsClicked(true)}
            >
              <span className="flex items-center justify-center py-2 text-sm font-bold uppercase">
                {isClicked ? "Founded" : "I Found It"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
