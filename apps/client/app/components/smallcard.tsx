export default function SmallCard() {
  return (
    <>
      <div className=" w-full min-h-[15rem] bg-blue-400 text-black dark:bg-gray-700 dark:text-white  drop-shadow-2xl rounded-md overflow-hidden">
        <div className="p-5 flex flex-col gap-2">
          <div className=" flex items-center justify-between">
            <span className="px-2 py-1  alert alert-info rounded-md font-bold text-sm  ">
              Handphone
            </span>
            <span className="italic text-black dark:text-white xs-7 text-xs">
              Lost around Thu, Apr 17 at 15:46 PM
            </span>
          </div>

          <div className="">
            <span className="text-2xl font-bold py-3">MiawPhone 7</span>
          </div>

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
        </div>
      </div>
    </>
  );
}
