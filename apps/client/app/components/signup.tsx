import DarkModeToggle from "./toggleTheme";

export default function Register() {
    return (
        <div className="flex flex-col w-full bg-[#25282C] rounded-l-4xl">
           <div className="flex flex-row-reverse items-center justify-between gap-10 px-4 pt-10 text-white">
                <p className="text-3xl  font-bold">Sign Up</p>
           </div>
           
           <div className="flex flex-col items-center bg-[#25282C]">
                <div className="flex flex-row w-full justify-center text-white gap-45">
                        <div className="flex flex-row">
                            <a href="/" className="text-3xl flex ">
                                We<span className="font-bold">Found</span>It
                            </a>
                            <DarkModeToggle />
                        </div>
                        <div className=""></div>
                </div>

                <div className="flex flex-col w-96 h-110 flex px-4 py-5 box-secondary rounded-lg gap-4">
                    <div className="flex justify-center my-3 text-2xl font-bold">Daftar Sekarang</div>
                    <div className="flex flex-row items-center justify-between mt-2">
                        <p className="text-sm text-gray-400">Sudah punya akun We<b>Found</b>It?</p>
                        <a href="/auth" className="text-blue-500 font-bold hover:underline">Masuk</a>
                    </div>
                    <form className="flex flex-col gap-2 mt-4">
                        <input
                            type="email"
                            placeholder="Email"
                            className="p-2 border border-gray-300 rounded-md"
                            required
                        />
                        <p className="text-xs text-gray-400">Contoh: wefoundit@gmail.com</p>
                        <a href="/auth" className="text-blue-500 font-bold text-xs text-right hover:underline">Lupa Password?</a>
                        <button type="submit" className="w-full h-10 bg-white text-[#3A3A3A] rounded-sm cursor-pointer hover:btn-primary transition duration-150 font-bold">
                            Selanjutnya
                        </button>
                        <p className="py-2 text-xs text-gray-400 text-center">------------atau daftar dengan------------</p>
                        <button className="flex flex-row justify-center w-full h-12 items-center p-2 text-white border border-gray-300 cursor-pointer rounded-md">
                            <svg width="24" height="24" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M25.7471 10.4539H24.7V10.4H13V15.6H20.347C19.2751 18.627 16.3949 20.8 13 20.8C8.69245 20.8 5.2 17.3075 5.2 13C5.2 8.69245 8.69245 5.2 13 5.2C14.9883 5.2 16.7973 5.9501 18.1747 7.17535L21.8517 3.4983C19.5299 1.33445 16.4242 0 13 0C5.82075 0 0 5.82075 0 13C0 20.1792 5.82075 26 13 26C20.1792 26 26 20.1792 26 13C26 12.1283 25.9103 11.2775 25.7471 10.4539Z" fill="#FFC107"/>
                                <path d="M1.49915 6.94915L5.7703 10.0815C6.926 7.2202 9.7249 5.2 13.0002 5.2C14.9886 5.2 16.7975 5.9501 18.1749 7.17535L21.8519 3.4983C19.5301 1.33445 16.4244 0 13.0002 0C8.00695 0 3.67665 2.81905 1.49915 6.94915Z" fill="#FF3D00"/>
                                <path d="M13.0003 25.9998C16.3582 25.9998 19.4093 24.7148 21.7161 22.625L17.6926 19.2203C16.3874 20.209 14.765 20.7998 13.0003 20.7998C9.61895 20.7998 6.7479 18.6438 5.6663 15.6349L1.427 18.9012C3.5785 23.1112 7.9478 25.9998 13.0003 25.9998Z" fill="#4CAF50"/>
                                <path d="M25.7471 10.4539H24.7V10.4H13V15.6H20.347C19.8322 17.054 18.8968 18.3079 17.6904 19.2211C17.691 19.2205 17.6917 19.2205 17.6923 19.2198L21.7158 22.6245C21.4311 22.8832 26 19.5 26 13C26 12.1283 25.9103 11.2775 25.7471 10.4539Z" fill="#1976D2"/>
                            </svg>
                            <p className="ml-2">Google</p>
                        </button>
                        <a href="/auth" className="text-blue-500 font-bold text-xs text-center hover:underline">Butuh Bantuan?</a>
                    <br/>
                    <p className="text-xs text-center text-white">We<b>Found</b>It © 2025</p>
                    <p className="text-xs text-center text-white">Made with ❤️ by kelompok E3</p>
                    </form>
                </div>
           </div>
        </div>
    );

}