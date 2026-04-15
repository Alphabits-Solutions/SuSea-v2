"use client";

import { useEffect, useState } from "react";

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0);
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="mt-auto pt-8 border-t border-outline-variant/15">
      <div className="text-[10px] uppercase tracking-widest text-on-surface-variant/40 mb-4 font-label">
        Reading Progress
      </div>
      <div className="h-1 w-full bg-surface-container rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-150"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Reading progress: ${progress}%`}
        />
      </div>
    </div>
  );
}
