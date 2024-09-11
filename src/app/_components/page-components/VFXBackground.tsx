"use client";
import React, { use, useEffect, useRef } from "react";

interface VFXBackgroundProps {
  vfxPath: string;
  onLoad?: () => void;
}

const VFXBackground: React.FC<VFXBackgroundProps> = ({ vfxPath, onLoad }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (iframeRef.current) {
        iframeRef.current.style.width = `${window.innerWidth}px`;
        iframeRef.current.style.height = `${window.innerHeight}px`;
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleIframeLoaded = () => {
      const handleVFXLoaded = (event: MessageEvent) => {
        if (event.data.type === "vfxLoaded") {
          window.removeEventListener("message", handleVFXLoaded);
          setTimeout(() => {
            onLoad?.();
          }, 500);
        }
      };
      window.addEventListener("message", handleVFXLoaded);
    };

    // iframe issue: https://github.com/vercel/next.js/issues/39451
    console.log("process.env.NODE_ENV", process.env.NODE_ENV);
    if (process.env.NODE_ENV === "development") {
      iframeRef.current!.src = `/assets/vfx/${vfxPath}/index.html`;
    }

    iframeRef.current!.addEventListener("load", handleIframeLoaded);
    return () => {
      iframeRef.current!.removeEventListener("load", handleIframeLoaded);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full z-[-1]">
      <iframe
        ref={iframeRef}
        src={`/assets/vfx/${vfxPath}/index.html`}
        title="VFX Background"
        className="border-0"
        style={{
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export default VFXBackground;
