import { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
}

export default function SearchBar({
  placeholder = "Search",
  onSearch,
}: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    if (containerRef.current) {
      const height = containerRef.current.offsetHeight;
      setContainerHeight(height);
    }
  }, []);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => {
    if (!query) {
      setIsFocused(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onSearch && query.trim()) {
      e.preventDefault();
      onSearch(query.trim());
    }
  };

  const handlePlaceholderClick = () => {
    setIsFocused(true);
    // Use setTimeout to ensure the focus happens after state update
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  return (
    <>
      <div
        className="relative w-full max-w-lg"
        ref={containerRef}
        onClick={() => {
          if (!isFocused && inputRef.current) {
            inputRef.current.focus();
          }
        }}
      >
        <div className="py-2 px-3 gap-3 bg-gray-100 text-text flex items-center justify-center rounded-full border border-text-muted min-w-xs">
          <div
            className={`flex items-center w-full ${
              !isFocused && !query ? "invisible" : "visible"
            }`}
          >
            <Search className="w-5 h-5 text-text-muted flex-shrink-0 mr-2" />
            <input
              ref={inputRef}
              type="text"
              className="bg-transparent focus:outline-none w-full text-text placeholder:text-text-muted"
              placeholder={placeholder}
              value={query}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
        {!isFocused && !query && (
          <div
            className="absolute inset-0 flex items-center justify-center gap-2 cursor-text"
            onClick={handlePlaceholderClick}
            style={{
              height: containerHeight > 0 ? `${containerHeight}px` : "auto",
            }}
          >
            <Search className="w-5 h-5 text-gray-400 dark:text-gray-500 flex-shrink-0" />
            <span className="text-gray-400 dark:text-gray-500">
              {placeholder}
            </span>
          </div>
        )}
      </div>
    </>
  );
}
