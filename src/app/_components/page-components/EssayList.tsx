"use client";
import React from "react";
import { Post } from "@/interfaces/post";

interface EssayListProps {
  posts: Post[];
}

const EssayList: React.FC<EssayListProps> = ({ posts }) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
        {posts.map((post) => (
          <div key={post.slug} className="aspect-square">
            <div className="border rounded-lg p-2 h-full overflow-hidden">
              <h3 className="text-sm font-semibold mb-1 truncate">
                {post.title}
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-3">
                {post.excerpt}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EssayList;
