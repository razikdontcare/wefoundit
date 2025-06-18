export default function Card() {
  return (
    <>
      <div className="relative w-full min-h-[36rem] bg-blue-400 text-black dark:bg-gray-700 dark:text-white  drop-shadow-2xl rounded-md overflow-hidden">
        <img
          src="https://picsum.photos/200/300"
          alt="foto"
          className="w-[200rem] max-h-[15rem]"
        />
        <div className="p-3  flex items-center space-x-3 justify-between">
          <span className="p-1  alert alert-info rounded-md font-bold ">
            Handphone
          </span>
          <span className="italic text-black dark:text-white ml-7">
            Found on Thu, Apr 17 at 15:46 PM
          </span>
        </div>
        <div className="">
          <span className="text-3xl font-bold p-3">MiawPhone 7</span>
        </div>

        <div className="">LOKASI</div>

        <div className="">X1</div>

        <div className="">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos
          blanditiis officiis minus illo itaque! Blanditiis animi, debitis iste
          cupiditate voluptas nihil quae vel, consectetur deleniti autem,
          voluptatem distinctio mollitia dicta?
        </div>

        <div className="border-1 border-blue-600">
          <span className="flex items-center justify-center py-2">Details</span>
        </div>
        <div className="btn-primary">
          <span className="flex items-center justify-center mt-3 py-2">
            Center
          </span>
        </div>
      </div>
    </>
  );
}
