import Image from "next/image";
import Link from "next/link";
import { Post } from "../utils/mdxUtils";

interface PopularPostsProps {
  popularPosts: Post[];
}

export default function PopularPosts({ popularPosts }: PopularPostsProps) {
  return (
    <div className="grid mb-6">
      <div className="md:mb-0 mb-6">
        <h4 className="text-white text-xl mb-3 ">Featured Posts 🌟</h4>
        <div className="grid md:grid-cols-3 gap-x-4 gap-y-4">
          {popularPosts.map((post) => (
            <Link
              href={`/blog/posts/${post.slug}`}
              key={`popular-post-${post.slug}`}
            >
              <a>
                <div className="bg-slate-600 rounded-md overflow-hidden h-72">
                  <div className="relative w-full h-40">
                    {post.imageUrl !== "" && (
                      <Image
                        src={post.imageUrl}
                        layout="fill"
                        objectFit="cover"
                        alt="Placeholder"
                      />
                    )}
                  </div>
                  <h5 className="text-xl p-4">{post.title}</h5>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
