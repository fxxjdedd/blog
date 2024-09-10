import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";
import { getAllPosts } from "@/lib/api";
import CategorySection from "@/app/_components/page-components/EssaySection";
import EssaySection from "@/app/_components/page-components/EssaySection";

export default function FrontEnd() {
  const allPosts = getAllPosts();

  const category = {
    logo: "/images/art-models-logo.svg",
    alt: "Tech Art Logo",
    title: "Tech Art",
    category: "tech-art",
  };

  const filteredPosts = allPosts.filter(
    (post) => post.category === category.category
  );

  return (
    <main>
      <Container>
        <div className="relative z-10">
          <Intro />
          <div className="mt-16">
            <EssaySection posts={filteredPosts} />
          </div>
        </div>
      </Container>
    </main>
  );
}
