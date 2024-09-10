"use client";
import React, { use, useEffect, useRef } from "react";

interface VFXBackgroundProps {
  vfxPath: string;
}

const VFXBackground: React.FC<VFXBackgroundProps> = ({ vfxPath }) => {
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
