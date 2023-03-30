export type NewsArticle = {
  source: { id: string; name: string };
  author: string;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
};

export type NewsRequestType = {
  status: string;
  totalResults: number;
  articles: NewsArticle[];
};
