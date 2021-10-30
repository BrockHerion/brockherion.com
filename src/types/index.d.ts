interface FormValues {
  'Email Address'
}

interface HashnodeArticle {
  cuid: string;
  slug: string;
  title: string;
  brief: string;
  popularity: number;
  dateAdded: Date;
  coverImage: string;
  reactions: HashnodeReactions[];
}

interface HashnodeReactions {
  reaction: HashnodeReaction;
  count: number;
}

interface HashnodeReaction {
  name: string;
  image: string;
}

interface HashnodeUser {
  username: string;
  tagline: string;
  numFollowers: number;
  numPosts: number;
  blogHandle: string;
}
