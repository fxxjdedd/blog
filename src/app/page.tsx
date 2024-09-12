import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";
import { getAllPosts } from "@/lib/api";
import EssayList from "./_components/page-components/EssayList";
import { CMS_NAME } from "@/lib/constants";
import PageFooter from "./_components/page-components/PageFooter";
import VFXBackground from "./_components/page-components/VFXBackground";

export default function Index() {
  const allPosts = getAllPosts();

  const categories = Array.from(new Set(allPosts.map((post) => post.category)));
  return (
    <main>
      <Container>
        <div className="mt-8 max-w-[750px] mx-auto">
          <VFXBackground vfxPath="bg" />
          <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12 backdrop-filter backdrop-blur-xl bg-opacity-40 bg-gray-800 rounded-lg p-6 shadow-lg">
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-rose-400 animate-pulse drop-shadow-[0_0_10px_rgba(255,192,203,0.8)] glow-pink-500">
              Blog.
            </h1>
            <h4 className="text-center md:text-left text-lg mt-5 md:pl-8 text-white text-shadow-glow">
              A statically generated blog example using{" "}
              <a
                href="https://nextjs.org/"
                className="underline hover:text-blue-400 duration-200 transition-colors text-shadow-glow"
              >
                Next.js
              </a>{" "}
              and {CMS_NAME}.
            </h4>
          </section>
          <div className="min-h-screen flex justify-center">
            <div className="w-full px-4 backdrop-filter backdrop-blur-xl bg-gray-800 bg-opacity-40 dark:bg-gray-800 dark:bg-opacity-40 rounded-lg shadow-xl">
              {categories.map((category) => (
                <div key={category}>
                  <h2 className="text-2xl font-bold mt-8 mb-4">{category}</h2>
                  <EssayList
                    posts={allPosts.filter(
                      (post) => post.category === category
                    )}
                  />
                </div>
              ))}
            </div>
          </div>
          <PageFooter />
        </div>
      </Container>
    </main>
  );
}
