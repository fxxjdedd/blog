"use client";

import React, { useState } from "react";
import { Post } from "@/interfaces/post";
import EssayList from "./EssayList";

interface EssaySwitcherProps {
  allPosts: Post[];
}

const EssaySwitcher: React.FC<EssaySwitcherProps> = ({ allPosts }) => {
  const categories = Array.from(new Set(allPosts.map((post) => post.category)));
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const filteredPosts = allPosts.filter(
    (post) => post.category === activeCategory
  );

  return (
    <div>
      <div className="flex space-x-4 mb-4">
        {categories.map((category) => (
          <button
            key={category}
            className={`px-4 py-2 rounded ${
              activeCategory === category
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <EssayList posts={filteredPosts} />
    </div>
  );
};

export default EssaySwitcher;
