import React from "react";
import Image from "next/image";
import { Post } from "../utils/mdxUtils";
import Link from "next/link";
import { formatPublishDate } from "../utils/date";

interface PostCardProps {
  post: Post;
}

export default function ArticleCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/posts/${post.slug}`}>
      <a
        id={post.slug}
        className="rounded-md bg-slate-600 text-white overflow-hidden flex flex-col"
      >
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
        <div className="p-3 flex-1 flex flex-col justify-between">
          <h4 className="text-2xl track leading-6 font-semibold mb-2">
            {post.title}
          </h4>
          <div className="h-24 overflow-hidden">
            <hr />
            <span className="text-sm italic">
              {formatPublishDate(post.publishedOn)}
            </span>
            <p className="leading-5 mt-1 line-clamp-3">{post.abstract}</p>
          </div>
        </div>
      </a>
    </Link>
  );
}
