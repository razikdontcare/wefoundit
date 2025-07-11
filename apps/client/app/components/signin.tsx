import DarkModeToggle from "./toggleTheme";
import { useState } from "react";
import axios from "axios";
import { Eye } from "lucide-react";
import { EyeClosed } from "lucide-react";
import { Link } from "react-router";

interface LoginProps {
  onSwitchToRegister?: () => void;
  isStacked?: boolean;
}

export default function Login({ onSwitchToRegister, isStacked }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrMsg("");
    try {
      await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password },
        { withCredentials: true }
      );
      window.location.href = "/"; // redirect ke halaman utama
    } catch (err: any) {
      setErrMsg(
        err?.response?.data?.error || "Gagal masuk, periksa kembali data Anda."
      );
    }
    setLoading(false);
  };

  const handleGoogle = () => {
    window.location.href = "/api/auth/google"; // arahkan ke endpoint Google OAuth backend
  };

  return (

    <div
      className={`w-full min-h-screen flex flex-col bg-[#e1e1e1] dark:bg-[#1C1F23] transition-all duration-500
        ${
          isStacked === false
            ? "opacity-0 pointer-events-none scale-95"
            : "opacity-100 pointer-events-auto scale-100"
        }
      `}
    >
      {/* <div className="flex flex-row items-center justify-between gap-10 px-4 pt-10 primary-text">
        <p className="text-3xl font-bold">Sign In</p>
      </div> */}
      <div className="flex flex-1 flex-col items-center md:items-end justify-center">
        <div className="flex flex-row py-2 mb-5 primary-text w-full max-w-md justify-start gap-3 items-center">

          <Link to="/" className="text-3xl flex items-center">
            We<span className="font-bold">Found</span>It
          </Link>
          <DarkModeToggle />
        </div>

        <div className="flex flex-col w-full max-w-md px-6 py-7 box-secondary rounded-lg gap-4 shadow-lg">
          <div className="flex flex-row items-center justify-between mt-2">
            <p className="text-sm primary-text">

              Belum punya akun We<b>Found</b>It?
            </p>
            {onSwitchToRegister ? (
              <button
                type="button"
                className="text-blue-500 font-bold hover:underline bg-transparent border-none outline-none"
                onClick={onSwitchToRegister}
              >
                Daftar
              </button>
            ) : (
              <Link
                to="/auth"
                className="text-blue-500 font-bold hover:underline"
              >
                Daftar
              </Link>
            )}
          </div>
          <form className="flex flex-col gap-2 mt-4 primary-text" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              className="p-2 border border-gray-300 rounded-md"
              required
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
            />

            <p className="text-xs text-gray-400">Contoh: wefoundit@gmail.com</p>
            <div className="password-field flex w-full gap-2 relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Password"
                value={password}
                className="p-2 border border-gray-300 rounded-md w-full pr-10"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
                onClick={() => setShowPass((v) => !v)}

                tabIndex={-1}
              >
                {showPass ? <EyeClosed /> : <Eye />}
              </button>
            </div>
            <Link
              to="/auth/reset-password"
              className="text-blue-500 font-bold text-xs text-right hover:underline ml-auto"
            >
              Lupa Password?
            </Link>
            {errMsg && (
              <p className="text-red-500 text-xs text-center">{errMsg}</p>
            )}
            <button
              type="submit"

              className="w-full h-10 bg-white text-[#3A3A3A] rounded-sm cursor-pointer hover:bg-blue-100 transition duration-150 font-bold mt-2"

              disabled={loading}
            >
              {loading ? "Loading..." : "Masuk"}
            </button>

            <div className="flex items-center my-2">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-2 text-xs primary-text">
                atau masuk dengan
              </span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <button
              onClick={handleGoogle}
              type="button"
              className="flex flex-row justify-center w-full h-12 items-center p-2 text-white border border-gray-300 cursor-pointer rounded-md bg-[#23272F] hover:bg-[#2c313a] transition"

            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 26 26"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M25.7471 10.4539H24.7V10.4H13V15.6H20.347C19.2751 18.627 16.3949 20.8 13 20.8C8.69245 20.8 5.2 17.3075 5.2 13C5.2 8.69245 8.69245 5.2 13 5.2C14.9883 5.2 16.7973 5.9501 18.1747 7.17535L21.8517 3.4983C19.5299 1.33445 16.4242 0 13 0C5.82075 0 0 5.82075 0 13C0 20.1792 5.82075 26 13 26C20.1792 26 26 20.1792 26 13C26 12.1283 25.9103 11.2775 25.7471 10.4539Z"
                  fill="#FFC107"
                />
                <path
                  d="M1.49915 6.94915L5.7703 10.0815C6.926 7.2202 9.7249 5.2 13.0002 5.2C14.9886 5.2 16.7975 5.9501 18.1749 7.17535L21.8519 3.4983C19.5301 1.33445 16.4244 0 13.0002 0C8.00695 0 3.67665 2.81905 1.49915 6.94915Z"
                  fill="#FF3D00"
                />
                <path
                  d="M13.0003 25.9998C16.3582 25.9998 19.4093 24.7148 21.7161 22.625L17.6926 19.2203C16.3874 20.209 14.765 20.7998 13.0003 20.7998C9.61895 20.7998 6.7479 18.6438 5.6663 15.6349L1.427 18.9012C3.5785 23.1112 7.9478 25.9998 13.0003 25.9998Z"
                  fill="#4CAF50"
                />
                <path
                  d="M25.7471 10.4539H24.7V10.4H13V15.6H20.347C19.8322 17.054 18.8968 18.3079 17.6904 19.2211C17.691 19.2205 17.6917 19.2205 17.6923 19.2198L21.7158 22.6245C21.4311 22.8832 26 19.5 26 13C26 12.1283 25.9103 11.2775 25.7471 10.4539Z"
                  fill="#1976D2"
                />
              </svg>
              <p className="ml-2">Google</p>
            </button>
            <Link
              to="/auth/bantuan"
              className="text-blue-500 font-bold text-xs text-center hover:underline mt-2"
            >
              Butuh Bantuan?
            </Link>

          </form>
        </div>
        <div className="w-full max-w-md">
          <p className="text-xs text-center primary-text mt-6">
            We<b>Found</b>It © 2025
          </p>
          <p className="text-xs text-center primary-text">
            Made with ❤️ by kelompok E3
          </p>
        </div>
      </div>
    </div>
  );
}
