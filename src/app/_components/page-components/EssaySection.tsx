"use client";
import Link from "next/link";
import { Post } from "@/interfaces/post";

type Props = {
  posts: Post[];
};

const EssaySection: React.FC<Props> = ({ posts }) => {
  return (
    <section className="mb-12 bg-gradient-to-br from-blue-900/80 to-indigo-900/80 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-blue-700 relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/images/constellation.svg')] opacity-10"></div>
      <h2 className="text-3xl font-serif mb-6 text-blue-200 border-b-2 border-blue-600 pb-2 relative z-10">
        随笔集
      </h2>
      <ul className="space-y-6 relative z-10">
        {posts.map((post) => (
          <li
            key={post.slug}
            className="transform transition-all duration-300 hover:scale-105 hover:rotate-1"
          >
            <Link
              href={`/posts/${post.slug}`}
              className="block p-4 rounded-md bg-gradient-to-r from-blue-800/70 to-indigo-800/70 hover:from-blue-700/70 hover:to-indigo-700/70 backdrop-blur-sm border border-blue-600 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[url('/images/ink-splatter.svg')] opacity-5"></div>
              <h3 className="text-xl font-serif mb-2 text-blue-200 relative z-10">
                {post.title}
              </h3>
              <p className="text-sm font-serif text-blue-300 relative z-10">
                {post.excerpt}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default EssaySection;
