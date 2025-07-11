import { useEffect, useRef } from "react";
import { gsap } from "gsap";

type MarqueeProps = {
  duration?: number; // durasi 1 loop
  className?: string;
  children: React.ReactNode;
};

const Marquee = ({ duration = 10, className = "", children }: MarqueeProps) => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = marqueeRef.current;
    if (!el) return;

    const width = el.scrollWidth / 2;

    gsap.to(el, {
      x: -width,
      duration,
      ease: "none",
      repeat: -1,
    });
  }, [duration]);

  return (
    <div className={`overflow-hidden whitespace-nowrap w-full ${className}`}>
      <div ref={marqueeRef} className="inline-flex">
        <div className="flex items-center">{children}</div>
        <div className="flex items-center">{children}</div>
      </div>
    </div>
  );
};

export default Marquee;
