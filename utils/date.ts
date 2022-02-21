export const formatPublishDate = (publishedOn: string) =>
  new Date(publishedOn).toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
