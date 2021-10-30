import React from "react";
import Image from "next/image";

interface ArticleCardProps {
  article: HashnodeArticle;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <a
      id={article.cuid}
      className="rounded-lg ring-4 ring-green-400 ring-opacity-50 text-white p-3 flex flex-col items-center justify-center"
      href={`https://blog.brockherion.dev/${article.slug}`}
      target="_blank"
      rel="noreferrer"
    >
      <h4 className="text-2xl">{article.title}</h4>
      <p>{article.brief}</p>
      <div className="grid grid-cols-5 gap-y-2 gap-x-3">
        {article.reactions.map((reaction) => (
          <div
            key={reaction.reaction.name}
            className="flex items-center space-x-1"
          >
            <Image src={reaction.reaction.image} width={30} height={30} />
            <span>{reaction.count}</span>
          </div>
        ))}
      </div>
    </a>
  );
}
