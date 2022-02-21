import fs from "fs";
import path from "path";
import matter from "gray-matter";

export const POSTS_PATH = path.join(process.cwd(), "posts");

export const postFilePaths = fs
  .readdirSync(POSTS_PATH)
  .filter((path) => /\.mdx?$/.test(path));

export interface Post {
  title: string;
  slug: string;
  abstract: string;
  publishedOn: string;
  publishedOnTime: number;
  imageUrl: string;
}

export const getAllPosts = (): Post[] => {
  const posts: Post[] = [];

  const files = fs.readdirSync(POSTS_PATH);

  files.forEach((file) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, file));
    const { data } = matter(source);

    if (data["isPublished"]) {
      posts.push({
        title: data["title"] as string,
        slug: data["slug"] as string,
        abstract: data["abstract"] as string,
        publishedOn: data["publishedOn"] as string,
        publishedOnTime: new Date(data["publishedOn"]).getTime(),
        imageUrl: data["imageUrl"] ?? "",
      });
    }
  });

  return posts.sort((a, b) => b.publishedOnTime - a.publishedOnTime);
};

export const getGetLatestPosts = (limit: number): Post[] => {
  const posts: Post[] = [];

  const files = fs.readdirSync(POSTS_PATH);

  files.forEach((file) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, file));
    const { data } = matter(source);

    if (data["isPublished"]) {
      posts.push({
        title: data["title"] as string,
        slug: data["slug"] as string,
        abstract: data["abstract"] as string,
        publishedOn: data["publishedOn"] as string,
        publishedOnTime: new Date(data["publishedOn"]).getTime(),
        imageUrl: data["imageUrl"] ?? "",
      });
    }
  });

  return posts
    .sort((a, b) => b.publishedOnTime - a.publishedOnTime)
    .slice(0, limit);
};

export const getPoplularPosts = (limit: number): Post[] => {
  const posts: Post[] = [];

  const files = fs.readdirSync(POSTS_PATH);

  files.forEach((file) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, file));
    const { data } = matter(source);

    if (data["isPublished"] && data["isFeatured"]) {
      posts.push({
        title: data["title"] as string,
        slug: data["slug"] as string,
        abstract: data["abstract"] as string,
        publishedOn: data["publishedOn"] as string,
        publishedOnTime: new Date(data["publishedOn"]).getTime(),
        imageUrl: data["imageUrl"] ?? "",
      });
    }
  });

  return posts.slice(0, limit);
};
