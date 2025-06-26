export interface IMenuItem {
  text: string;
  url: string;
}

export interface IFAQ {
  question: string;
  answer: string;
}

export interface ISocials {
  facebook?: string;
  github?: string;
  instagram?: string;
  linkedin?: string;
  threads?: string;
  twitter?: string;
  youtube?: string;
  x?: string;
  [key: string]: string | undefined;
}

export interface BlogPostTypes {
  id: number;
  slug: string;
  category: string;
  title: string;
  date: string;
  name: string;
  image: string;
  description: string;
  content: string;
}
