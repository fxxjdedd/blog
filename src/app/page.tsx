import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";
import { getAllPosts } from "@/lib/api";
import EssayList from "./_components/page-components/EssayList";
import { CMS_NAME } from "@/lib/constants";
import PageFooter from "./_components/page-components/PageFooter";
import VFXBackground from "./_components/page-components/VFXBackground";
import VFXStar from "./_components/page-components/VFXStar";

export default function Index() {
  const allPosts = getAllPosts();

  const categories = Array.from(new Set(allPosts.map((post) => post.category)));
  return (
    <main>
      <Container>
        <div className="mt-8 max-w-[750px] mx-auto">
          <VFXBackground vfxPath="bg" />
          <div className="flex-col md:flex-row flex items-center md:justify-center mt-16 mb-16 md:mb-12 backdrop-filter backdrop-blur-xl bg-opacity-40 bg-gray-800 rounded-lg shadow-lg">
            <VFXStar />
            <section className="w-full flex-col md:flex-row flex items-center md:justify-center backdrop-filter backdrop-blur-sm bg-opacity-40 bg-gray-800 p-6 shadow-lg rounded-lg m-4">
              <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8 text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-rose-400 animate-pulse drop-shadow-[0_0_5px_rgba(255,192,203,0.6)] glow-pink-500">
                Blog.
              </h1>
              <div className="flex flex-col items-center text-center">
                <h4 className="text-[18px] font-sans font-bold tracking-widest text-white animate-pulse drop-shadow-[0_0_5px_rgba(255,255,255,0.6)]">
                  创 意 发 生 之 地 ， 敬 请 见 证
                </h4>
                <p className="text-[15px] font-sans font-bold tracking-widest mt-2 text-white animate-pulse drop-shadow-[0_0_5px_rgba(255,255,255,0.6)]">
                  Witness the Magic Happens
                </p>
              </div>
            </section>
          </div>
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
