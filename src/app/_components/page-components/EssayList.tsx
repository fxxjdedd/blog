import React from "react";
import { Post } from "@/interfaces/post";

interface EssayListProps {
  posts: Post[];
}

const EssayList: React.FC<EssayListProps> = ({ posts }) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
        {posts.map((post) => (
          <div key={post.slug} className="aspect-square">
            <div className="border rounded p-1 h-full overflow-hidden">
              <h3 className="text-xs font-semibold truncate">{post.title}</h3>
              <p className="text-xxs text-gray-600 dark:text-gray-400 line-clamp-2">
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
