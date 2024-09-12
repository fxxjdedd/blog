import React from "react";
import { Post } from "@/interfaces/post";
import Link from "next/link";

interface EssayListProps {
  posts: Post[];
}

const EssayList: React.FC<EssayListProps> = ({ posts }) => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/posts/${post.category}/${post.slug}.md`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="aspect-square cursor-pointer">
              <div className="border rounded p-1 h-full overflow-hidden hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <h3 className="text-xs font-semibold truncate">{post.title}</h3>
                <p className="text-xxs text-gray-600 dark:text-gray-400 line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EssayList;
