export interface News {
  body: string;
  categories: string;
  downvotes: string;
  guid: string;
  imageurl: string;
  lang: string;
  published_on: string;
  source: string;
  tags: string;
  title: string;
  upvotes: string;
  url: string;
  source_info: SourceInfo;
}

export interface SourceInfo {
  img: string;
  lang: string;
  name: string;
}
