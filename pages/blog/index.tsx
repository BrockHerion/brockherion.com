import PageHead from "../../components/PageHead";
import PageHeader from "../../components/PageHeader";
import PageWrapper from "../../components/PageWrapper";
import PostCards from "../../components/PostCards";
import { getAllPosts, Post } from "../../utils/mdxUtils";

interface BlogProps {
  posts: Post[];
}

export default function Blog({ posts }: BlogProps) {
  return (
    <>
      <PageHead
        title="Blog - Brock Herion"
        description="On my blog, you can browse articles on software development, productivity, books, and my life as a developer."
      />
      <PageWrapper>
        <PageHeader headingText="Blog 📰" />
        <PostCards posts={posts} />
      </PageWrapper>
    </>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();

  return {
    props: {
      posts,
    },
  };
}
