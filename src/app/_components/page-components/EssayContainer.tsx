import React from "react";

interface EssayContainerProps {
  children: React.ReactNode;
}

const EssayContainer: React.FC<EssayContainerProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex justify-center">
      <div className="max-w-4xl w-full px-4 backdrop-filter backdrop-blur-xl bg-gray-800 bg-opacity-40 dark:bg-gray-800 dark:bg-opacity-40 rounded-lg shadow-xl">
        {children}
      </div>
    </div>
  );
};
export default EssayContainer;
