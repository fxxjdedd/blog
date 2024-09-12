import { Post } from "@/interfaces/post";
import fs from "fs";
import matter from "gray-matter";
import { join } from "path";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  const items = fs.readdirSync(postsDirectory);
  return items.flatMap((item) => {
    const itemPath = join(postsDirectory, item);
    if (fs.statSync(itemPath).isDirectory()) {
      return fs.readdirSync(itemPath).map((file) => join(item, file));
    } else {
      return item;
    }
  });
}

export function getPostBySlug(slug: string) {
  const parts = slug.split("/");
  const filename = parts[parts.length - 1];
  const category = parts.length > 1 ? parts[parts.length - 2] : "default";
  const fullPath = join(postsDirectory, slug);
  console.log("fullPath", slug, fullPath);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    ...data,
    slug: filename.replace(/\.md$/, ""),
    category,
    content,
  } as Post;
}

export function getAllPosts(): Post[] {
  const slugs = getPostSlugs();

  console.log("AAAAAAAAAAAAA", slugs);
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
