"use client";
import React, { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import cn from "classnames";
import VFXBackground from "./VFXBackground";
import EssayContainer from "./EssayContainer";
import PageFooter from "./PageFooter";
import { PageHeader } from "./PageHeader";

const inter = Inter({ subsets: ["latin"] });

const PageMain: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div>
      <VFXBackground
        vfxPath="bg"
        onLoad={() => {
          document.body.classList.add("content-visible");
          setIsLoaded(true);
        }}
      />
      <div
        className={cn(
          inter.className,
          "dark:bg-slate-900 dark:text-slate-400",
          "transition-opacity duration-500",
          isLoaded ? "opacity-100" : "opacity-0",
          "max-w-[750px] mx-auto px-5 sm:px-0" // Added this line for width control
        )}
      >
        <PageHeader />
        <EssayContainer>{children}</EssayContainer>
        <PageFooter />
      </div>

      <style jsx global>{`
        .content-visible .essay-container,
        .content-visible .footer {
          opacity: 1;
          transform: translateY(0);
        }
        .essay-container,
        .footer {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.5s ease-in-out, transform 0.5s ease-in-out;
        }
        @media (max-width: 640px) {
          .essay-container,
          .footer {
            padding-left: 20px;
            padding-right: 20px;
          }
        }
      `}</style>
    </div>
  );
};

export default PageMain;
