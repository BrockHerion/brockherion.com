import Image from "next/image";
import Link from "next/link";
import NewsletterSignUpForm from "../components/NewsletterSignUpForm";
import PageWrapper from "../components/PageWrapper";
import { getGetLatestPosts, getPoplularPosts, Post } from "../utils/mdxUtils";
import PopularPosts from "../components/PopularPosts";
import RecentPosts from "../components/RecentPosts";
import PageHead from "../components/PageHead";

interface HomeProps {
  newPosts: Post[];
  popularPosts: Post[];
}

export default function Home({ newPosts, popularPosts }: HomeProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <PageHead
        title="Home - Brock Herion"
        description="I'm Brock. I'm a software developer and content creator. On this site, we look at content related to software development and my own journey as a developer"
      />
      <PageWrapper>
        <section className="md:grid md:grid-cols-2 md:gap-x-6 flex flex-col justify-items-stretch my-6">
          <div className="md:mb-0 mb-6">
            <Image src="/code.svg" width={890} height={858} alt="" />
          </div>
          <div className="height-full flex flex-col md:items-end justify-center">
            <div className=" flex flex-col md:items-end">
              <h1 className="text-5xl ">Hey there 👋</h1>
              <div className="w-16 h-2 mt-4 bg-emerald-400"></div>
            </div>

            <h2 className="text-4xl mt-6 mb-3 md:text-right ">
              I'm Brock and I'm a software developer
            </h2>
            <h3 className="text-2xl mt-4 mb-3 md:text-right ">
              On this site, you&apos;ll find content relating to programming and
              full-stack development. You&apos;ll also get to know a little bit
              more about me and get to see some of the cool things I&apos;ve
              worked on.
            </h3>
          </div>
        </section>
      </PageWrapper>

      <section className="relative z-10 mb-6 text-gray-800">
        <div
          className="
						before:absolute 
						before:bg-emerald-400 
						before:left-0 before:top-0 
						before:h-full before:right-0
						before:-z-10"
        >
          <div className="2xl:px-96 xl:px-72 lg:px-36 md:px-16 px-4 py-12">
            <div>
              <h3 className="text-3xl mb-3 font-bold tracking-wider text-gray-800">
                Subscribe to my newsletter 💌
              </h3>
              <div className="bg-gray-800 w-12 h-1 mb-6"></div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-x-6 flex flex-col">
              <div>
                <p className="text-xl mb-3 text-gray-800">
                  In Brock&apos;s Bytes [my weekly newsletter] I share tips
                  related to full-stack software development and give advice on
                  managing a healthy, productive life while having a career in
                  programming. Whether you&apos;re a senior developer,
                  freelancer, or you&apos;re just getting started, there's
                  something here for everyone!
                </p>
              </div>
              <div>
                <p className="text-2xl mb-3 md:text-center text-gray-800">
                  Sign up now to join a growing community of friendly readers!
                </p>
                <NewsletterSignUpForm />
              </div>
            </div>
          </div>
        </div>
      </section>

      <PageWrapper>
        <section className="flex flex-col">
          <h3 className="text-3xl mb-3 font-bold tracking-wider">
            Check out my blog ✍️
          </h3>
          <div className="bg-emerald-400 w-12 h-1 mb-6"></div>
          <PopularPosts popularPosts={popularPosts} />
          <RecentPosts newPosts={newPosts} />
          <div className="flex justify-center">
            <Link href="/blog">
              <a className="bg-emerald-400 px-3 py-4 rounded-md text-gray-800">
                Explore more posts
              </a>
            </Link>
          </div>
        </section>
      </PageWrapper>
    </div>
  );
}

export async function getStaticProps() {
  const newPosts = getGetLatestPosts(5);
  const popularPosts = getPoplularPosts(3);

  return {
    props: {
      newPosts,
      popularPosts,
    },
  };
}
