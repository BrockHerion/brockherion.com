import React from "react";
import { Post } from "../utils/mdxUtils";
import PostCard from "./PostCard";

interface PostCardsProps {
  posts: Post[];
}

export default function PostCards({ posts }: PostCardsProps) {
  return (
    <>
      <h3 className="italic my-4">Viewing {posts.length} posts</h3>

      <div className="grid md:grid-cols-3 gap-x-6 gap-y-6">
        {posts.map((post) => (
          <React.Fragment key={post.slug}>
            <PostCard post={post} />
          </React.Fragment>
        ))}
      </div>
    </>
  );
}
