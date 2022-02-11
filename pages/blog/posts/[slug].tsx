import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { postFilePaths, POSTS_PATH } from "../../../utils/mdxUtils";
import {
  BlogPostHeading,
  BlogFooter,
  BlogBody,
  BlogSectionHeading,
} from "../../../components/blog";
import { GetStaticPropsContext } from "next";
import PageWrapper from "../../../components/PageWrapper";
import Head from "next/head";
import highlight from "rehype-highlight";
import NewsletterSignUpForm from "../../../components/NewsletterSignUpForm";

interface BlogPostProps {
  source: MDXRemoteSerializeResult;
  frontMatter: { [key: string]: any };
}

const components = {
  BlogPostHeading,
  BlogBody,
  BlogFooter,
  BlogSectionHeading,
};

export default function BlogPost({ source, frontMatter }: BlogPostProps) {
  return (
    <>
      <Head>
        <title>{frontMatter["seoTitle"]} - Brock Herion</title>
      </Head>
      <PageWrapper>
        <MDXRemote {...source} components={components} />
      </PageWrapper>
      <section className="bg-emerald-500 2xl:px-96 xl:px-72 lg:px-36 md:px-16 px-4 py-12 flex flex-col items-center justify-center ">
        <div className="max-w-md">
          <h4 className="text-center text-2xl font-bold">
            There's more where that came from!
          </h4>
          <h5 className="text-center mt-2 mb-6 text-xl leading-5 font-open-sans">
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
  const postFilePath = path.join(POSTS_PATH, `${params.slug}.mdx`);
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
