import Container from "@/app/_components/container";
import { Intro } from "@/app/_components/intro";
import { getAllPosts } from "@/lib/api";
import EssaySwitcher from "@/app/_components/page-components/EssaySwitcher";

export default function Index() {
  const allPosts = getAllPosts();

  return (
    <main>
      <Container>
        <Intro />
        <div className="mt-8">
          <EssaySwitcher allPosts={allPosts} />
        </div>
      </Container>
    </main>
  );
}
