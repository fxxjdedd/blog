"use client";

import React from "react";
import { Post } from "@/interfaces/post";
import EssayList from "./EssayList";

interface EssaySwitcherProps {
  allPosts: Post[];
}

const EssaySwitcher: React.FC<EssaySwitcherProps> = ({ allPosts }) => {
  const categories = Array.from(new Set(allPosts.map((post) => post.category)));

  return (
    <div>
      {categories.map((category) => (
        <div key={category}>
          <h2 className="text-2xl font-bold mt-8 mb-4">{category}</h2>
          <EssayList
            posts={allPosts.filter((post) => post.category === category)}
          />
        </div>
      ))}
    </div>
  );
};

export default EssaySwitcher;
