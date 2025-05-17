import DarkModeToggle from "./toggleTheme";
import SearchBar from "./search-bar";
import BetIcon from "./icons/bet";

export default function Navbar() {
  return (
    <>
      <div className="flex items-center justify-between p-4 primary-text mx-auto">
        <div className="flex items-center gap-5 w-full">
          <a href="/" className="text-3xl flex items-center">
            We<span className="font-bold">Found</span>It
          </a>
          <DarkModeToggle />
        </div>

        <div className="flex items-center">
          <SearchBar />
        </div>
        <div className="flex items-center justify-end font-bold text-base gap-5 w-full">
          <a href="/">Home</a>
          <a href="/browse">Browse</a>
          <a href="/auth">Sign In</a>
          <a
            href="/submit"
            className="pl-2 pr-4 py-2 border border-primary text-primary rounded-lg text-sm/4 uppercase tracking-widest flex items-center gap-2"
          >
            <BetIcon />
            Submit
          </a>
        </div>
      </div>
    </>
  );
}
