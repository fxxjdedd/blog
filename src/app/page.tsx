import Container from "@/app/_components/container";
import { HeroPost } from "@/app/_components/hero-post";
import { Intro } from "@/app/_components/intro";
import { MoreStories } from "@/app/_components/more-stories";
import { getAllPosts } from "@/lib/api";

export default function Index() {
  const allPosts = getAllPosts();

  const heroPost = allPosts[0];

  const morePosts = allPosts.slice(1);

  return (
    <main>
      <Container>
        <div className="relative z-10">
          <Intro />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="category-section">
              <div className="flex items-center mb-4">
                <img
                  src="/images/art-models-logo.svg"
                  alt="Tech Art Logo"
                  className="w-12 h-12 mr-4"
                />
                <h2 className="text-2xl font-bold text-white">Tech Art</h2>
              </div>
              <ul className="space-y-4">
                {allPosts
                  .filter((post) => post.category === "tech-art")
                  .map((post) => (
                    <li
                      key={post.slug}
                      className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-4 hover:shadow-lg transition duration-300"
                    >
                      <a href={`/posts/${post.slug}`} className="block">
                        <h3 className="text-xl font-semibold mb-2 text-white">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-200">{post.excerpt}</p>
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="category-section">
              <div className="flex items-center mb-4">
                <img
                  src="/images/rendering-logo.svg"
                  alt="Rendering Techniques Logo"
                  className="w-12 h-12 mr-4"
                />
                <h2 className="text-2xl font-bold text-white">
                  Rendering Techniques
                </h2>
              </div>
              <ul className="space-y-4">
                {allPosts
                  .filter((post) => post.category === "rendering")
                  .map((post) => (
                    <li
                      key={post.slug}
                      className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-4 hover:shadow-lg transition duration-300"
                    >
                      <a href={`/posts/${post.slug}`} className="block">
                        <h3 className="text-xl font-semibold mb-2 text-white">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-200">{post.excerpt}</p>
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="category-section">
              <div className="flex items-center mb-4">
                <img
                  src="/images/frontend-logo.svg"
                  alt="Frontend Technology Logo"
                  className="w-12 h-12 mr-4"
                />
                <h2 className="text-2xl font-bold text-white">
                  Frontend Technology
                </h2>
              </div>
              <ul className="space-y-4">
                {allPosts
                  .filter((post) => post.category === "frontend")
                  .map((post) => (
                    <li
                      key={post.slug}
                      className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-4 hover:shadow-lg transition duration-300"
                    >
                      <a href={`/posts/${post.slug}`} className="block">
                        <h3 className="text-xl font-semibold mb-2 text-white">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-200">{post.excerpt}</p>
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
            <div className="category-section">
              <div className="flex items-center mb-4">
                <img
                  src="/images/other-logo.svg"
                  alt="Other Topics Logo"
                  className="w-12 h-12 mr-4"
                />
                <h2 className="text-2xl font-bold text-white">Other Topics</h2>
              </div>
              <ul className="space-y-4">
                {allPosts
                  .filter((post) => post.category === "default")
                  .map((post) => (
                    <li
                      key={post.slug}
                      className="bg-white bg-opacity-20 backdrop-blur-lg rounded-lg p-4 hover:shadow-lg transition duration-300"
                    >
                      <a href={`/posts/${post.slug}`} className="block">
                        <h3 className="text-xl font-semibold mb-2 text-white">
                          {post.title}
                        </h3>
                        <p className="text-sm text-gray-200">{post.excerpt}</p>
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
