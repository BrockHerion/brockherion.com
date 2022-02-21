import { GetServerSidePropsContext } from "next";
import { getAllPosts, Post } from "../utils/mdxUtils";

function generateSitemap(posts: Post[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
	<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
		<url>
			<loc>${process.env.BASE_URL}</loc>
		</url>
		<url>
			<loc>${process.env.BASE_URL}/about</loc>
		</url>
		<url>
			<loc>${process.env.BASE_URL}/tech</loc>
		</url>
		<url>
			<loc>${process.env.BASE_URL}/projects</loc>
		</url>
		<url>
		<loc>${process.env.BASE_URL}/blog</loc>
	</url>
		${posts
      .map(({ slug }) => {
        return `
			<url>
					<loc>${`${process.env.BASE_URL}/blog/posts/${slug}`}</loc>
			</url>
		`;
      })
      .join("")}
	</urlset>
	`;
}

export default function SiteMap() {}

export async function getServerSideProps({ res }: GetServerSidePropsContext) {
  const posts = getAllPosts();
  const sitemap = generateSitemap(posts);

  res.setHeader("Content-Type", "text/xml");
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}
