import { Post } from "../utils/mdxUtils";
import Link from "next/link";

interface NewPostsProps {
  newPosts: Post[];
}

export default function PopularPosts({ newPosts }: NewPostsProps) {
  return (
    <div className="grid mb-8">
      <div className="md:mb-0 mb-6">
        <h4 className="text-xl mb-3 font-semibold">Fresh Off The Press 🗞</h4>
        <div className="grid gap-y-4">
          {newPosts.map((post) => (
            <Link
              href={`/blog/posts/${post.slug}`}
              key={`popular-post-${post.slug}`}
            >
              <a>
                <div className="bg-slate-100 shadow-md dark:bg-slate-600 dark:shadow-none rounded-md overflow-hidden p-4">
                  <h5 className="text-xl underline font-semibold">
                    {post.title}
                  </h5>
                  <span className="mb-1 text-sm italic">
                    Published:{" "}
                    {new Date(post.publishedOn).toLocaleDateString("en-US")}
                  </span>
                  <p className="mt-1">{post.abstract}</p>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
