import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { postFilePaths, POSTS_PATH } from "../../../utils/mdxUtils";
import {
  AffiliateLink,
  BlogPostHeading,
  BlogFooter,
  BlogBody,
  BlogSectionHeading,
} from "../../../components/blog";
import { GetStaticPropsContext } from "next";
import PageWrapper from "../../../components/PageWrapper";
import highlight from "rehype-highlight";
import NewsletterSignUpForm from "../../../components/NewsletterSignUpForm";
import PageHead from "../../../components/PageHead";

interface BlogPostProps {
  source: MDXRemoteSerializeResult;
  frontMatter: { [key: string]: any };
}

const components = {
  AffiliateLink,
  BlogPostHeading,
  BlogBody,
  BlogFooter,
  BlogSectionHeading,
};

export default function BlogPost({ source, frontMatter }: BlogPostProps) {
  return (
    <>
      <PageHead
        title={`${frontMatter["seoTitle"]} - Brock Herion`}
        description={frontMatter["abstract"]}
        imageUrl={frontMatter["imageUrl"]}
      />
      <PageWrapper>
        <BlogPostHeading
          title={frontMatter["title"] as string}
          subTitle={frontMatter["subTitle"]}
          imageSrc={frontMatter["imageUrl"] as string}
          publishedOn={frontMatter["publishedOn"] as string}
        />
        <MDXRemote {...source} components={components} />
      </PageWrapper>
      <section className="bg-emerald-400 2xl:px-96 xl:px-72 lg:px-36 md:px-16 px-4 py-12 flex flex-col items-center justify-center ">
        <div className="max-w-md">
          <h4 className="text-center text-2xl font-semibold text-gray-800">
            There's more where that came from!
          </h4>
          <h5 className="text-center mt-2 mb-6 text-xl leading-5 font-open-sans text-gray-800">
            Sign up for Brock&apos;s Bytes - my weekly newsletter - to get
            notified when a new article is published! You will also get
            newsletter-exclusive tips and advice on software development!
          </h5>
          <NewsletterSignUpForm />
        </div>
      </section>
    </>
  );
}

type PageParams = {
  slug: string;
};

export async function getStaticProps({
  params,
}: GetStaticPropsContext<PageParams>) {
  // TODO: Fix this, ! is only here so the build succeeds right now
  const slug = params!.slug;

  const postFilePath = path.join(POSTS_PATH, `${slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [],
      rehypePlugins: [highlight],
    },
    scope: data,
  });

  return {
    props: {
      source: mdxSource,
      frontMatter: data,
    },
  };
}

export const getStaticPaths = async () => {
  const paths = postFilePaths
    // Remove file extensions for page paths
    .map((path) => path.replace(/\.mdx?$/, ""))
    // Map the path into the static paths object required by Next.js
    .map((slug) => ({ params: { slug } }));

  return {
    paths,
    fallback: false,
  };
};
