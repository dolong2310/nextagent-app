"use client";

import { cn } from "@/lib/utils";
import { useMemo } from "react";

type Props = {
  activeIndex: number;
  children: React.ReactNode[];
  className?: string;
};

const SlideContainer = ({ activeIndex, children, className = "" }: Props) => {
  const transform = useMemo(() => {
    return `translateX(-${activeIndex * 100}%)`;
  }, [activeIndex]);

  return (
    <div className={cn("flex-1 min-h-0 overflow-hidden", className)}>
      <div
        className="flex h-full transition-transform duration-300 ease-in-out"
        style={{ transform }}
      >
        {children.map((child, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlideContainer;
