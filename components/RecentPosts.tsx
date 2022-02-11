import { Post } from "../utils/mdxUtils";
import Link from "next/link";

interface NewPostsProps {
  newPosts: Post[];
}

export default function PopularPosts({ newPosts }: NewPostsProps) {
  return (
    <div className="grid">
      <div className="md:mb-0 mb-6">
        <h4 className="text-white text-xl mb-3 ">Fresh Off The Press 🗞</h4>
        <div className="grid gap-y-4">
          {newPosts.map((post) => (
            <Link
              href={`/blog/posts/${post.slug}`}
              key={`popular-post-${post.slug}`}
            >
              <a>
                <div className="bg-slate-600 rounded-md overflow-hidden p-4">
                  <h5 className="text-xl mb-1 underline">{post.title}</h5>
                  <p>{post.abstract}</p>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
